"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const postprocessing = require("postprocessing");
const util = require("../util.cjs");
const Bloom = util.wrapEffect(postprocessing.BloomEffect, {
  blendFunction: postprocessing.BlendFunction.ADD
});
exports.Bloom = Bloom;
//# sourceMappingURL=Bloom.cjs.map
