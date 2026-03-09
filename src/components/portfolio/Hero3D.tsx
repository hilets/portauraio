import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ---- Floating particles ---- */
const Particles = ({ color, count = 200 }: { color: string; count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

/* ---- Central glowing orb ---- */
const GlowOrb = ({ color }: { color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.15;
      ref.current.rotation.z = clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <Sphere ref={ref} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.35}
          speed={1.8}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
};

/* ---- Orbiting rings ---- */
const OrbitalRing = ({ color, radius, speed, tilt }: { color: string; radius: number; speed: number; tilt: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * speed;
    }
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

/* ---- Mouse-reactive camera ---- */
const CameraRig = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  // Update mouse on mount
  if (typeof window !== 'undefined') {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    // cleanup is handled by component unmount
  }

  return null;
};

/* ---- Main 3D scene ---- */
const Hero3DScene = ({ color }: { color: string }) => (
  <div className="absolute inset-0 z-0">
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color={color} />
        <pointLight position={[-5, -5, -3]} intensity={0.5} color={color} />
        <CameraRig />
        <GlowOrb color={color} />
        <OrbitalRing color={color} radius={2.8} speed={0.2} tilt={1.2} />
        <OrbitalRing color={color} radius={3.5} speed={-0.15} tilt={0.8} />
        <OrbitalRing color={color} radius={4.2} speed={0.1} tilt={1.6} />
        <Particles color={color} count={300} />
      </Suspense>
    </Canvas>
  </div>
);

export default Hero3DScene;
