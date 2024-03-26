import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


function YellowH() {
    const gltf = useLoader(GLTFLoader, './models/yellowHat.glb');
    const group = useRef();
  
    return (
      <group ref={group}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function YellowB(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    const [isHovered, setIsHovered] = useState(false);
    // Rotate the mesh in each frame
    return (
      <group position={[0, 0, 0]} rotation={[0, -1.2, 0]}>
        <mesh
          ref={mesh}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          scale={isHovered ? [3, 3, 3] : [2, 2, 2]}
        >
          <YellowH />
        </mesh>
      </group>
    );
  }

export default function Hats() {
    return (
        <YellowB />
    )
}