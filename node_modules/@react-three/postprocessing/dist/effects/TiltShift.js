import { BlendFunction, TiltShiftEffect } from "postprocessing";
import { wrapEffect } from "../util.js";
const TiltShift = wrapEffect(TiltShiftEffect, { blendFunction: BlendFunction.ADD });
export {
  TiltShift
};
//# sourceMappingURL=TiltShift.js.map
