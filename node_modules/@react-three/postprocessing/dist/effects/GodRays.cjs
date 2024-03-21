"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const EffectComposer = require("../EffectComposer.cjs");
const util = require("../util.cjs");
const GodRays = React.forwardRef(function GodRays2(props, ref) {
  const { camera } = React.useContext(EffectComposer.EffectComposerContext);
  const effect = React.useMemo(() => new postprocessing.GodRaysEffect(camera, util.resolveRef(props.sun), props), [camera, props]);
  React.useLayoutEffect(() => void (effect.lightSource = util.resolveRef(props.sun)), [effect, props.sun]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.GodRays = GodRays;
//# sourceMappingURL=GodRays.cjs.map
