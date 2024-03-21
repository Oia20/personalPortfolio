"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const ColorAverage = React.forwardRef(function ColorAverage2({ blendFunction = postprocessing.BlendFunction.NORMAL }, ref) {
  const effect = React.useMemo(() => new postprocessing.ColorAverageEffect(blendFunction), [blendFunction]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.ColorAverage = ColorAverage;
//# sourceMappingURL=ColorAverage.cjs.map
