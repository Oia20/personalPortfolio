import { BlendFunction, BloomEffect } from "postprocessing";
import { wrapEffect } from "../util.js";
const Bloom = wrapEffect(BloomEffect, {
  blendFunction: BlendFunction.ADD
});
export {
  Bloom
};
//# sourceMappingURL=Bloom.js.map
