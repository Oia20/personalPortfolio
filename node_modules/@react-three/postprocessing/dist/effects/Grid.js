import { jsx } from "react/jsx-runtime";
import { forwardRef, useMemo, useLayoutEffect } from "react";
import { GridEffect } from "postprocessing";
import { useThree } from "@react-three/fiber";
const Grid = forwardRef(function Grid2({ size, ...props }, ref) {
  const invalidate = useThree((state) => state.invalidate);
  const effect = useMemo(() => new GridEffect(props), [props]);
  useLayoutEffect(() => {
    if (size)
      effect.setSize(size.width, size.height);
    invalidate();
  }, [effect, size]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  Grid
};
//# sourceMappingURL=Grid.js.map
