"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const fiber = require("@react-three/fiber");
const util = require("../util.cjs");
const Glitch = React.forwardRef(function Glitch2({ active = true, ...props }, ref) {
  const invalidate = fiber.useThree((state) => state.invalidate);
  const delay = util.useVector2(props, "delay");
  const duration = util.useVector2(props, "duration");
  const strength = util.useVector2(props, "strength");
  const chromaticAberrationOffset = util.useVector2(props, "chromaticAberrationOffset");
  const effect = React.useMemo(
    () => new postprocessing.GlitchEffect({ ...props, delay, duration, strength, chromaticAberrationOffset }),
    [delay, duration, props, strength, chromaticAberrationOffset]
  );
  React.useLayoutEffect(() => {
    effect.mode = active ? props.mode || postprocessing.GlitchMode.SPORADIC : postprocessing.GlitchMode.DISABLED;
    invalidate();
  }, [active, effect, invalidate, props.mode]);
  React.useEffect(() => {
    return () => {
      var _a;
      (_a = effect.dispose) == null ? void 0 : _a.call(effect);
    };
  }, [effect]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.Glitch = Glitch;
//# sourceMappingURL=Glitch.cjs.map
