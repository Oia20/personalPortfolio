import { jsx } from "react/jsx-runtime";
import { ColorAverageEffect, BlendFunction } from "postprocessing";
import { forwardRef, useMemo } from "react";
const ColorAverage = forwardRef(function ColorAverage2({ blendFunction = BlendFunction.NORMAL }, ref) {
  const effect = useMemo(() => new ColorAverageEffect(blendFunction), [blendFunction]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  ColorAverage
};
//# sourceMappingURL=ColorAverage.js.map
