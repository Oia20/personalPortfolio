"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const postprocessing = require("postprocessing");
const Pixelation = React.forwardRef(function Pixelation2({ granularity = 5 }, ref) {
  const effect = React.useMemo(() => new postprocessing.PixelationEffect(granularity), [granularity]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.Pixelation = Pixelation;
//# sourceMappingURL=Pixelation.cjs.map
