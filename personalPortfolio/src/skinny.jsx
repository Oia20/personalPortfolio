import React, { Suspense, useRef, useState, useEffect, useContext } from 'react';
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
import { CameraContext, CameraProvider } from './CameraContext';

const Loader = () => {
  
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="loader-container">
        <div className="wave-container">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="particle"
              style={{
                animationDelay: `${index * 0.1}s`,
                left: `${index * 8}px`
              }}
            />
          ))}
          {[...Array(12)].map((_, index) => (
            <div
              key={`foam-${index}`}
              className="foam-particle"
              style={{
                animationDelay: `${index * 0.1}s`,
                left: `${index * 8}px`
              }}
            />
          ))}
        <span className="progress-text">{Math.ceil(progress)}% loaded</span>

        </div>
      </div>

      <style jsx>{`
        .loader-container {
          display: flex;
          align-items: center;
          color: white;
          font-size: 2em;
        }

        .wave-container {
          position: relative;
          width: 100px;
          height: 60px;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: #4a90e2;
          border-radius: 50%;
          animation: wave 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }

        .foam-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background-color: white;
          border-radius: 50%;
          animation: foam 2s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
          opacity: 0;
        }

        .progress-text {
          color: #4affff;

        }

        @keyframes wave {
          0% {
            transform: translate(0, 0) scale(1);
            background-color: #4affff;
          }
          25% {
            transform: translate(10px, -20px) scale(1.2);
            background-color: black;
          }
          50% {
            transform: translate(20px, -5px) scale(1.1);
            background-color: grey;
          }
          75% {
            transform: translate(30px, -25px) scale(0.9);
            background-color: red;
          }
          85% {
            transform: translate(35px, 0) scale(0.8);
            background-color: orange;
          }
          100% {
            transform: translate(40px, 0) scale(0.7);
            opacity: 0;
            background-color: #102e4a;
          }
        }

        @keyframes foam {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translate(20px, -15px) scale(1.5);
            opacity: 0.7;
          }
          100% {
            transform: translate(40px, 0) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </Html>
  );
};

function CameraController() {
  const { camera } = useThree();
  const { targetIndex, setTargetIndex, cameraPositions, setHasScrolled } = useContext(CameraContext);
  const currentPosition = useRef(new Vector3(30, -8, 20));
  const currentLookAt = useRef(new Vector3(0, -10, 0));
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  const lastTouchY = useRef(0);

  useEffect(() => {
    const handleScroll = (event) => {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }

      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      lastScrollTime.current = now;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      setHasScrolled(true);
      
      const delta = event.deltaY || event.wheelDelta || -event.detail || (event.touches ? lastTouchY.current - event.touches[0].clientY : 0);
      const direction = Math.sign(delta);

      scrollTimeout.current = setTimeout(() => {
        setTargetIndex((prev) => {
          const next = prev + direction;
          return Math.max(0, Math.min(next, cameraPositions.length - 1));
        });
      }, 50);
    };

    // Add touch event listener for mobile
    const handleTouchStart = (event) => {
      lastTouchY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault(); // Prevent default scrolling behavior
      if (event.touches) {
        const delta = lastTouchY.current - event.touches[0].clientY;
        handleScroll({ deltaY: delta }); // Pass a custom object for delta
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('mousewheel', handleScroll, { passive: false });
    window.addEventListener('DOMMouseScroll', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousewheel', handleScroll);
      window.removeEventListener('DOMMouseScroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [setTargetIndex, setHasScrolled]);

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

export default function Skin() {
  return (
    <CameraProvider>
      <SkinContent />
    </CameraProvider>
  );
}

function SkinContent() {
  const { hasScrolled, setCameraPosition, targetIndex } = useContext(CameraContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress]);

  const sections = [
    { name: "Welcome" },
    { name: "Projects" },
    { name: "Socials" },
    { name: "Overview" }
  ];

  return (
    <>
      <Canvas style={{ background: "linear-gradient(70deg, #201658, #1597E5, #201658)" ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, maxHeight:"100vh"}} camera={{ fov: 125, position: [30, -8,20] }}>
        <Suspense fallback={<Loader />}>
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

      {isLoaded && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '8px 15px',
          borderRadius: '15px',
          width: 'auto',
          maxWidth: '90%'
        }}>
          {sections.map((section, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                opacity: targetIndex === index ? 1 : 0.5,
                transition: 'opacity 0.3s ease'
              }}
              onClick={() => setCameraPosition(index)}
            >
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: index <= targetIndex ? '#4affff' : 'white',
                marginRight: '4px',
                transition: 'background-color 0.3s ease'
              }} />
              <span style={{
                color: 'white',
                fontSize: '11px',
                fontWeight: targetIndex === index ? 'bold' : 'normal'
              }}>
                {section.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {isLoaded && !hasScrolled && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}>
          <span style={{
            color: 'rgba(74, 255, 255, 0.8)',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            animation: 'fadeInOut 2s infinite'
          }}>
            Scroll to navigate
          </span>
        </div>
      )}
    </>
  );
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
  function Light() {
    const dirLight = useRef();
  
    return (
      <>
        <directionalLight color="blue" intensity={1} ref={dirLight} position={[10, 5, 10]} />
        <directionalLight color="whitesmoke" intensity={1} ref={dirLight} position={[10, 5, 10]} />
      </>
    );
  }
