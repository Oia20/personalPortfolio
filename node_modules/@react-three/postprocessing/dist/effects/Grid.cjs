"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const postprocessing = require("postprocessing");
const fiber = require("@react-three/fiber");
const Grid = React.forwardRef(function Grid2({ size, ...props }, ref) {
  const invalidate = fiber.useThree((state) => state.invalidate);
  const effect = React.useMemo(() => new postprocessing.GridEffect(props), [props]);
  React.useLayoutEffect(() => {
    if (size)
      effect.setSize(size.width, size.height);
    invalidate();
  }, [effect, size]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.Grid = Grid;
//# sourceMappingURL=Grid.cjs.map
