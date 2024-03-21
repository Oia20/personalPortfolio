"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const N8AOPostPass = require("./N8AOPostPass.cjs");
const fiber = require("@react-three/fiber");
const N8AO = React.forwardRef(
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
    const { camera, scene } = fiber.useThree();
    const effect = React.useMemo(() => new N8AOPostPass.N8AOPostPass(scene, camera), []);
    React.useLayoutEffect(() => {
      fiber.applyProps(effect.configuration, {
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
    React.useLayoutEffect(() => {
      if (quality)
        effect.setQualityMode(quality.charAt(0).toUpperCase() + quality.slice(1));
    }, [quality]);
    return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect });
  }
);
exports.N8AO = N8AO;
//# sourceMappingURL=index.cjs.map
