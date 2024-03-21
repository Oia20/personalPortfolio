"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const THREE = require("three");
const fiber = require("@react-three/fiber");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const THREE__namespace = /* @__PURE__ */ _interopNamespaceDefault(THREE);
const resolveRef = (ref) => typeof ref === "object" && ref != null && "current" in ref ? ref.current : ref;
let i = 0;
const components = /* @__PURE__ */ new WeakMap();
const wrapEffect = (effect, defaults) => /* @__PURE__ */ React.forwardRef(function Effect({ blendFunction = defaults == null ? void 0 : defaults.blendFunction, opacity = defaults == null ? void 0 : defaults.opacity, ...props }, ref) {
  let Component = components.get(effect);
  if (!Component) {
    const key = `@react-three/postprocessing/${effect.name}-${i++}`;
    fiber.extend({ [key]: effect });
    components.set(effect, Component = key);
  }
  const camera = fiber.useThree((state) => state.camera);
  const args = React.useMemo(
    () => {
      var _a, _b;
      return [...(_a = defaults == null ? void 0 : defaults.args) != null ? _a : [], ...(_b = props.args) != null ? _b : [{ ...defaults, ...props }]];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(props)]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
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
      return new THREE__namespace.Vector2(value, value);
    else if (value)
      return new THREE__namespace.Vector2(...value);
    else
      return new THREE__namespace.Vector2();
  }, [value]);
};
exports.resolveRef = resolveRef;
exports.useVector2 = useVector2;
exports.wrapEffect = wrapEffect;
//# sourceMappingURL=util.cjs.map
