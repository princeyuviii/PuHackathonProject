'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Center } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function AppleModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const gltf = useLoader(GLTFLoader, '/apple.glb', (loader) => {
    console.log('Loading model...');
  });

  console.log('GLTF:', gltf); // Log for debugging

  // Animation: Rotate model
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Center>
      <group
        ref={groupRef}
        position={[0.5, -1, 0]} // Adjust position
        rotation={[Math.PI / 8, 0, 0]} // Slight tilt
        scale={[0.2, 0.2, 0.2]} // Adjust scale for visibility
      >
        <primitive
          object={gltf.scene}
          receiveShadow
          castShadow
        />
      </group>
    </Center>
  );
}

function LoadingSpinner() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff3b30" wireframe />
    </mesh>
  );
}

export default function Apple3D() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-transparent" />

      <Canvas
        shadows
        camera={{
          position: [0, 0, 10],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#ffffff']} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={2048}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.2} />

        {/* Model */}
        <Suspense fallback={<LoadingSpinner />}>
          <AppleModel />
        </Suspense>

        {/* Environment and Controls */}
        <Environment preset="sunset" />
        <OrbitControls
          enableZoom
          minDistance={5}
          maxDistance={20}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Debugging Info */}
      <div className="fixed bottom-4 left-4 text-xs text-gray-500 opacity-50 pointer-events-none">
        Model: /apple.glb | Scale: 0.5 | Camera Z: 10
      </div>
    </div>
  );
}
