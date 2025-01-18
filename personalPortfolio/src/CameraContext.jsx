import React, { createContext, useState } from 'react';
import { Vector3 } from 'three';

export const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const cameraPositions = [
    { position: new Vector3(0, -3, 4), target: new Vector3(0, -5, -1) },
    { position: new Vector3(23, -8, -2), target: new Vector3(0, -10, -15) },
    { position: new Vector3(7, -8, 26), target: new Vector3(4, -8, 22) },
    { position: new Vector3(25, -2, 35), target: new Vector3(0, -5, 0) },
  ];

  const setCameraPosition = (index) => {
    setTargetIndex(index);
    setHasScrolled(true);
  };


  return (
    <CameraContext.Provider value={{ 
      targetIndex, 
      setTargetIndex, 
      cameraPositions,
      hasScrolled,
      setHasScrolled,
      setCameraPosition
    }}>
      {children}
    </CameraContext.Provider>
  );
}; 