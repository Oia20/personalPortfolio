var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as THREE from "three";
class FullScreenTriangleGeometry extends THREE.BufferGeometry {
  constructor() {
    super();
    __publicField(this, "boundingSphere", new THREE.Sphere());
    this.setAttribute("position", new THREE.BufferAttribute(new Float32Array([-1, -1, 3, -1, -1, 3]), 2));
    this.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
  }
  computeBoundingSphere() {
  }
}
const _geometry = new FullScreenTriangleGeometry();
const _camera = new THREE.OrthographicCamera();
class FullScreenTriangle {
  constructor(material) {
    this._mesh = new THREE.Mesh(_geometry, material);
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
export {
  FullScreenTriangle
};
//# sourceMappingURL=FullScreenTriangle.js.map
