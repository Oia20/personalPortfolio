"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const postprocessing = require("postprocessing");
const util = require("../util.cjs");
const TiltShift = util.wrapEffect(postprocessing.TiltShiftEffect, { blendFunction: postprocessing.BlendFunction.ADD });
exports.TiltShift = TiltShift;
//# sourceMappingURL=TiltShift.cjs.map
