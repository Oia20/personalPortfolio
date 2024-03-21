"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const fiber = require("@react-three/fiber");
const EffectComposer = require("../EffectComposer.cjs");
const Selection = require("../Selection.cjs");
const util = require("../util.cjs");
const Outline = React.forwardRef(function Outline2({
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
  const invalidate = fiber.useThree((state) => state.invalidate);
  const { scene, camera } = React.useContext(EffectComposer.EffectComposerContext);
  const effect = React.useMemo(
    () => new postprocessing.OutlineEffect(scene, camera, {
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
    effect.selectionLayer = selectionLayer;
    invalidate();
  }, [effect, invalidate, selectionLayer]);
  React.useRef();
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
  React.useEffect(() => {
    return () => {
      effect.dispose();
    };
  }, [effect]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref: forwardRef2, object: effect });
});
exports.Outline = Outline;
//# sourceMappingURL=Outline.cjs.map
