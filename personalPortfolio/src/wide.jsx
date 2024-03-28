import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame} from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function LoadOcean() {
    const gltf = useLoader(GLTFLoader, './models/ocean.glb');
    const group = useRef();
  
    // Handle click event
    const handleClick = () => {
      console.log("Ocean Clicked")
    };
  
    return (
      <group ref={group} onClick={handleClick}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function Ocean(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    return (
      <group>
        <mesh
          ref={mesh}
          // onPointerOver={() => setIsHovered(true)}
          // onPointerOut={() => setIsHovered(false)}
          // scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          <LoadOcean />
        </mesh>
      </group>
    );
  }
  
 
  
  export default function Wide() {

    return (
      <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 130, position: [0, 0, 5] }} onClick={() => setFirst(false)}>
          <OrbitControls maxDistance={20} minDistance={1} enablePan={false} maxPolarAngle={2} enableDamping enableRotate enableZoom minPolarAngle={1}/>
          <ambientLight />
          <Ocean />
      </Canvas>
  );
}
