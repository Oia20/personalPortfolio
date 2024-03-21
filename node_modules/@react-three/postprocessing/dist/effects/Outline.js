import { jsx } from "react/jsx-runtime";
import { OutlineEffect } from "postprocessing";
import { forwardRef, useContext, useMemo, useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposerContext } from "../EffectComposer.js";
import { selectionContext } from "../Selection.js";
import { resolveRef } from "../util.js";
const Outline = forwardRef(function Outline2({
  selection = [],
  selectionLayer = 10,
  blendFunction,
  patternTexture,
  edgeStrength,
  pulseSpeed,
  visibleEdgeColor,
  hiddenEdgeColor,
  width,
  height,
  kernelSize,
  blur,
  xRay,
  ...props
}, forwardRef2) {
  const invalidate = useThree((state) => state.invalidate);
  const { scene, camera } = useContext(EffectComposerContext);
  const effect = useMemo(
    () => new OutlineEffect(scene, camera, {
      blendFunction,
      patternTexture,
      edgeStrength,
      pulseSpeed,
      visibleEdgeColor,
      hiddenEdgeColor,
      width,
      height,
      kernelSize,
      blur,
      xRay,
      ...props
    }),
    [
      blendFunction,
      blur,
      camera,
      edgeStrength,
      height,
      hiddenEdgeColor,
      kernelSize,
      patternTexture,
      pulseSpeed,
      scene,
      visibleEdgeColor,
      width,
      xRay
    ]
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
    effect.selectionLayer = selectionLayer;
    invalidate();
  }, [effect, invalidate, selectionLayer]);
  useRef();
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
  useEffect(() => {
    return () => {
      effect.dispose();
    };
  }, [effect]);
  return /* @__PURE__ */ jsx("primitive", { ref: forwardRef2, object: effect });
});
export {
  Outline
};
//# sourceMappingURL=Outline.js.map
