"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const selectionContext = React.createContext(null);
function Selection({ children, enabled = true }) {
  const [selected, select] = React.useState([]);
  const value = React.useMemo(() => ({ selected, select, enabled }), [selected, select, enabled]);
  return /* @__PURE__ */ jsxRuntime.jsx(selectionContext.Provider, { value, children });
}
function Select({ enabled = false, children, ...props }) {
  const group = React.useRef(null);
  const api = React.useContext(selectionContext);
  React.useEffect(() => {
    if (api && enabled) {
      let changed = false;
      const current = [];
      group.current.traverse((o) => {
        o.type === "Mesh" && current.push(o);
        if (api.selected.indexOf(o) === -1)
          changed = true;
      });
      if (changed) {
        api.select((state) => [...state, ...current]);
        return () => {
          api.select((state) => state.filter((selected) => !current.includes(selected)));
        };
      }
    }
  }, [enabled, children, api]);
  return /* @__PURE__ */ jsxRuntime.jsx("group", { ref: group, ...props, children });
}
exports.Select = Select;
exports.Selection = Selection;
exports.selectionContext = selectionContext;
//# sourceMappingURL=Selection.cjs.map
