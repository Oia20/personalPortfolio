import { jsx } from "react/jsx-runtime";
import { TextureEffect } from "postprocessing";
import { forwardRef, useLayoutEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping } from "three";
const Texture = forwardRef(function Texture2({ textureSrc, texture, ...props }, ref) {
  const t = useLoader(TextureLoader, textureSrc);
  useLayoutEffect(() => {
    if ("encoding" in t)
      t.encoding = 3001;
    else
      t.colorSpace = "srgb";
    t.wrapS = t.wrapT = RepeatWrapping;
  }, [t]);
  const effect = useMemo(() => new TextureEffect({ ...props, texture: t || texture }), [props, t, texture]);
  return /* @__PURE__ */ jsx("primitive", { ref, object: effect, dispose: null });
});
export {
  Texture
};
//# sourceMappingURL=Texture.js.map
