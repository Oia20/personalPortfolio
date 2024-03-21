"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const postprocessing = require("postprocessing");
const util = require("../util.cjs");
const Scanline = util.wrapEffect(postprocessing.ScanlineEffect, { blendFunction: postprocessing.BlendFunction.OVERLAY, density: 1.25 });
exports.Scanline = Scanline;
//# sourceMappingURL=ScanlineEffect.cjs.map
