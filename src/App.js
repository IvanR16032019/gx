import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import Ring from './Ring'; // Importar el nuevo componente de aro
//import Planet from './Planet';

function Planet({ texturePath, size, distance, speed, emissive, emissiveIntensity, hasRings, ringColor }) {
  const texture = useLoader(THREE.TextureLoader, texturePath);
  const planetRef = useRef();
//PLICAR TAMANO DE ACUERDO A COMO SON ENVERDAD, ESTE ES EL PROXIMO PASO
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
      {hasRings && <Ring size={size} color={ringColor} />}  // Incluir el componente de aro con el color especificado
    </group>
  );
}

function Moon() {
  const texture = useLoader(THREE.TextureLoader, '/moon.jpg');
  const moonRef = useRef();

  useFrame(() => {
    if (moonRef.current) {
      moonRef.current.rotation.y += 0.001;
      moonRef.current.position.x = 30 * Math.sin(Date.now() * 0.0005); // Posición de la Luna en el eje X
      moonRef.current.position.z = 30 * Math.cos(Date.now() * 0.0005); // Posición de la Luna en el eje Z
    }
  });

  return (
    <mesh ref={moonRef} scale={[3, 3, 3]}> {/* Ajusta la escala para hacer la Luna más grande */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}





function Sun() {
  const texture = useLoader(THREE.TextureLoader, '/sun.jpg');
  const sunRef = useRef();

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={sunRef} scale={[10, 10, 10]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        color={'#ffdb00'}
        emissive={'#FDB813'}
        emissiveIntensity={1.5}
        metalness={0}
        roughness={1}
        flatShading={false}
        transparent={true}
        opacity={1}
      />
    </mesh>
  );
}

function App() {
  const earthRef = useRef();

  return (
    <Canvas 
      style={{ height: '100vh', background: '#0d1b2a' }}
      camera={{ position: [0, 0, 100], fov: 50 }}
    >
      <ambientLight intensity={2.0} /> {/* Ajustar intensidad de la luz ambiental */}
      <directionalLight position={[5, 5, 5]} intensity={1.5} /> {/* Ajustar intensidad de la luz direccional */}
      <pointLight position={[-10, -10, -10]} intensity={1.2} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Sun />
      <Planet texturePath="/mercury.jpeg" size={2} distance={15} speed={0.0003} />
      <Planet texturePath="/venus.jpg" size={2} distance={20} speed={-0.00003} emissive={'#8B6A00'} emissiveIntensity={0.5} />
      <Planet texturePath="/earth.jpg" size={2.5} distance={25} speed={0.000729} />
      <Planet texturePath="/mars.jpeg" size={2} distance={30} speed={0.00035} emissive={'#E63900'} emissiveIntensity={0.5} />
      <Planet texturePath="/jupiter.jpeg" size={4} distance={45} speed={0.000025} emissive={'#3B2400'} emissiveIntensity={0.5} />
      <Planet texturePath="/saturnn1.png" size={3} distance={60} speed={0.000035} emissive={'#604D27'} emissiveIntensity={0.5} hasRings ringColor="beige" />
      <Planet texturePath="/uranus1.png" size={2} distance={80} speed={-0.00003} hasRings ringColor="blue" />
      <Planet 
        texturePath="/neptunee.png" 
        size={3} 
        distance={75} 
        speed={0.000023} 
        emissive={'#00008b'}  // Azul oscuro para Neptuno
        emissiveIntensity={0.5}  // Ajustar la intensidad para evitar la luz negra
      />
      <Moon earthRef={earthRef} /> {/* Aquí agregamos la luna */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}

export default App;
