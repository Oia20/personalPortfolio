import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html, useProgress } from '@react-three/drei';
import { OrbitControls, Stars } from '@react-three/drei';

function GrandExchange() {
  const gltf = useLoader(GLTFLoader, '/models/osrsGE.glb');
  const group = useRef();

  return (
    <group ref={group}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <h1>{progress} % loaded</h1>
    </Html>
  );
}

export default function App() {
  const cameraRef = useRef();

  useFrame(() => {
    if (cameraRef.current) {
      const time = Date.now() * 0.001;
      const radius = 20;
      const x = Math.sin(time) * radius;
      const z = Math.cos(time) * radius;
      cameraRef.current.position.set(x, 10, z);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ position: [-30, 10, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Suspense fallback={<Loader />}>
        <GrandExchange />
      </Suspense>
      <OrbitControls />
      <perspectiveCamera
        ref={cameraRef}
        position={[-30, 10, 5]}
        fov={75}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
      />
    </Canvas>
  );
}
