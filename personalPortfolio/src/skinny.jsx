import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame} from '@react-three/fiber';
import { Stars, Sparkles, useHelper, useProgress, MeshReflectorMaterial, MeshWobbleMaterial, Float, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DirectionalLight } from 'three';
import { Vector3 } from 'three';

function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <h1>{Math.ceil(progress)} % loaded</h1>
      </Html>
    );
  }
  
function CameraController() {
  const { camera } = useThree();
  const [targetIndex, setTargetIndex] = useState(0);
  const currentPosition = useRef(new Vector3(30, -8, 20));
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
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      lastScrollTime.current = now;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      const delta = event.deltaY || event.wheelDelta || -event.detail;
      const direction = Math.sign(delta);

      scrollTimeout.current = setTimeout(() => {
        setTargetIndex((prev) => {
          const next = prev + direction;
          return Math.max(0, Math.min(next, cameraPositions.length - 1));
        });
      }, 50);
    };

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

export default function Wide() {

  function LoadOcean() {
    const gltf = useLoader(GLTFLoader, './models/ocean.glb');
    const group = useRef();
  
    // Handle click event
    const handleClick = () => {
      console.log("Ocean Clicked")
    };
  
    return (
      <group ref={group} onClick={handleClick}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function Ocean(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    return (
        <mesh
          ref={mesh}
          // onPointerOver={() => setIsHovered(true)}
          // onPointerOut={() => setIsHovered(false)}
          // scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          <LoadOcean />
        </mesh>
    );
  }
    
   
  function LoadAbout() {
    const gltf = useLoader(GLTFLoader, './models/about.glb');
    const group = useRef();
  
    // Handle click event
    const handleClick = () => {
      console.log("About Clicked")
      window.open("https://jacob.dement.dev", "_blank")
    };
  
    return (
      <group ref={group} onClick={handleClick}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function About(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    return (
      <group>
        <mesh
          ref={mesh}
          // onPointerOver={() => setIsHovered(true)}
          // onPointerOut={() => setIsHovered(false)}
          // scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          <LoadAbout />
        </mesh>
      </group>
    );
  }  
  
  function LoadGit() {
    const gltf = useLoader(GLTFLoader, './models/git.glb');
    const group = useRef();
  
    // Handle click event
    const handleClick = () => {
      console.log("Git Clicked")
      window.open("https://github.com/Oia20", "_blank")
    };
  
    return (
      <group ref={group} onClick={handleClick}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function Git(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    return (
      <group>
        <mesh
          ref={mesh}
          // onPointerOver={() => setIsHovered(true)}
          // onPointerOut={() => setIsHovered(false)}
          // scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          <LoadGit />
        </mesh>
      </group>
    );
  }  
  
  function LoadLinked() {
    const gltf = useLoader(GLTFLoader, './models/linkedinn.glb');
    const group = useRef();
  
    // Handle click event
    const handleClick = () => {
      console.log("Ocean Clicked")
      window.open("https://www.linkedin.com/in/jacob-dement-35658b275/", "_blank")
    };
  
    return (
      <group ref={group} onClick={handleClick}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function Linked(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    return (
      <group>
        <mesh
          ref={mesh}
          // onPointerOver={() => setIsHovered(true)}
          // onPointerOut={() => setIsHovered(false)}
          // scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          <LoadLinked />
        </mesh>
      </group>
    );
  }  
  
 


  function LoadProjects() {
    const gltf = useLoader(GLTFLoader, './models/Projects.glb');
    const group = useRef();
  
    // Handle click event
    const handleClick = () => {
      window.open("https://jacob.dement.dev")
    };
  
    return (
      <group ref={group} onClick={handleClick}>
        {gltf.scene && <primitive object={gltf.scene} />}
      </group>
    );
  }
  
  function Projects(props) {
    // Create a ref to manipulate the mesh
    const mesh = useRef();
    return (
      <group>
        <mesh
          ref={mesh}
          // onPointerOver={() => setIsHovered(true)}
          // onPointerOut={() => setIsHovered(false)}
          // scale={isHovered ? [1.2, 1.2, 1.2] : [1, 1, 1]}
        >
          <LoadProjects />
          <MeshWobbleMaterial />
        </mesh>
      </group>
    );
  }
  const Light = () => {
    const dirLight = useRef<DirectionalLight>(!null);
  
    return (
      <>
        <directionalLight color={"blue"} intensity={1} useRef={dirLight} position={[10, 5,10]}/>
        <directionalLight color={"whitesmoke"} intensity={1} useRef={dirLight} position={[10, 5,10]}/>
      </>
    );
  };
  
    return (
      // onClick={() => setFirst(false)
      <Canvas style={{ background: "linear-gradient(70deg, #201658, #1597E5, #201658)" ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 125, position: [30, -8,20] }}>
        <Suspense fallback={Loader}>
          <CameraController />
          <ambientLight intensity={.9}/>
          <Sparkles scale={14} size={5} position={[0,-8,0]} count={20}/>
          <Sparkles scale={14} size={5} position={[11,-8,0]} count={20}/>
          <Sparkles scale={14} size={5} position={[-11,-8,0]} count={20}/>
          <Sparkles scale={14} size={5} position={[0,-8,11]} count={20}/>
          <Sparkles scale={14} size={5} position={[0,-8,-11]} count={20}/>
          <Sparkles scale={14} size={5} position={[11,-8,11]} count={20}/>
          <Sparkles scale={14} size={5} position={[-11,-8,11]} count={20}/>
          <Sparkles scale={14} size={5} position={[11,-8,-11]} count={20}/>
          <Sparkles scale={14} size={5} position={[-11,-8,-11]} count={20}/>

          <Light />
          <Float>
          <Ocean />
          <Float floatIntensity={.5} floatingRange={.5} rotationIntensity={.3}>
          <About />
          </Float>
          <Float floatIntensity={.5} floatingRange={.5} rotationIntensity={.4}>
          <Linked />
          <Projects />
          <Git />
          </Float>
          <Stars count={750}/>
          <mesh position={[-2,-9,16]} rotation={[0,1,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Github
            <MeshDistortMaterial distort={.3} speed={2} color="black"/>
            </Text3D>
          </mesh>

          <mesh position={[-6,-3,19]} rotation={[0,1,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              LinkedIn
            <MeshDistortMaterial distort={.2} speed={2} color="blue"/>
            </Text3D>
          </mesh>          
          
          <mesh position={[13,-13,-4]} rotation={[0,.8,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Projects
            <MeshDistortMaterial distort={.2} speed={2} color="crimson"/>
            </Text3D>
          </mesh>
          <mesh position={[-9,-6,-8]} rotation={[0,0,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Hi! I'm Jacob Dement!
            <MeshDistortMaterial distort={.1} speed={2} color="#ffff00"/>
            </Text3D>
          </mesh>
          <mesh position={[-7,-8,-8]} rotation={[0,0,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1}>
              ~ Software Engineer
            <MeshDistortMaterial distort={.1} speed={2} color="#ffff00"/>
            </Text3D>
          </mesh>
          </Float >
          </Suspense>
      </Canvas>
  );
}
