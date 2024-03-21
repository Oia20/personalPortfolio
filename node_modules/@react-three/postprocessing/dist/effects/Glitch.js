import { jsx } from "react/jsx-runtime";
import { GlitchEffect, GlitchMode } from "postprocessing";
import { forwardRef, useMemo, useLayoutEffect, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { useVector2 } from "../util.js";
const Glitch = forwardRef(function Glitch2({ active = true, ...props }, ref) {
  const invalidate = useThree((state) => state.invalidate);
  const delay = useVector2(props, "delay");
  const duration = useVector2(props, "duration");
  const strength = useVector2(props, "strength");
  const chromaticAberrationOffset = useVector2(props, "chromaticAberrationOffset");
  const effect = useMemo(
    () => new GlitchEffect({ ...props, delay, duration, strength, chromaticAberrationOffset }),
    [delay, duration, props, strength, chromaticAberrationOffset]
  );
  useLayoutEffect(() => {
    effect.mode = active ? props.mode || GlitchMode.SPORADIC : GlitchMode.DISABLED;
    invalidate();
  }, [active, effect, invalidate, props.mode]);
  useEffect(() => {
    return () => {
      var _a;
      (_a = effect.dispose) == null ? void 0 : _a.call(effect);
    };
  }, [effect]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  Glitch
};
//# sourceMappingURL=Glitch.js.map
