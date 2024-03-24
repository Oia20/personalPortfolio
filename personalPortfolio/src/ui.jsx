import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe } from '@react-three/drei';
import * as THREE from 'three'; // Importing THREE library
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function GhTab() {
  const gltf = useLoader(GLTFLoader, './models/githubtab.glb');
  const group = useRef();
  const boundingBox = new THREE.Box3().setFromObject(gltf.scene);

  // Handle click event
  const handleClick = () => {
    window.open("https://github.com/Oia20", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Box(props) {
  // Create a ref to manipulate the mesh
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // Rotate the mesh in each frame
  useFrame(({ clock }) => {
    if (isHovered) {
      mesh.current.rotation.x = Math.sin(1/2 + clock.getElapsedTime())
    }
  })
  return (
    <group position={[-2, -1, 0]} rotation={[0, -1.34, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >
        <GhTab />
      </mesh>
    </group>
  );
}

export default function UI() {
    return (
        <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 90, position: [0, 0, 5] }}>
            <directionalLight position={[0, 0, 5]} />
            <Box onClick={()=>window.open("https://github.com/Oia20", "_blank")}/>
            <Center position={[0, 3, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.8}>
                  Hi! I'm Jacob Dement!
              <MeshWobbleMaterial factor={.1} speed={1} color="#ffff00"/>
              </Text3D>
            </Center>
            <Center position={[0, 1.7, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                  ~ Software Developer
              <MeshDistortMaterial distort={.1} speed={5} color="#ffff00"/>
              </Text3D>
            </Center>
            <Center position={[-1.5, -2.2, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.3}>
                  My Github
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>
        </Canvas>
    );
}
