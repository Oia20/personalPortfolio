import { jsx } from "react/jsx-runtime";
import React from "react";
import * as THREE from "three";
import { extend, useThree } from "@react-three/fiber";
const resolveRef = (ref) => typeof ref === "object" && ref != null && "current" in ref ? ref.current : ref;
let i = 0;
const components = /* @__PURE__ */ new WeakMap();
const wrapEffect = (effect, defaults) => /* @__PURE__ */ React.forwardRef(function Effect({ blendFunction = defaults == null ? void 0 : defaults.blendFunction, opacity = defaults == null ? void 0 : defaults.opacity, ...props }, ref) {
  let Component = components.get(effect);
  if (!Component) {
    const key = `@react-three/postprocessing/${effect.name}-${i++}`;
    extend({ [key]: effect });
    components.set(effect, Component = key);
  }
  const camera = useThree((state) => state.camera);
  const args = React.useMemo(
    () => {
      var _a, _b;
      return [...(_a = defaults == null ? void 0 : defaults.args) != null ? _a : [], ...(_b = props.args) != null ? _b : [{ ...defaults, ...props }]];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(props)]
  );
  return /* @__PURE__ */ jsx(
    Component,
    {
      camera,
      "blendMode-blendFunction": blendFunction,
      "blendMode-opacity-value": opacity,
      ...props,
      ref,
      args
    }
  );
});
const useVector2 = (props, key) => {
  const value = props[key];
  return React.useMemo(() => {
    if (typeof value === "number")
      return new THREE.Vector2(value, value);
    else if (value)
      return new THREE.Vector2(...value);
    else
      return new THREE.Vector2();
  }, [value]);
};
export {
  resolveRef,
  useVector2,
  wrapEffect
};
//# sourceMappingURL=util.js.map
