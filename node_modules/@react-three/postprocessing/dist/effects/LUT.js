import { jsx } from "react/jsx-runtime";
import { useThree } from "@react-three/fiber";
import { LUT3DEffect } from "postprocessing";
import { forwardRef, useMemo, useLayoutEffect } from "react";
const LUT = forwardRef(function LUT2({ lut, tetrahedralInterpolation, ...props }, ref) {
  const effect = useMemo(() => new LUT3DEffect(lut, props), [lut, props]);
  const invalidate = useThree((state) => state.invalidate);
  useLayoutEffect(() => {
    if (tetrahedralInterpolation)
      effect.tetrahedralInterpolation = tetrahedralInterpolation;
    if (lut)
      effect.lut = lut;
    invalidate();
  }, [effect, invalidate, lut, tetrahedralInterpolation]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  LUT
};
//# sourceMappingURL=LUT.js.map
