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
import { useSpring, animated } from '@react-spring/three';
import './swipe.css'
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
  const currentPosition = useRef(new Vector3(25, -8, 20));
  const currentLookAt = useRef(new Vector3(0, -10, 0));
  const scrollTimeout = useRef(null);
  const lastScrollTime = useRef(Date.now());
  
  // Add new refs for panning
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const panOffset = useRef(new Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseDown = (event) => {
      isDragging.current = true;
      previousMousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event) => {
      if (!isDragging.current) return;

      const deltaX = (event.clientX - previousMousePosition.current.x) * 0.01;
      const deltaY = (event.clientY - previousMousePosition.current.y) * 0.01;

      panOffset.current.x += deltaX;
      panOffset.current.y -= deltaY;

      // Limit the pan range
      panOffset.current.x = Math.max(-2, Math.min(2, panOffset.current.x));
      panOffset.current.y = Math.max(-2, Math.min(2, panOffset.current.y));

      previousMousePosition.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      // Gradually reset pan offset
      const resetPan = () => {
        panOffset.current.lerp(new Vector3(0, 0, 0), 0.1);
        if (panOffset.current.length() > 0.01) {
          requestAnimationFrame(resetPan);
        }
      };
      resetPan();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      // Ensure we don't process events too quickly
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;
      lastScrollTime.current = now;

      // Clear any existing timeout
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // Set hasScrolled to true on first scroll
      setHasScrolled(true);

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
  }, [setTargetIndex, setHasScrolled]);

  useFrame(() => {
    const lerpFactor = 0.03;
    const targetPosition = cameraPositions[targetIndex].position;
    const targetLookAt = cameraPositions[targetIndex].target;
    
    currentPosition.current.lerp(targetPosition, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    
    // Apply pan offset to camera position
    camera.position.copy(currentPosition.current).add(new Vector3(
      panOffset.current.x,
      panOffset.current.y,
      0
    ));
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
    // window.open("https://jacob.dement.dev", "_blank");
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

  return (
    <group 
      ref={group} 
      onClick={() => window.open("https://github.com/Oia20", "_blank")}
      style={{ cursor: 'pointer' }}
    >
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Git() {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group>
      <mesh 
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        <LoadGit />
        <Sparkles noise={.1} count={30} size={8} scale={4} position={[1, -12, 15]}/>
      </mesh>
    </group>
  );
}

function LoadLinked() {
  const gltf = useLoader(GLTFLoader, './models/linkedinn.glb');
  const group = useRef();

  return (
    <group 
      ref={group} 
      onClick={() => window.open("https://www.linkedin.com/in/jacob-dement-35658b275/", "_blank")}
      style={{ cursor: 'pointer' }}
    >
      {gltf.scene && <primitive object={gltf.scene} />}
    </group>
  );
}

function Linked() {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group>
      <mesh         
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}>
        <LoadLinked />
        <Sparkles noise={.1} count={30} size={8} scale={4} position={[-4, -5.5, 16]}/>
      </mesh>
    </group>
  );
}

function LoadProjects() {
  const gltf = useLoader(GLTFLoader, './models/Projects.glb');
  const group = useRef();

  return (
    <animated.group
      ref={group}
      onClick={() => window.open("https://jacob.dement.dev", "_blank")}
      style={{ cursor: 'pointer' }}
    >
      {gltf.scene && <primitive object={gltf.scene} />}
    </animated.group>
  );
}

function Projects() {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <LoadProjects />
      </mesh>
      <Sparkles noise={.1} count={30} size={8} scale={4} position={[14, -7.9, -7.5]}/>
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

function Wide() {
  return (
    <CameraProvider>
      <WideContent />
    </CameraProvider>
  );
}

function WideContent() {
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
    { name: "About & Projects" },
    { name: "Socials" },
    { name: "Overview" }
  ];

  return (
    <>
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

            <mesh position={[9, -13, -2]} rotation={[0, 0.8, 0]}>
              <Text3D font={"Oblygasi_Regular.json"} size={1.5}>
                Projects & About
                <MeshDistortMaterial distort={0.1} speed={2} color="crimson" />
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

      {isLoaded && (
        <div style={{
          position: 'fixed',
          left: '40px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '30px',
          zIndex: 1000
        }}>
          <div style={{
            position: 'absolute',
            left: '5px',
            top: '0',
            width: '2px',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            zIndex: -1
          }} />
          
          <div style={{
            position: 'absolute',
            left: '5px',
            top: '0',
            width: '2px',
            height: `${(targetIndex / (sections.length - 1)) * 100}%`,
            backgroundColor: '#4affff',
            zIndex: -1,
            transition: 'height 0.3s ease'
          }} />

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
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index <= targetIndex ? '#4affff' : 'white',
                marginRight: '10px',
                transition: 'background-color 0.3s ease'
              }} />
              <span style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: targetIndex === index ? 'bold' : 'normal'
              }}>
                {section.name}
              </span>
            </div>
          ))}
        </div>
      )}

      {isLoaded && !hasScrolled && (
        <>
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,   
            cursor: 'pointer',
            width: '300px',
            height: '100px'
          }}
          onClick={() => setCameraPosition(1)}
          className='hi'>
            <svg 
              className="scroll-indicator" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 40 80"
              style={{
                width: '40px',
                height: '80px',
                display: 'block'
              }}
            >
              <rect x="0" y="0" width="40" height="80" rx="20" ry="20" fill="rgba(32, 22, 88, 0.4)"/>

              <path d="M8 35 L20 47 L32 35" 
                    fill="none" 
                    stroke="rgba(74, 255, 255, 0.8)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeLinejoin="round">
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="1.5s"
                  repeatCount="indefinite"/>
              </path>
              <path d="M8 25 L20 37 L32 25" 
                    fill="none" 
                    stroke="rgba(74, 255, 255, 0.8)" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeLinejoin="round">
                <animate
                  attributeName="opacity"
                  values="1;0.4;1"
                  dur="1.5s"
                  repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
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
        </>
      )}
    </>
  );
}

export default Wide;