"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const postprocessing = require("postprocessing");
const EffectComposer = require("../EffectComposer.cjs");
const SSAO = React.forwardRef(function SSAO2(props, ref) {
  const { camera, normalPass, downSamplingPass, resolutionScale } = React.useContext(EffectComposer.EffectComposerContext);
  const effect = React.useMemo(() => {
    if (normalPass === null && downSamplingPass === null) {
      console.error("Please enable the NormalPass in the EffectComposer in order to use SSAO.");
      return {};
    }
    return new postprocessing.SSAOEffect(camera, normalPass && !downSamplingPass ? normalPass.texture : null, {
      blendFunction: postprocessing.BlendFunction.MULTIPLY,
      samples: 30,
      rings: 4,
      distanceThreshold: 1,
      distanceFalloff: 0,
      rangeThreshold: 0.5,
      rangeFalloff: 0.1,
      luminanceInfluence: 0.9,
      radius: 20,
      bias: 0.5,
      intensity: 1,
      color: void 0,
      // @ts-ignore
      normalDepthBuffer: downSamplingPass ? downSamplingPass.texture : null,
      resolutionScale: resolutionScale != null ? resolutionScale : 1,
      depthAwareUpsampling: true,
      ...props
    });
  }, [camera, normalPass, props]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.SSAO = SSAO;
//# sourceMappingURL=SSAO.cjs.map
