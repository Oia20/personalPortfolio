import { BlendFunction, NoiseEffect } from "postprocessing";
import { wrapEffect } from "../util.js";
const Noise = wrapEffect(NoiseEffect, { blendFunction: BlendFunction.COLOR_DODGE });
export {
  Noise
};
//# sourceMappingURL=Noise.js.map
