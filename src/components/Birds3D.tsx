import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shared scroll progress ref — updated outside Canvas via window scroll
const scrollProgress = { value: 0 };

interface BirdProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
  direction: number;
}

const Bird: React.FC<BirdProps> = ({ position, scale, speed, phase, direction }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const leftWingRef = useRef<THREE.Mesh>(null!);
  const rightWingRef = useRef<THREE.Mesh>(null!);

  // Wing shape: a custom triangle-like BufferGeometry
  const wingGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Wing tip, body center, tail
    const vertices = new Float32Array([
      0, 0, 0,       // body center
      -2.5, 0.4, -0.3, // outer tip
      -1.2, 0, 0.1,  // mid
      0, 0, 0,
      -1.2, 0, 0.1,
      -0.5, -0.1, 0.2,
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  const bodyGeometry = useMemo(() => {
    return new THREE.ConeGeometry(0.08, 0.6, 6);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const scrollOffset = scrollProgress.value;

    // Wing flapping
    const flapSpeed = speed * 3;
    const flapAmount = 0.6 + scrollOffset * 0.4;
    const flap = Math.sin(t * flapSpeed + phase) * flapAmount;

    if (leftWingRef.current) leftWingRef.current.rotation.z = flap;
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap;

    // Bird flight path - fly across screen
    const flySpeed = speed * 0.4;
    const range = 28;
    const xBase = position[0];
    const xOffset = ((t * flySpeed * direction + phase * 5) % range) - range / 2;
    groupRef.current.position.x = xBase + xOffset;

    // Gentle vertical float
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.3;

    // Scroll: birds fly upward as user scrolls down
    groupRef.current.position.z = position[2] - scrollOffset * 6;
    groupRef.current.position.y += scrollOffset * (position[1] * 1.5 + 3);

    // Face direction of travel
    groupRef.current.rotation.y = direction > 0 ? Math.PI : 0;
    groupRef.current.rotation.z = Math.sin(t * flapSpeed + phase) * 0.05;
  });

  const wingMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00d2ff'),
    emissive: new THREE.Color('#003a4d'),
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    metalness: 0.3,
    roughness: 0.4,
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9d50bb'),
    emissive: new THREE.Color('#2d0040'),
    emissiveIntensity: 0.4,
    metalness: 0.5,
    roughness: 0.3,
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body */}
      <mesh geometry={bodyGeometry} material={bodyMaterial} rotation={[0, 0, Math.PI / 2]} />

      {/* Left Wing */}
      <mesh ref={leftWingRef} geometry={wingGeometry} material={wingMaterial} />

      {/* Right Wing (mirrored) */}
      <mesh
        ref={rightWingRef}
        geometry={wingGeometry}
        material={wingMaterial}
        scale={[1, -1, 1]}
      />
    </group>
  );
};

const BirdsScene: React.FC = () => {
  const birds = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 8 + 2,
        -3 - Math.random() * 8,
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      speed: 0.6 + Math.random() * 1.0,
      phase: Math.random() * Math.PI * 2,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#00d2ff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#9d50bb" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />

      {birds.map((bird) => (
        <Bird key={bird.id} {...bird} />
      ))}
    </>
  );
};

const Birds3D: React.FC = () => {
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
      >
        <BirdsScene />
      </Canvas>
    </div>
  );
};

export default Birds3D;
