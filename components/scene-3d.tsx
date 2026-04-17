"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Stars, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

function FloatingParticles() {
  const count = 200
  const meshRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20
      
      const color = Math.random()
      if (color < 0.33) {
        colors[i3] = 0
        colors[i3 + 1] = 0.83
        colors[i3 + 2] = 1
      } else if (color < 0.66) {
        colors[i3] = 0.55
        colors[i3 + 1] = 0.36
        colors[i3 + 2] = 0.96
      } else {
        colors[i3] = 0.02
        colors[i3 + 1] = 1
        colors[i3 + 2] = 0.65
      }
    }
    
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function GlowingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.2
      ring1Ref.current.rotation.y = t * 0.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.3
      ring2Ref.current.rotation.y = -t * 0.15
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = Math.sin(t * 0.5) * 0.4
      ring3Ref.current.rotation.z = t * 0.1
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, 0, 0]}>
        <torusGeometry args={[4.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06ffa5" transparent opacity={0.4} />
      </mesh>
    </>
  )
}

function MouseFollower() {
  const { viewport } = useThree()
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      const x = (state.pointer.x * viewport.width) / 4
      const y = (state.pointer.y * viewport.height) / 4
      
      meshRef.current.position.x += (x - meshRef.current.position.x) * 0.05
      meshRef.current.position.y += (y - meshRef.current.position.y) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.5} />
    </mesh>
  )
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
      
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <AnimatedSphere />
      <GlowingRings />
      <FloatingParticles />
      <MouseFollower />
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
