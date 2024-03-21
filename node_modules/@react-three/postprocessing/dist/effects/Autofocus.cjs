"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const THREE = require("three");
const React = require("react");
const fiber = require("@react-three/fiber");
const postprocessing = require("postprocessing");
const maath = require("maath");
const DepthOfField = require("./DepthOfField.cjs");
const EffectComposer = require("../EffectComposer.cjs");
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
const Autofocus = React.forwardRef(
  ({ target = void 0, mouse: followMouse = false, debug = void 0, manual = false, smoothTime = 0.25, ...props }, fref) => {
    const dofRef = React.useRef(null);
    const hitpointRef = React.useRef(null);
    const targetRef = React.useRef(null);
    const scene = fiber.useThree(({ scene: scene2 }) => scene2);
    const pointer = fiber.useThree(({ pointer: pointer2 }) => pointer2);
    const { composer, camera } = React.useContext(EffectComposer.EffectComposerContext);
    const [depthPickingPass] = React.useState(() => new postprocessing.DepthPickingPass());
    const [copyPass] = React.useState(() => new postprocessing.CopyPass());
    React.useEffect(() => {
      composer.addPass(depthPickingPass);
      composer.addPass(copyPass);
      return () => {
        composer.removePass(depthPickingPass);
        composer.removePass(copyPass);
      };
    }, [composer, depthPickingPass, copyPass]);
    React.useEffect(() => {
      return () => {
        depthPickingPass.dispose();
        copyPass.dispose();
      };
    }, [depthPickingPass, copyPass]);
    const [hitpoint] = React.useState(() => new THREE__namespace.Vector3(0, 0, 0));
    const [ndc] = React.useState(() => new THREE__namespace.Vector3(0, 0, 0));
    const getHit = React.useCallback(
      async (x, y) => {
        ndc.x = x;
        ndc.y = y;
        ndc.z = await depthPickingPass.readDepth(ndc);
        ndc.z = ndc.z * 2 - 1;
        const hit = 1 - ndc.z > 1e-7;
        return hit ? ndc.unproject(camera) : false;
      },
      [ndc, depthPickingPass, camera]
    );
    const update = React.useCallback(
      async (delta, updateTarget = true) => {
        var _a;
        if (target) {
          hitpoint.set(...target);
        } else {
          const { x, y } = followMouse ? pointer : { x: 0, y: 0 };
          const hit = await getHit(x, y);
          if (hit)
            hitpoint.copy(hit);
        }
        if (updateTarget && ((_a = dofRef.current) == null ? void 0 : _a.target)) {
          if (smoothTime > 0 && delta > 0) {
            maath.easing.damp3(dofRef.current.target, hitpoint, smoothTime, delta);
          } else {
            dofRef.current.target.copy(hitpoint);
          }
        }
      },
      [target, hitpoint, followMouse, getHit, smoothTime, pointer]
    );
    fiber.useFrame(async (_, delta) => {
      var _a;
      if (!manual) {
        update(delta);
      }
      if (hitpointRef.current) {
        hitpointRef.current.position.copy(hitpoint);
      }
      if (targetRef.current && ((_a = dofRef.current) == null ? void 0 : _a.target)) {
        targetRef.current.position.copy(dofRef.current.target);
      }
    });
    const api = React.useMemo(
      () => ({
        dofRef,
        hitpoint,
        update
      }),
      [hitpoint, update]
    );
    React.useImperativeHandle(fref, () => api, [api]);
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      debug ? fiber.createPortal(
        /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs("mesh", { ref: hitpointRef, children: [
            /* @__PURE__ */ jsxRuntime.jsx("sphereGeometry", { args: [debug, 16, 16] }),
            /* @__PURE__ */ jsxRuntime.jsx("meshBasicMaterial", { color: "#00ff00", opacity: 1, transparent: true, depthWrite: false })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("mesh", { ref: targetRef, children: [
            /* @__PURE__ */ jsxRuntime.jsx("sphereGeometry", { args: [debug / 2, 16, 16] }),
            /* @__PURE__ */ jsxRuntime.jsx("meshBasicMaterial", { color: "#00ff00", opacity: 0.5, transparent: true, depthWrite: false })
          ] })
        ] }),
        scene
      ) : null,
      /* @__PURE__ */ jsxRuntime.jsx(DepthOfField.DepthOfField, { ref: dofRef, ...props, target: hitpoint })
    ] });
  }
);
exports.Autofocus = Autofocus;
//# sourceMappingURL=Autofocus.cjs.map
