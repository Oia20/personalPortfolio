"use strict";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const THREE = require("three");
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
class FullScreenTriangleGeometry extends THREE__namespace.BufferGeometry {
  constructor() {
    super();
    __publicField(this, "boundingSphere", new THREE__namespace.Sphere());
    this.setAttribute("position", new THREE__namespace.BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2));
    this.setAttribute("uv", new THREE__namespace.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
  }
  computeBoundingSphere() {
  }
}
const _geometry = new FullScreenTriangleGeometry();
const _camera = new THREE__namespace.OrthographicCamera();
class FullScreenTriangle {
  constructor(material) {
    this._mesh = new THREE__namespace.Mesh(_geometry, material);
    this._mesh.frustumCulled = false;
  }
  render(renderer) {
    renderer.render(this._mesh, _camera);
  }
  get material() {
    return this._mesh.material;
  }
  set material(value) {
    this._mesh.material = value;
  }
  dispose() {
    this._mesh.material.dispose();
    this._mesh.geometry.dispose();
  }
}
exports.FullScreenTriangle = FullScreenTriangle;
//# sourceMappingURL=FullScreenTriangle.cjs.map
