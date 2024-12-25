'use client'

import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AppleModel() {
  const groupRef = useRef<THREE.Group>(null!)

  // Load the GLTF model (make sure to replace the path with the actual location of your model)
  const { scene } = useGLTF('/apple3d.glb')  // Change this path to where your GLTF model is located
  
  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Load and render the GLTF model */}
      <primitive object={scene} />
    </group>
  )
}

export default function Apple3D() {
  return (
    <div className="relative h-[50vh] md:h-[60vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-transparent" />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#ffffff']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={2048}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.2} />
        
        <AppleModel />
        <Environment preset="sunset" />
        
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}
