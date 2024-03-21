import { jsx } from "react/jsx-runtime";
import { forwardRef, useMemo, useLayoutEffect } from "react";
import { N8AOPostPass } from "./N8AOPostPass.js";
import { useThree, applyProps } from "@react-three/fiber";
const N8AO = forwardRef(
  ({
    halfRes,
    screenSpaceRadius,
    quality,
    depthAwareUpsampling = true,
    aoRadius = 5,
    aoSamples = 16,
    denoiseSamples = 4,
    denoiseRadius = 12,
    distanceFalloff = 1,
    intensity = 1,
    color,
    renderMode = 0
  }, ref) => {
    const { camera, scene } = useThree();
    const effect = useMemo(() => new N8AOPostPass(scene, camera), []);
    useLayoutEffect(() => {
      applyProps(effect.configuration, {
        color,
        aoRadius,
        distanceFalloff,
        intensity,
        aoSamples,
        denoiseSamples,
        denoiseRadius,
        screenSpaceRadius,
        renderMode,
        halfRes,
        depthAwareUpsampling
      });
    }, [
      screenSpaceRadius,
      color,
      aoRadius,
      distanceFalloff,
      intensity,
      aoSamples,
      denoiseSamples,
      denoiseRadius,
      renderMode,
      halfRes,
      depthAwareUpsampling
    ]);
    useLayoutEffect(() => {
      if (quality)
        effect.setQualityMode(quality.charAt(0).toUpperCase() + quality.slice(1));
    }, [quality]);
    return /* @__PURE__ */ jsx("primitive", { ref, object: effect });
  }
);
export {
  N8AO
};
//# sourceMappingURL=index.js.map
