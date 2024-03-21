import { jsx } from "react/jsx-runtime";
import { ToneMappingEffect, EffectAttribute } from "postprocessing";
import { forwardRef, useMemo, useEffect } from "react";
const ToneMapping = forwardRef(function ToneMapping2({
  blendFunction,
  adaptive,
  mode,
  resolution,
  maxLuminance,
  whitePoint,
  middleGrey,
  minLuminance,
  averageLuminance,
  adaptationRate,
  ...props
}, ref) {
  const effect = useMemo(
    () => new ToneMappingEffect({
      blendFunction,
      adaptive,
      mode,
      resolution,
      maxLuminance,
      whitePoint,
      middleGrey,
      minLuminance,
      averageLuminance,
      adaptationRate
    }),
    [
      blendFunction,
      adaptive,
      mode,
      resolution,
      maxLuminance,
      whitePoint,
      middleGrey,
      minLuminance,
      averageLuminance,
      adaptationRate
    ]
  );
  useEffect(() => {
    effect.dispose();
  }, [effect]);
  return /* @__PURE__ */ jsx("primitive", { ...props, ref, object: effect, attributes: EffectAttribute.CONVOLUTION });
});
export {
  ToneMapping
};
//# sourceMappingURL=ToneMapping.js.map
