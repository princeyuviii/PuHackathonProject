'use client'

import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AppleModel() {
  const groupRef = useRef<THREE.Group>(null!)

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.2}>
      {/* Apple body */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.2}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#ff3b30"
          transmissionSampler
        />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.03, 0.4, 8]} />
        <meshStandardMaterial
          color="#2c1810"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Leaf */}
      <mesh position={[0.1, 1.2, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <coneGeometry args={[0.2, 0.4, 32]} />
        <meshStandardMaterial
          color="#2d5a27"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
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

