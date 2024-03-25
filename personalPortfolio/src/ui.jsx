import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import * as THREE from 'three'; // Importing THREE library
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function BpTab() {
  const gltf = useLoader(GLTFLoader, './models/bptabbrown.glb');
  const group = useRef();

  // Handle click event
  const handleClick = () => {
    bpset(false)
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function BpBox(props) {
  // Create a ref to manipulate the mesh
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // Rotate the mesh in each frame
  useFrame(({ clock }) => {
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) / 4
  })
  return (
    <group position={[-6.4, -1, .2]} rotation={[0, -1.2, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >
        <BpTab />
      </mesh>
    </group>
  );
}


function GhTab() {
  const gltf = useLoader(GLTFLoader, './models/ghtabbrown.glb');
  const group = useRef();

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

function GhBox(props) {
  // Create a ref to manipulate the mesh
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // Rotate the mesh in each frame
  useFrame(({ clock }) => {
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) / 4
  })
  return (
    <group position={[-2.4, -1, 0]} rotation={[0, -1.4, 0]}>
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



function InTab() {
  const gltf = useLoader(GLTFLoader, './models/intabbrown.glb');
  const group = useRef();

  // Handle click event
  const handleClick = () => {
    window.open("https://www.linkedin.com/in/jacob-dement-35658b275/", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function InBox(props) {
  // Create a ref to manipulate the mesh
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // Rotate the mesh in each frame
  useFrame(({ clock }) => {
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) / 4
  })
  return (
    <group position={[2.2, -1, 0]} rotation={[0, -1.6, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >
        <InTab />
      </mesh>
    </group>
  );
}


function ImTab() {
  const gltf = useLoader(GLTFLoader, './models/imgtabbrown.glb');
  const group = useRef();

  // Handle click event
  const handleClick = () => {
    window.open("https://oia20.github.io/PortfolioAbout/", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function ImBox(props) {
  // Create a ref to manipulate the mesh
  const mesh = useRef();
  const [isHovered, setIsHovered] = useState(false);
  // Rotate the mesh in each frame
  useFrame(({ clock }) => {
      mesh.current.rotation.z = Math.sin(clock.getElapsedTime()) / 4
  })
  return (
    <group position={[6.3, -1, 0]} rotation={[0, -1.8, 0]}>
      <mesh
        ref={mesh}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
      >

        <ImTab />
      </mesh>
    </group>
  );
}

export default function UI() {
    return (
        <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 90, position: [0, 0, 5] }}>
            <directionalLight position={[0, 0, 5]} />
            <GhBox />

            <BpBox />

            <InBox />
            <ImBox />
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

            <Center position={[-2, -2.2, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  Github
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>

            <Center position={[-6.2, -2.2, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  Work
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>

            <Center position={[-6.2, -2.7, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  &
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>

            <Center position={[-6.2, -3.1, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  Projects
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>

            <Center position={[2, -2.2, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  LinkedIn
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>

            <Center position={[6, -2.2, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  About Me
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>
            <Center position={[6, -2.7, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  &
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>
            <Center position={[6, -3.1, 0]}>
              <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.4}>
                  Contact
              <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
              </Text3D>
            </Center>
        </Canvas>
    );
}
