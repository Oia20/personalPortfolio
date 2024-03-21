"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const THREE = require("three");
const EffectComposer = require("../EffectComposer.cjs");
const DepthOfField = React.forwardRef(function DepthOfField2({
  blendFunction,
  worldFocusDistance,
  worldFocusRange,
  focusDistance,
  focusRange,
  focalLength,
  bokehScale,
  resolutionScale,
  resolutionX,
  resolutionY,
  width,
  height,
  target,
  depthTexture,
  ...props
}, ref) {
  const { camera } = React.useContext(EffectComposer.EffectComposerContext);
  const autoFocus = target != null;
  const effect = React.useMemo(() => {
    const effect2 = new postprocessing.DepthOfFieldEffect(camera, {
      blendFunction,
      worldFocusDistance,
      worldFocusRange,
      focusDistance,
      focusRange,
      focalLength,
      bokehScale,
      resolutionScale,
      resolutionX,
      resolutionY,
      width,
      height
    });
    if (autoFocus)
      effect2.target = new THREE.Vector3();
    if (depthTexture)
      effect2.setDepthTexture(depthTexture.texture, depthTexture.packing);
    const maskPass = effect2.maskPass;
    maskPass.maskFunction = postprocessing.MaskFunction.MULTIPLY_RGB_SET_ALPHA;
    return effect2;
  }, [
    camera,
    blendFunction,
    worldFocusDistance,
    worldFocusRange,
    focusDistance,
    focusRange,
    focalLength,
    bokehScale,
    resolutionScale,
    resolutionX,
    resolutionY,
    width,
    height,
    autoFocus,
    depthTexture
  ]);
  React.useEffect(() => {
    return () => {
      effect.dispose();
    };
  }, [effect]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ...props, ref, object: effect, target });
});
exports.DepthOfField = DepthOfField;
//# sourceMappingURL=DepthOfField.cjs.map
