"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const screenSpaceReflections = require("./screen-space-reflections.cjs");
const EffectComposer = require("../../EffectComposer.cjs");
const Selection = require("../../Selection.cjs");
const fiber = require("@react-three/fiber");
const SSR = React.forwardRef(function SSR2({ ENABLE_BLUR = true, USE_MRT = true, ...props }, ref) {
  const { invalidate } = fiber.useThree();
  const { scene, camera } = React.useContext(EffectComposer.EffectComposerContext);
  const effect = React.useMemo(
    () => new screenSpaceReflections.SSREffect(scene, camera, { ENABLE_BLUR, USE_MRT, ...props }),
    [scene, camera, ENABLE_BLUR, USE_MRT, props]
  );
  const api = React.useContext(Selection.selectionContext);
  React.useEffect(() => {
    var _a;
    if (api && api.enabled) {
      if ((_a = api.selected) == null ? void 0 : _a.length) {
        effect.selection.set(api.selected);
        invalidate();
        return () => {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, ...props });
});
exports.SSR = SSR;
//# sourceMappingURL=index.cjs.map
