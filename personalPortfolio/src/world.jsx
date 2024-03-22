import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html, useProgress } from '@react-three/drei';
import * as THREE from 'three'; // Importing THREE library
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'

function GrandExchange() {
  const gltf = useLoader(GLTFLoader, './models/osrsGE.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  
  return (
    <group ref={group} position={[-center.x, -center.y -5, -center.z + 1]}> {/* Centering the model */}
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

function CameraOrbit({ orbitRadius, orbitSpeed }) {
  const { camera } = useThree();
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
    const updateCamera = () => {
      const elapsedTime = clock.current.getElapsedTime();
      camera.position.x = Math.sin(orbitSpeed * elapsedTime) * orbitRadius;
      camera.position.z = Math.cos(orbitSpeed * elapsedTime) * orbitRadius;
      camera.lookAt(10, 0, 0);
    };

    const animate = () => {
      updateCamera();
      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, [camera, orbitRadius, orbitSpeed]);

  return null;
}

export default function App() {
  return (
    <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ position: [5, 20, 5] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 0, 5]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.01} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={.4} />
      </EffectComposer>
      <Suspense fallback={<Loader />}>
        <CameraOrbit orbitRadius={15} orbitSpeed={0.2} />
        <GrandExchange />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
