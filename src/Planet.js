// Planet.js

import React, { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Ring from './Ring';

function Planet({ texturePath, size, distance, speed, emissive, emissiveIntensity, hasRings, ringColor }) {
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const planetRef = useRef();

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
      planetRef.current.position.x = distance * Math.sin(Date.now() * speed);
      planetRef.current.position.z = distance * Math.cos(Date.now() * speed);
    }
  });

  return (
    <group ref={planetRef}>
      <mesh scale={[size, size, size]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          map={texture} 
          color={'#ffffff'} 
          metalness={0.1} 
          roughness={0.7} 
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {hasRings && <Ring size={size} color={ringColor} />}
    </group>
  );
}

export default Planet;
