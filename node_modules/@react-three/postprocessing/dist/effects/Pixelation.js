import { jsx } from "react/jsx-runtime";
import { forwardRef, useMemo } from "react";
import { PixelationEffect } from "postprocessing";
const Pixelation = forwardRef(function Pixelation2({ granularity = 5 }, ref) {
  const effect = useMemo(() => new PixelationEffect(granularity), [granularity]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  Pixelation
};
//# sourceMappingURL=Pixelation.js.map
