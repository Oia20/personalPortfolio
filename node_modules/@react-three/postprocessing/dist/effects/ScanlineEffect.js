import { BlendFunction, ScanlineEffect } from "postprocessing";
import { wrapEffect } from "../util.js";
const Scanline = wrapEffect(ScanlineEffect, { blendFunction: BlendFunction.OVERLAY, density: 1.25 });
export {
  Scanline
};
//# sourceMappingURL=ScanlineEffect.js.map
