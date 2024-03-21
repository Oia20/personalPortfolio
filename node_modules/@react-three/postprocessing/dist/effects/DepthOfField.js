import { jsx } from "react/jsx-runtime";
import { DepthOfFieldEffect, MaskFunction } from "postprocessing";
import { forwardRef, useContext, useMemo, useEffect } from "react";
import { Vector3 } from "three";
import { EffectComposerContext } from "../EffectComposer.js";
const DepthOfField = forwardRef(function DepthOfField2({
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
  const { camera } = useContext(EffectComposerContext);
  const autoFocus = target != null;
  const effect = useMemo(() => {
    const effect2 = new DepthOfFieldEffect(camera, {
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
      effect2.target = new Vector3();
    if (depthTexture)
      effect2.setDepthTexture(depthTexture.texture, depthTexture.packing);
    const maskPass = effect2.maskPass;
    maskPass.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA;
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
  useEffect(() => {
    return () => {
      effect.dispose();
    };
  }, [effect]);
  return /* @__PURE__ */ jsx("primitive", { ...props, ref, object: effect, target });
});
export {
  DepthOfField
};
//# sourceMappingURL=DepthOfField.js.map
