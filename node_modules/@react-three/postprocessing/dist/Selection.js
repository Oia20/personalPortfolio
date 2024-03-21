import { jsx } from "react/jsx-runtime";
import { createContext, useState, useMemo, useRef, useContext, useEffect } from "react";
const selectionContext = createContext(null);
function Selection({ children, enabled = true }) {
  const [selected, select] = useState([]);
  const value = useMemo(() => ({ selected, select, enabled }), [selected, select, enabled]);
  return /* @__PURE__ */ jsx(selectionContext.Provider, { value, children });
}
function Select({ enabled = false, children, ...props }) {
  const group = useRef(null);
  const api = useContext(selectionContext);
  useEffect(() => {
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
  return /* @__PURE__ */ jsx("group", { ref: group, ...props, children });
}
export {
  Select,
  Selection,
  selectionContext
};
//# sourceMappingURL=Selection.js.map
