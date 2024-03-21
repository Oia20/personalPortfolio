"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const postprocessing = require("postprocessing");
const util = require("../util.cjs");
const Noise = util.wrapEffect(postprocessing.NoiseEffect, { blendFunction: postprocessing.BlendFunction.COLOR_DODGE });
exports.Noise = Noise;
//# sourceMappingURL=Noise.cjs.map
