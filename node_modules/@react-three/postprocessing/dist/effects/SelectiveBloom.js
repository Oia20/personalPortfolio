import { jsx } from "react/jsx-runtime";
import { SelectiveBloomEffect, BlendFunction } from "postprocessing";
import { forwardRef, useContext, useMemo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposerContext } from "../EffectComposer.js";
import { selectionContext } from "../Selection.js";
import { resolveRef } from "../util.js";
const addLight = (light, effect) => light.layers.enable(effect.selection.layer);
const removeLight = (light, effect) => light.layers.disable(effect.selection.layer);
const SelectiveBloom = forwardRef(function SelectiveBloom2({
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
  const invalidate = useThree((state) => state.invalidate);
  const { scene, camera } = useContext(EffectComposerContext);
  const effect = useMemo(
    () => new SelectiveBloomEffect(scene, camera, {
      blendFunction: BlendFunction.ADD,
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
  const api = useContext(selectionContext);
  useEffect(() => {
    if (!api && selection) {
      effect.selection.set(
        Array.isArray(selection) ? selection.map(resolveRef) : [resolveRef(selection)]
      );
      invalidate();
      return () => {
        effect.selection.clear();
        invalidate();
      };
    }
  }, [effect, selection, api, invalidate]);
  useEffect(() => {
    effect.selection.layer = selectionLayer;
    invalidate();
  }, [effect, invalidate, selectionLayer]);
  useEffect(() => {
    if (lights && lights.length > 0) {
      lights.forEach((light) => addLight(resolveRef(light), effect));
      invalidate();
      return () => {
        lights.forEach((light) => removeLight(resolveRef(light), effect));
        invalidate();
      };
    }
  }, [effect, invalidate, lights, selectionLayer]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx("primitive", { ref: forwardRef2, object: effect, dispose: null });
});
export {
  SelectiveBloom
};
//# sourceMappingURL=SelectiveBloom.js.map
