function Moon() {
    const texture = useLoader(THREE.TextureLoader, '/moon.jpg'); // Ruta local
    const moonRef = useRef();
  
    // Rotar la Luna sobre su eje
    useFrame(() => {
      if (moonRef.current) {
        moonRef.current.rotation.y += 0.002; // Rotación continua
        moonRef.current.position.x = 5 * Math.sin(Date.now() * 0.001); // Órbita alrededor de la Tierra
        moonRef.current.position.z = 5 * Math.cos(Date.now() * 0.001); // Órbita alrededor de la Tierra
      }
    });
  
    return (
      <mesh ref={moonRef} scale={[2, 2, 2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    );
  }
  
  function App() {
    return (
      <Canvas 
        style={{ height: '100vh', background: 'navy' }} // Fondo azul marino
        camera={{ position: [0, 0, 15], fov: 50 }}
      >
        <ambientLight intensity={2.0} /> {/* Aumentar la intensidad de la luz ambiental */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow={false} />
        <pointLight position={[-10, -10, -10]} intensity={1} castShadow={false} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        <Earth />
        <Moon />
        <OrbitControls enableZoom={false} />
      </Canvas>
    );
  }
  