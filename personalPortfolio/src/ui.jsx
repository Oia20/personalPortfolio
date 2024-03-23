import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three'; // Importing THREE library


export default function UI() {

    function Box(props) {
        // Create a ref to manipulate the mesh
        const mesh = useRef();
        // State to track hover
        const [isHovered, setIsHovered] = useState(false);
      
        return (
          <mesh position={[-2, -1, 0]}
            {...props}
            ref={mesh}
            onPointerOver={(event) => setIsHovered(true)}
            onPointerOut={(event) => setIsHovered(false)}
            scale={isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1]} // Scale up when hovered
          >
            <boxGeometry args={[1, 1, 1]} />
            <MeshWobbleMaterial factor={isHovered ? .4 : .2} speed={isHovered ? 3 : 1}/>
          </mesh>
        );
      }
    


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
                  a Software Developer
              <MeshWobbleMaterial factor={.2} speed={1.5} color="#ffff00"/>
              <MeshDistortMaterial distort={.1} speed={5} color="#ffff00"/>
              </Text3D>
            </Center>
        </Canvas>
    );
  }