import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

function Ring({ size, color }) {
  const ringTexture = useLoader(THREE.TextureLoader, '/ring.jpg');

  return (
    <mesh rotation={[1.5, 0, 0]}>
      <ringGeometry args={[size * 1.2, size * 1.6, 32]} />
      <meshBasicMaterial 
        map={ringTexture} 
        side={THREE.DoubleSide} 
        transparent={true} 
        color={color}  // Usar el color pasado como parámetro
      />
    </mesh>
  );
}

export default Ring;
