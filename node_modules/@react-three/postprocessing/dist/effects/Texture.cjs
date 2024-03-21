"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const postprocessing = require("postprocessing");
const React = require("react");
const fiber = require("@react-three/fiber");
const THREE = require("three");
const Texture = React.forwardRef(function Texture2({ textureSrc, texture, ...props }, ref) {
  const t = fiber.useLoader(THREE.TextureLoader, textureSrc);
  React.useLayoutEffect(() => {
    if ("encoding" in t)
      t.encoding = 3001;
    else
      t.colorSpace = "srgb";
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
  }, [t]);
  const effect = React.useMemo(() => new postprocessing.TextureEffect({ ...props, texture: t || texture }), [props, t, texture]);
  return /* @__PURE__ */ jsxRuntime.jsx("primitive", { ref, object: effect, dispose: null });
});
exports.Texture = Texture;
//# sourceMappingURL=Texture.cjs.map
