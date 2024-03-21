"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const ToneMapping = React.forwardRef(function ToneMapping2({
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
  const effect = React.useMemo(
    () => new postprocessing.ToneMappingEffect({
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
  React.useEffect(() => {
    effect.dispose();
  }, [effect]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ...props, ref, object: effect, attributes: postprocessing.EffectAttribute.CONVOLUTION });
});
exports.ToneMapping = ToneMapping;
//# sourceMappingURL=ToneMapping.cjs.map
