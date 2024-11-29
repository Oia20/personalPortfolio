import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useLoader, useThree, useFrame} from '@react-three/fiber';
import { Stars, useProgress, useHelper, Sparkles, MeshReflectorMaterial, MeshWobbleMaterial, Float, Trail, Text3D, Center, OrbitControls, MeshDistortMaterial, Wireframe, Image } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DirectionalLight, LightProbe, DirectionalLightHelper, AmbientLight } from 'three';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <h1>{Math.ceil(progress)} % loaded</h1>
    </Html>
  );
}
  
export default function Wide() {
  const [zoomed, setZoomed] = useState(false)

  function Scroll() {
    setZoomed(true)
  }


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
  
  function Zoom() {
    if (!zoomed) {
    return (
      <mesh position={[15,-12, 16]} rotation={[0,1.5,0]}>
      <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
        Try zooming in!
      <MeshDistortMaterial distort={.1} speed={2} color="hotpink"/>
      </Text3D>
    </mesh>
    )
  }
  }

  function Ocean(props) {
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
          <LoadOcean />
          <MeshWobbleMaterial />
        </mesh>
      </group>
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
        {/* <ambientLight /> */}
      </>
    );
  };
  
    return (
      // onClick={() => setFirst(false)
      <Canvas style={{ background: "linear-gradient(70deg, #201658, #1597E5, #201658)" ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} camera={{ fov: 90, position: [25, -8,20] }} onWheel={Scroll}>
        <Suspense fallback={Loader}>
          <OrbitControls target={[0,-10,0]} maxDistance={50} minDistance={1} enablePan={false} maxPolarAngle={1.8} enableDamping enableRotate enableZoom />
          {/* <directionalLight color={"#005F00"} intensity={1} ref={dirLight} /> */}
          <ambientLight intensity={.9}/>
          <Sparkles scale={14} size={5} position={[0,-8,0]} count={40}/>
          <Sparkles scale={14} size={5} position={[11,-8,0]} count={40}/>
          <Sparkles scale={14} size={5} position={[-11,-8,0]} count={40}/>
          <Sparkles scale={14} size={5} position={[0,-8,11]} count={40}/>
          <Sparkles scale={14} size={5} position={[0,-8,-11]} count={40}/>
          <Sparkles scale={14} size={5} position={[11,-8,11]} count={40}/>
          <Sparkles scale={14} size={5} position={[-11,-8,11]} count={40}/>
          <Sparkles scale={14} size={5} position={[11,-8,-11]} count={40}/>
          <Sparkles scale={14} size={5} position={[-11,-8,-11]} count={40}/>



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
          <Stars />
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
              ~ Software Developer
            <MeshDistortMaterial distort={.1} speed={2} color="#ffff00"/>
            </Text3D>
          </mesh>

          <mesh position={[-15,-6, 16]} rotation={[0,1.5,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              Click me or the boat
            <MeshDistortMaterial distort={.1} speed={2} color="crimson"/>
            </Text3D>
          </mesh>

          <mesh position={[-15,-8, 16]} rotation={[0,1.5,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              To travel to
            <MeshDistortMaterial distort={.1} speed={2} color="crimson"/>
            </Text3D>
          </mesh>

          <mesh position={[-15,-10, 16]} rotation={[0,1.5,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
              my about page.
            <MeshDistortMaterial distort={.1} speed={2} color="crimson"/>
            </Text3D>
          </mesh>

          <mesh position={[-10,8,0]} rotation={[0,0,0]}>
            <Text3D font={"Oblygasi_Regular.json"} size={1}>
              Click boat to travel to my room!
            <MeshDistortMaterial distort={.1} speed={2} color="whitesmoke"/>
            </Text3D>
          </mesh>
          <Zoom />
          </Float >
          </Suspense>
      </Canvas>
  );
}
