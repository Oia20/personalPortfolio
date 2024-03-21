import { jsx } from "react/jsx-runtime";
import { forwardRef, useContext, useMemo } from "react";
import { SSAOEffect, BlendFunction } from "postprocessing";
import { EffectComposerContext } from "../EffectComposer.js";
const SSAO = forwardRef(function SSAO2(props, ref) {
  const { camera, normalPass, downSamplingPass, resolutionScale } = useContext(EffectComposerContext);
  const effect = useMemo(() => {
    if (normalPass === null && downSamplingPass === null) {
      console.error("Please enable the NormalPass in the EffectComposer in order to use SSAO.");
      return {};
    }
    return new SSAOEffect(camera, normalPass && !downSamplingPass ? normalPass.texture : null, {
      blendFunction: BlendFunction.MULTIPLY,
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
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  SSAO
};
//# sourceMappingURL=SSAO.js.map
