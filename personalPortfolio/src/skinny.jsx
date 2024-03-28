import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  
  export default function Skin() {

      return (
          <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 130, position: [0, 0, 5] }} onClick={() => setFirst(false)}>
              <OrbitControls maxDistance={7} minDistance={1} enablePan={false} maxAzimuthAngle={1.5} minAzimuthAngle={-1.5} maxPolarAngle={2} enableDamping enableRotate enableZoom minPolarAngle={1}/>
          </Canvas>
      );
  }
  