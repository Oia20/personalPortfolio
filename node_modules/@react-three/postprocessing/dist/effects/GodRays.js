import { jsx } from "react/jsx-runtime";
import { GodRaysEffect } from "postprocessing";
import { forwardRef, useContext, useMemo, useLayoutEffect } from "react";
import { EffectComposerContext } from "../EffectComposer.js";
import { resolveRef } from "../util.js";
const GodRays = forwardRef(function GodRays2(props, ref) {
  const { camera } = useContext(EffectComposerContext);
  const effect = useMemo(() => new GodRaysEffect(camera, resolveRef(props.sun), props), [camera, props]);
  useLayoutEffect(() => void (effect.lightSource = resolveRef(props.sun)), [effect, props.sun]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  GodRays
};
//# sourceMappingURL=GodRays.js.map
