import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { 
  Stars, 
  useProgress, 
  Html,
  Sparkles, 
  MeshWobbleMaterial, 
  Float, 
  Text3D, 
  MeshDistortMaterial 
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3, DirectionalLight } from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: 'white', fontSize: '2em' }}>
        {Math.ceil(progress)}% loaded
      </div>
    </Html>
  );
}

function CameraController() {
  const { camera } = useThree();
  const [targetIndex, setTargetIndex] = useState(0);
  const currentPosition = useRef(new Vector3(25, -8, 20));
  const currentLookAt = useRef(new Vector3(0, -10, 0));
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  
  const cameraPositions = [
    { position: new Vector3(0, -3, 4), target: new Vector3(0, -5, -1) },
    { position: new Vector3(23, -8, -2), target: new Vector3(0, -10, -15) },
    { position: new Vector3(7, -8, 26), target: new Vector3(4, -8, 22) },
    { position: new Vector3(25, -2, 35), target: new Vector3(0, -5, 0) },
  ];

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      // Ensure we don't process events too quickly
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      lastScrollTime.current = now;

      // Clear any existing timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Detect scroll direction, accounting for both mouse wheel and trackpad
      const delta = event.deltaY || event.wheelDelta || -event.detail;
      const direction = Math.sign(delta);

      // Set a timeout to actually perform the scroll
      scrollTimeout.current = setTimeout(() => {
        setTargetIndex((prev) => {
          const next = prev + direction;
          return Math.max(0, Math.min(next, cameraPositions.length - 1));
        });
      }, 50);
    };

    // Add both wheel and touchpad event listeners
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('mousewheel', handleScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousewheel', handleScroll);
      window.removeEventListener('DOMMouseScroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useFrame(() => {
    const lerpFactor = 0.03;
    const targetPosition = cameraPositions[targetIndex].position;
    const targetLookAt = cameraPositions[targetIndex].target;
    
    currentPosition.current.lerp(targetPosition, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    
    camera.position.copy(currentPosition.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function LoadOcean() {
  const gltf = useLoader(GLTFLoader, './models/ocean.glb');
  const group = useRef();

  const handleClick = () => {
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Ocean() {
  const mesh = useRef();
  return (
    <group>
      <mesh ref={mesh}>
        <LoadOcean />
        <MeshWobbleMaterial />
      </mesh>
    </group>
  );
}

function LoadAbout() {
  const gltf = useLoader(GLTFLoader, './models/about.glb');
  const group = useRef();

  const handleClick = () => {
    window.open("https://jacob.dement.dev", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function About() {
  const mesh = useRef();
  return (
    <group>
      <mesh ref={mesh}>
        <LoadAbout />
      </mesh>
    </group>
  );
}

function LoadGit() {
  const gltf = useLoader(GLTFLoader, './models/git.glb');
  const group = useRef();

  const handleClick = () => {
    window.open("https://github.com/Oia20", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Git() {
  const mesh = useRef();
  return (
    <group>
      <mesh ref={mesh}>
        <LoadGit />
      </mesh>
    </group>
  );
}

function LoadLinked() {
  const gltf = useLoader(GLTFLoader, './models/linkedinn.glb');
  const group = useRef();

  const handleClick = () => {
    window.open("https://www.linkedin.com/in/jacob-dement-35658b275/", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Linked() {
  const mesh = useRef();
  return (
    <group>
      <mesh ref={mesh}>
        <LoadLinked />
      </mesh>
    </group>
  );
}

function LoadProjects() {
  const gltf = useLoader(GLTFLoader, './models/Projects.glb');
  const group = useRef();

  const handleClick = () => {
    window.open("https://jacob.dement.dev", "_blank");
  };

  return (
    <group ref={group} onClick={handleClick}>
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Projects() {
  const mesh = useRef();
  return (
    <group>
      <mesh ref={mesh}>
        <LoadProjects />
        <MeshWobbleMaterial />
      </mesh>
    </group>
  );
}

function Light() {
  const dirLight = useRef();

  return (
    <>
      <directionalLight color="blue" intensity={1} ref={dirLight} position={[10, 5, 10]} />
      <directionalLight color="whitesmoke" intensity={1} ref={dirLight} position={[10, 5, 10]} />
    </>
  );
}

export default function Wide() {
  return (
    <Canvas 
      style={{ 
        background: "linear-gradient(70deg, #201658, #1597E5, #201658)",
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0 
      }} 
      camera={{ fov: 90, position: [25, -8, 20] }}
    >
      <Suspense fallback={<Loader />}>
        <CameraController />
        <ambientLight intensity={0.9} />
        
        <Sparkles scale={14} size={5} position={[0, -8, 0]} count={40} />
        <Sparkles scale={14} size={5} position={[11, -8, 0]} count={40} />
        <Sparkles scale={14} size={5} position={[-11, -8, 0]} count={40} />
        <Sparkles scale={14} size={5} position={[0, -8, 11]} count={40} />
        <Sparkles scale={14} size={5} position={[0, -8, -11]} count={40} />
        <Sparkles scale={14} size={5} position={[11, -8, 11]} count={40} />
        <Sparkles scale={14} size={5} position={[-11, -8, 11]} count={40} />
        <Sparkles scale={14} size={5} position={[11, -8, -11]} count={40} />
        <Sparkles scale={14} size={5} position={[-11, -8, -11]} count={40} />

        <Light />
        <Float>
          <Ocean />
          <Float floatIntensity={0.5} floatingRange={0.5} rotationIntensity={0.3}>
            <About />
          </Float>
          <Float floatIntensity={0.5} floatingRange={0.5} rotationIntensity={0.4}>
            <Linked />
            <Projects />
            <Git />
          </Float>
          <Stars />

          <mesh position={[-2, -9, 16]} rotation={[0, 1, 0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Github
              <MeshDistortMaterial distort={0.3} speed={2} color="black" />
            </Text3D>
          </mesh>

          <mesh position={[-6, -3, 19]} rotation={[0, 1, 0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              LinkedIn
              <MeshDistortMaterial distort={0.2} speed={2} color="blue" />
            </Text3D>
          </mesh>

          <mesh position={[13, -13, -4]} rotation={[0, 0.8, 0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Projects
              <MeshDistortMaterial distort={0.2} speed={2} color="crimson" />
            </Text3D>
          </mesh>

          <mesh position={[-9, -6, -8]} rotation={[0, 0, 0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Hi! I'm Jacob Dement!
              <MeshDistortMaterial distort={0.1} speed={2} color="#ffff00" />
            </Text3D>
          </mesh>

          <mesh position={[-7, -8, -8]} rotation={[0, 0, 0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1}>
              ~ Software Engineer
              <MeshDistortMaterial distort={0.1} speed={2} color="#ffff00" />
            </Text3D>
          </mesh>
        </Float>
      </Suspense>
    </Canvas>
  );
}