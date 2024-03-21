import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function GrandExchange() {
  const gltf = useLoader(GLTFLoader, '/models/osrsGE.glb');
  const group = useRef();

  return (
    <group ref={group}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}


export default function App() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ position: [-7, 10, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} />
      <pointLight position={[10, 10, 10]} />
      <mesh  position={[10, 10, 10]}>
        <boxGeometry/>
        <meshStandardMaterial />
      </mesh>
      {/* Add your model component */}
      <GrandExchange />

      {/* OrbitControls */}
      <OrbitControls />
    </Canvas>
  );
}