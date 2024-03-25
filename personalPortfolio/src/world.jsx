import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Html, useProgress } from '@react-three/drei';
import * as THREE from 'three'; // Importing THREE library
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
const memory = navigator.deviceMemory;

function GrandExchange() {
  const gltf = useLoader(GLTFLoader, './models/Varrock5.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Castle() {
  const gltf = useLoader(GLTFLoader, './models/Varrock4.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Square() {
  const gltf = useLoader(GLTFLoader, './models/Varrock1.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}
function Cooking() {
  const gltf = useLoader(GLTFLoader, './models/Varrock2.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}
function Barbarian() {
  const gltf = useLoader(GLTFLoader, './models/Varrock3.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}
function Edgeville() {
  const gltf = useLoader(GLTFLoader, './models/Varrock6.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}
function Woods1() {
  const gltf = useLoader(GLTFLoader, './models/Varrock7.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  return (
    <group ref={group}> {/* Centering the model */}
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Woods2() {
  const gltf = useLoader(GLTFLoader, './models/Varrock8.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  boundingBox.getCenter(center);
  return (
    <group ref={group}> {/* Centering the model */}
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
      camera.lookAt(6, 12, 0);
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
  if (memory >= 7) {
    return (
      <Canvas style={{ background: "#111322",position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ position: [5, 20, 5] }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 0, 5]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1}/>
        <EffectComposer>
          <DepthOfField focusDistance={0} focalLength={0.001} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.02} />
        </EffectComposer>
        <Suspense fallback={<Loader />}>
          <CameraOrbit orbitRadius={20} orbitSpeed={0.2} />
          <GrandExchange />
          <Castle />
          <Square />
          <Cooking />
          <Barbarian />
          <Edgeville />
          <Woods1 />
          <Woods2 />
        </Suspense>
      </Canvas>
    );
  } return (
    <Canvas style={{ background: "#111322", position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ position: [5, 20, 5] }}>
    <ambientLight intensity={1.5} />
    <directionalLight position={[0, 0, 5]} />
    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    <EffectComposer>
      <DepthOfField focusDistance={0} focalLength={0.001} bokehScale={2} height={480} />
      <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1} />
    </EffectComposer>
    <Suspense fallback={<Loader />}>
      <CameraOrbit orbitRadius={20} orbitSpeed={0.2} />
      <GrandExchange />
    </Suspense>
  </Canvas>
  )

}
