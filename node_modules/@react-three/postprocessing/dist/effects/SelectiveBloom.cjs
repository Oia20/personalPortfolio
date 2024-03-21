"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const fiber = require("@react-three/fiber");
const EffectComposer = require("../EffectComposer.cjs");
const Selection = require("../Selection.cjs");
const util = require("../util.cjs");
const addLight = (light, effect) => light.layers.enable(effect.selection.layer);
const removeLight = (light, effect) => light.layers.disable(effect.selection.layer);
const SelectiveBloom = React.forwardRef(function SelectiveBloom2({
  selection = [],
  selectionLayer = 10,
  lights = [],
  luminanceThreshold,
  luminanceSmoothing,
  intensity,
  width,
  height,
  kernelSize,
  mipmapBlur,
  ...props
}, forwardRef2) {
  if (lights.length === 0) {
    console.warn("SelectiveBloom requires lights to work.");
  }
  const invalidate = fiber.useThree((state) => state.invalidate);
  const { scene, camera } = React.useContext(EffectComposer.EffectComposerContext);
  const effect = React.useMemo(
    () => new postprocessing.SelectiveBloomEffect(scene, camera, {
      blendFunction: postprocessing.BlendFunction.ADD,
      luminanceThreshold,
      luminanceSmoothing,
      intensity,
      width,
      height,
      kernelSize,
      mipmapBlur,
      ...props
    }),
    [scene, camera, luminanceThreshold, luminanceSmoothing, intensity, width, height, kernelSize, mipmapBlur, props]
  );
  const api = React.useContext(Selection.selectionContext);
  React.useEffect(() => {
    if (!api && selection) {
      effect.selection.set(
        Array.isArray(selection) ? selection.map(util.resolveRef) : [util.resolveRef(selection)]
      );
      invalidate();
      return () => {
        effect.selection.clear();
        invalidate();
      };
    }
  }, [effect, selection, api, invalidate]);
  React.useEffect(() => {
    effect.selection.layer = selectionLayer;
    invalidate();
  }, [effect, invalidate, selectionLayer]);
  React.useEffect(() => {
    if (lights && lights.length > 0) {
      lights.forEach((light) => addLight(util.resolveRef(light), effect));
      invalidate();
      return () => {
        lights.forEach((light) => removeLight(util.resolveRef(light), effect));
        invalidate();
      };
    }
  }, [effect, invalidate, lights, selectionLayer]);
  React.useEffect(() => {
    var _a;
    if (api && api.enabled) {
      if ((_a = api.selected) == null ? void 0 : _a.length) {
        effect.selection.set(api.selected);
        invalidate();
        return () => {
          effect.selection.clear();
          invalidate();
        };
      }
    }
  }, [api, effect.selection, invalidate]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref: forwardRef2, object: effect, dispose: null });
});
exports.SelectiveBloom = SelectiveBloom;
//# sourceMappingURL=SelectiveBloom.cjs.map
