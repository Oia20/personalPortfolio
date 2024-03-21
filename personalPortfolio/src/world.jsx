import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { Box, Grid, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";
import { Html, useProgress } from '@react-three/drei'

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
  const { progress } = useProgress()
  return (
  <Html center>
    <h1>{progress} % loaded</h1>
  </Html>
  )
}

export default function App() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ position: [-30, 10, 5] }}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 5]} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Suspense fallback={<Loader />}>
      <GrandExchange />
      </Suspense>
      {/* OrbitControls */}
      <OrbitControls />
    </Canvas>
  );
}