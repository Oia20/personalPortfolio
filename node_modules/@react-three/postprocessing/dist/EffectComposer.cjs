"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const THREE = require("three");
const React = require("react");
const fiber = require("@react-three/fiber");
const postprocessing = require("postprocessing");
const threeStdlib = require("three-stdlib");
const EffectComposerContext = React.createContext(null);
const isConvolution = (effect) => (effect.getAttributes() & postprocessing.EffectAttribute.CONVOLUTION) === postprocessing.EffectAttribute.CONVOLUTION;
const EffectComposer = React.memo(
  React.forwardRef(
    ({
      children,
      camera: _camera,
      scene: _scene,
      resolutionScale,
      enabled = true,
      renderPriority = 1,
      autoClear = true,
      depthBuffer,
      enableNormalPass,
      stencilBuffer,
      multisampling = 8,
      frameBufferType = THREE.HalfFloatType
    }, ref) => {
      const { gl, scene: defaultScene, camera: defaultCamera, size } = fiber.useThree();
      const scene = _scene || defaultScene;
      const camera = _camera || defaultCamera;
      const [composer, normalPass, downSamplingPass] = React.useMemo(() => {
        const webGL2Available = threeStdlib.isWebGL2Available();
        const effectComposer = new postprocessing.EffectComposer(gl, {
          depthBuffer,
          stencilBuffer,
          multisampling: multisampling > 0 && webGL2Available ? multisampling : 0,
          frameBufferType
        });
        effectComposer.addPass(new postprocessing.RenderPass(scene, camera));
        let downSamplingPass2 = null;
        let normalPass2 = null;
        if (enableNormalPass) {
          normalPass2 = new postprocessing.NormalPass(scene, camera);
          normalPass2.enabled = false;
          effectComposer.addPass(normalPass2);
          if (resolutionScale !== void 0 && webGL2Available) {
            downSamplingPass2 = new postprocessing.DepthDownsamplingPass({ normalBuffer: normalPass2.texture, resolutionScale });
            downSamplingPass2.enabled = false;
            effectComposer.addPass(downSamplingPass2);
          }
        }
        return [effectComposer, normalPass2, downSamplingPass2];
      }, [
        camera,
        gl,
        depthBuffer,
        stencilBuffer,
        multisampling,
        frameBufferType,
        scene,
        enableNormalPass,
        resolutionScale
      ]);
      React.useEffect(() => composer == null ? void 0 : composer.setSize(size.width, size.height), [composer, size]);
      fiber.useFrame(
        (_, delta) => {
          if (enabled) {
            const currentAutoClear = gl.autoClear;
            gl.autoClear = autoClear;
            if (stencilBuffer && !autoClear)
              gl.clearStencil();
            composer.render(delta);
            gl.autoClear = currentAutoClear;
          }
        },
        enabled ? renderPriority : 0
      );
      const group = React.useRef(null);
      const instance = fiber.useInstanceHandle(group);
      React.useLayoutEffect(() => {
        const passes = [];
        if (group.current && instance.current && composer) {
          const children2 = instance.current.objects;
          for (let i = 0; i < children2.length; i++) {
            const child = children2[i];
            if (child instanceof postprocessing.Effect) {
              const effects = [child];
              if (!isConvolution(child)) {
                let next = null;
                while ((next = children2[i + 1]) instanceof postprocessing.Effect) {
                  if (isConvolution(next))
                    break;
                  effects.push(next);
                  i++;
                }
              }
              const pass = new postprocessing.EffectPass(camera, ...effects);
              passes.push(pass);
            } else if (child instanceof postprocessing.Pass) {
              passes.push(child);
            }
          }
          for (const pass of passes)
            composer == null ? void 0 : composer.addPass(pass);
          if (normalPass)
            normalPass.enabled = true;
          if (downSamplingPass)
            downSamplingPass.enabled = true;
        }
        return () => {
          for (const pass of passes)
            composer == null ? void 0 : composer.removePass(pass);
          if (normalPass)
            normalPass.enabled = false;
          if (downSamplingPass)
            downSamplingPass.enabled = false;
        };
      }, [composer, children, camera, normalPass, downSamplingPass, instance]);
      React.useEffect(() => {
        const currentTonemapping = gl.toneMapping;
        gl.toneMapping = THREE.NoToneMapping;
        return () => {
          gl.toneMapping = currentTonemapping;
        };
      }, []);
      const state = React.useMemo(
        () => ({ composer, normalPass, downSamplingPass, resolutionScale, camera, scene }),
        [composer, normalPass, downSamplingPass, resolutionScale, camera, scene]
      );
      React.useImperativeHandle(ref, () => composer, [composer]);
      return /* @__PURE__ */ jsxRuntime.jsx(EffectComposerContext.Provider, { value: state, children: /* @__PURE__ */ jsxRuntime.jsx("group", { ref: group, children }) });
    }
  )
);
exports.EffectComposer = EffectComposer;
exports.EffectComposerContext = EffectComposerContext;
//# sourceMappingURL=EffectComposer.cjs.map
