import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, MeshWobbleMaterial, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function BpTab() {
    const gltf = useLoader(GLTFLoader, './models/MaroonBackTab.glb');
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
      <group position={[-2.4, -5, .2]} rotation={[0, -1.4, 0]}>
        <mesh
          ref={mesh}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          scale={isHovered ? [1.2, 1.2, 1.2] : [1.2, 1.2, 1.2]}
        >
          <BpTab />
        </mesh>
      </group>
    );
  }
  
  
  function GhTab() {
    const gltf = useLoader(GLTFLoader, './models/MaroonGitTab.glb');
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
          scale={isHovered ? [1.2, 1.2, 1.2] : [1.2, 1.2, 1.2]}
        >
          <GhTab />
        </mesh>
      </group>
    );
  }
  
  
  
  function InTab() {
    const gltf = useLoader(GLTFLoader, './models/MaroonLinkedTab.glb');
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
          scale={isHovered ? [1.2, 1.2, 1.2] : [1.2, 1.2, 1.2]}
        >
          <InTab />
        </mesh>
      </group>
    );
  }
  
  
  function ImTab() {
    const gltf = useLoader(GLTFLoader, './models/MaroonImgTab.glb');
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
      <group position={[2.2, -5, 0]} rotation={[0, -1.6, 0]}>
        <mesh
          ref={mesh}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
          scale={isHovered ? [1.2, 1.2, 1.2] : [1.2, 1.2, 1.2]}
        >
  
          <ImTab />
        </mesh>
      </group>
    );
  }
  
  export default function Skin() {
    const [first, setFirst] = useState(true)
    function First() {
      if (first) {
        return (
          <group>
          <Center position={[0, 9, 0]} rotation={[.7, 0, 0]}>
          <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={0} bevelSize={0.04} bevelThickness={0.01} letterSpacing={0.1} size={.3}>
              *Press, Drag, or Pinch
          <MeshWobbleMaterial factor={.1} speed={1} color="red"/>
          </Text3D>
          </Center>
          <Center position={[0, 8.2, 0]} rotation={[.7, 0, 0]}>
          <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.01} letterSpacing={0.1} size={.3}>
              to Look Around*
          <MeshWobbleMaterial factor={.1} speed={1} color="red"/>
          </Text3D>
          </Center>
        </group>
        )
      }
    }

      return (
          <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 130, position: [0, 0, 5] }} onClick={() => setFirst(false)}>
              <OrbitControls maxDistance={7} minDistance={1} enablePan={false} maxAzimuthAngle={1.5} minAzimuthAngle={-1.5} maxPolarAngle={2} enableDamping enableRotate enableZoom minPolarAngle={1}/>

              <directionalLight position={[0, 0, 5]} />
              <GhBox />
  
              <BpBox />
              {/* <First /> */}
              <InBox />
              <ImBox />
              <Center position={[0, 7, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={1.3}>
                    Hi! I'm
                <MeshWobbleMaterial factor={.1} speed={1} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[0, 5, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={1.3}>
                    Jacob
                <MeshWobbleMaterial factor={.1} speed={1} color="#ffff00"/>
                </Text3D>
              </Center>

              <Center position={[0, 3, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={1.3}>
                    Dement!
                <MeshWobbleMaterial factor={.1} speed={1} color="#ffff00"/>
                </Text3D>
              </Center>



              <Center position={[0, 1.5, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    ~ Software Developer
                <MeshDistortMaterial distort={.1} speed={5} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[-2, -2.2, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    Github
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[-2.4, -6.9, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    Work
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[-2.4, -7.7, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    &
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[-2.4, -8.4, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    Projects
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[2, -2.2, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    LinkedIn
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
  
              <Center position={[2.2, -6.9, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    About Me
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
              <Center position={[2.2, -7.7, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    &
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
              <Center position={[2.2, -8.4, 0]}>
                <Text3D font={'Pixelify Sans_Regular.json'}  curveSegments={32} bevelSize={0.04} bevelThickness={0.1} letterSpacing={0.1} size={.5}>
                    Contact
                <MeshDistortMaterial distort={.3} speed={2} color="#ffff00"/>
                </Text3D>
              </Center>
          </Canvas>
      );
  }
  