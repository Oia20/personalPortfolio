"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const fiber = require("@react-three/fiber");
const postprocessing = require("postprocessing");
const React = require("react");
const LUT = React.forwardRef(function LUT2({ lut, tetrahedralInterpolation, ...props }, ref) {
  const effect = React.useMemo(() => new postprocessing.LUT3DEffect(lut, props), [lut, props]);
  const invalidate = fiber.useThree((state) => state.invalidate);
  React.useLayoutEffect(() => {
    if (tetrahedralInterpolation)
      effect.tetrahedralInterpolation = tetrahedralInterpolation;
    if (lut)
      effect.lut = lut;
    invalidate();
  }, [effect, invalidate, lut, tetrahedralInterpolation]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.LUT = LUT;
//# sourceMappingURL=LUT.cjs.map
