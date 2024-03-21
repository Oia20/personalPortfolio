import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { forwardRef, useRef, useContext, useState, useEffect, useCallback, useMemo, useImperativeHandle } from "react";
import { useThree, useFrame, createPortal } from "@react-three/fiber";
import { DepthPickingPass, CopyPass } from "postprocessing";
import { easing } from "maath";
import { DepthOfField } from "./DepthOfField.js";
import { EffectComposerContext } from "../EffectComposer.js";
const Autofocus = forwardRef(
  ({ target = void 0, mouse: followMouse = false, debug = void 0, manual = false, smoothTime = 0.25, ...props }, fref) => {
    const dofRef = useRef(null);
    const hitpointRef = useRef(null);
    const targetRef = useRef(null);
    const scene = useThree(({ scene: scene2 }) => scene2);
    const pointer = useThree(({ pointer: pointer2 }) => pointer2);
    const { composer, camera } = useContext(EffectComposerContext);
    const [depthPickingPass] = useState(() => new DepthPickingPass());
    const [copyPass] = useState(() => new CopyPass());
    useEffect(() => {
      composer.addPass(depthPickingPass);
      composer.addPass(copyPass);
      return () => {
        composer.removePass(depthPickingPass);
        composer.removePass(copyPass);
      };
    }, [composer, depthPickingPass, copyPass]);
    useEffect(() => {
      return () => {
        depthPickingPass.dispose();
        copyPass.dispose();
      };
    }, [depthPickingPass, copyPass]);
    const [hitpoint] = useState(() => new THREE.Vector3(0, 0, 0));
    const [ndc] = useState(() => new THREE.Vector3(0, 0, 0));
    const getHit = useCallback(
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
    const update = useCallback(
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
            easing.damp3(dofRef.current.target, hitpoint, smoothTime, delta);
          } else {
            dofRef.current.target.copy(hitpoint);
          }
        }
      },
      [target, hitpoint, followMouse, getHit, smoothTime, pointer]
    );
    useFrame(async (_, delta) => {
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
    const api = useMemo(
      () => ({
        dofRef,
        hitpoint,
        update
      }),
      [hitpoint, update]
    );
    useImperativeHandle(fref, () => api, [api]);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      debug ? createPortal(
        /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("mesh", { ref: hitpointRef, children: [
            /* @__PURE__ */ jsx("sphereGeometry", { args: [debug, 16, 16] }),
            /* @__PURE__ */ jsx("meshBasicMaterial", { color: "#00ff00", opacity: 1, transparent: true, depthWrite: false })
          ] }),
          /* @__PURE__ */ jsxs("mesh", { ref: targetRef, children: [
            /* @__PURE__ */ jsx("sphereGeometry", { args: [debug / 2, 16, 16] }),
            /* @__PURE__ */ jsx("meshBasicMaterial", { color: "#00ff00", opacity: 0.5, transparent: true, depthWrite: false })
          ] })
        ] }),
        scene
      ) : null,
      /* @__PURE__ */ jsx(DepthOfField, { ref: dofRef, ...props, target: hitpoint })
    ] });
  }
);
export {
  Autofocus
};
//# sourceMappingURL=Autofocus.js.map
