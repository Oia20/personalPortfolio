import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './world.jsx'
import UI from './ui.jsx'
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <h1>{progress} % loaded</h1>
    </Html>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <App />
  <UI />
  </>
)
