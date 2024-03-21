import { jsx } from "react/jsx-runtime";
import { NoToneMapping, HalfFloatType } from "three";
import React, { createContext, forwardRef, useMemo, useEffect, useRef, useLayoutEffect, useImperativeHandle } from "react";
import { useThree, useFrame, useInstanceHandle } from "@react-three/fiber";
import { EffectComposer as EffectComposer$1, RenderPass, NormalPass, DepthDownsamplingPass, Effect, EffectPass, EffectAttribute, Pass } from "postprocessing";
import { isWebGL2Available } from "three-stdlib";
const EffectComposerContext = createContext(null);
const isConvolution = (effect) => (effect.getAttributes() & EffectAttribute.CONVOLUTION) === EffectAttribute.CONVOLUTION;
const EffectComposer = React.memo(
  forwardRef(
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
      frameBufferType = HalfFloatType
    }, ref) => {
      const { gl, scene: defaultScene, camera: defaultCamera, size } = useThree();
      const scene = _scene || defaultScene;
      const camera = _camera || defaultCamera;
      const [composer, normalPass, downSamplingPass] = useMemo(() => {
        const webGL2Available = isWebGL2Available();
        const effectComposer = new EffectComposer$1(gl, {
          depthBuffer,
          stencilBuffer,
          multisampling: multisampling > 0 && webGL2Available ? multisampling : 0,
          frameBufferType
        });
        effectComposer.addPass(new RenderPass(scene, camera));
        let downSamplingPass2 = null;
        let normalPass2 = null;
        if (enableNormalPass) {
          normalPass2 = new NormalPass(scene, camera);
          normalPass2.enabled = false;
          effectComposer.addPass(normalPass2);
          if (resolutionScale !== void 0 && webGL2Available) {
            downSamplingPass2 = new DepthDownsamplingPass({ normalBuffer: normalPass2.texture, resolutionScale });
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
      useEffect(() => composer == null ? void 0 : composer.setSize(size.width, size.height), [composer, size]);
      useFrame(
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
      const group = useRef(null);
      const instance = useInstanceHandle(group);
      useLayoutEffect(() => {
        const passes = [];
        if (group.current && instance.current && composer) {
          const children2 = instance.current.objects;
          for (let i = 0; i < children2.length; i++) {
            const child = children2[i];
            if (child instanceof Effect) {
              const effects = [child];
              if (!isConvolution(child)) {
                let next = null;
                while ((next = children2[i + 1]) instanceof Effect) {
                  if (isConvolution(next))
                    break;
                  effects.push(next);
                  i++;
                }
              }
              const pass = new EffectPass(camera, ...effects);
              passes.push(pass);
            } else if (child instanceof Pass) {
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
      useEffect(() => {
        const currentTonemapping = gl.toneMapping;
        gl.toneMapping = NoToneMapping;
        return () => {
          gl.toneMapping = currentTonemapping;
        };
      }, []);
      const state = useMemo(
        () => ({ composer, normalPass, downSamplingPass, resolutionScale, camera, scene }),
        [composer, normalPass, downSamplingPass, resolutionScale, camera, scene]
      );
      useImperativeHandle(ref, () => composer, [composer]);
      return /* @__PURE__ */ jsx(EffectComposerContext.Provider, { value: state, children: /* @__PURE__ */ jsx("group", { ref: group, children }) });
    }
  )
);
export {
  EffectComposer,
  EffectComposerContext
};
//# sourceMappingURL=EffectComposer.js.map
