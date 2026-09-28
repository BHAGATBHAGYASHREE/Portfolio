"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  size: number
  top: number
  left: number
  speed: number
  direction: "up" | "down"
  opacity?: number
}

interface SnowflakeParticle {
  id: number
  size: number
  left: number
  duration: number
  delay: number
  sway: number
  opacity: number
  isCrystal: boolean
}

interface ShootingStar {
  startX: number
  startY: number
  angle: number
  duration: number
  delay: number
  length: number
}

// Initial static particles for SSR
const INITIAL_PARTICLES: Particle[] = [
  { size: 2.7568, top: 2.50812, left: 12.7532, speed: 10, direction: "up", opacity: 0.4 },
  { size: 1.25506, top: 45.2507, left: 55.6385, speed: 15, direction: "down", opacity: 0.3 },
  { size: 1.43276, top: 58.4505, left: 75.9284, speed: 12, direction: "up", opacity: 0.5 },
  { size: 2.1234, top: 15.7892, left: 35.4321, speed: 18, direction: "down", opacity: 0.35 },
  { size: 1.8765, top: 72.3456, left: 88.7654, speed: 14, direction: "up", opacity: 0.45 }
]

const generateShootingStars = (count: number): ShootingStar[] => {
  return Array.from({ length: count }, () => ({
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    angle: Math.random() * 45 - 22.5,
    duration: Math.random() * 1.5 + 0.8,
    delay: Math.random() * 5,
    length: Math.random() * 150 + 100,
  }))
}

import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function RotatingWireframeMesh() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -6]}>
      <icosahedronGeometry args={[4.5, 2]} />
      <meshBasicMaterial wireframe color="#ffffff" transparent opacity={0.16} />
    </mesh>
  )
}

const SpaceBackground = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const [particles, setParticles] = useState<Particle[]>(INITIAL_PARTICLES)
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])
  const [snowflakes, setSnowflakes] = useState<SnowflakeParticle[]>([])
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Generate additional random particles for dark mode
    const additionalParticles = Array.from({ length: 15 }, () => ({
      size: Math.random() * 2 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      speed: Math.random() * 10 + 8,
      direction: Math.random() > 0.5 ? "up" : "down" as "up" | "down",
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setParticles([...INITIAL_PARTICLES, ...additionalParticles])

    // Generate snowfall particles for light mode
    const generatedSnowflakes: SnowflakeParticle[] = Array.from({ length: 65 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: Math.random() * 100,
      duration: Math.random() * 9 + 8,
      delay: Math.random() * 8,
      sway: Math.random() * 25 + 10,
      opacity: Math.random() * 0.55 + 0.35,
      isCrystal: i % 3 === 0,
    }))
    setSnowflakes(generatedSnowflakes)

    // Initialize shooting stars
    setShootingStars(generateShootingStars(5))

    const interval = setInterval(() => {
      setShootingStars(generateShootingStars(5))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const isLight = mounted && (theme === "light" || resolvedTheme === "light")

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none transition-colors duration-700 ${
        isLight
          ? "bg-gradient-to-b from-[#e8f2fc] via-[#f1f6fa] to-[#e4eef7]"
          : "bg-black"
      }`}
      style={{ zIndex: 0 }}
    >
      {/* ===================================================================== */}
      {/* 1. LIGHT MODE: REALISTIC ALPINE SNOWFALL LAYER                        */}
      {/* ===================================================================== */}
      {isLight ? (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Alpine Mountain Mist Gradients */}
          <div className="absolute -top-32 left-1/4 w-[700px] h-[400px] bg-sky-200/40 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 -left-20 w-[600px] h-[500px] bg-blue-100/35 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[450px] bg-slate-200/50 rounded-full blur-[160px]" />

          {/* Falling Snowflakes */}
          {snowflakes.map((flake) => (
            <motion.div
              key={`snowfall-${flake.id}`}
              className="absolute pointer-events-none select-none"
              style={{
                left: `${flake.left}%`,
                top: "-5%",
              }}
              animate={{
                y: ["0vh", "110vh"],
                x: [0, (flake.id % 2 === 0 ? 1 : -1) * flake.sway, 0],
                rotate: flake.isCrystal ? [0, 360] : 0,
              }}
              transition={{
                y: {
                  duration: flake.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: flake.delay,
                },
                x: {
                  duration: flake.duration * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: flake.duration * 0.8,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {flake.isCrystal ? (
                /* Authentic Crystal Snowflake matching cursor */
                <div
                  style={{
                    width: `${flake.size + 10}px`,
                    height: `${flake.size + 10}px`,
                    opacity: flake.opacity,
                  }}
                  className="pointer-events-none select-none"
                >
                  <img
                    src="/snowflake-cursor.png"
                    alt="Crystal Snowflake"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]"
                  />
                </div>
              ) : (
                /* Soft Fluffy Snowball */
                <div
                  className="rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] border border-sky-200/50"
                  style={{
                    width: `${flake.size}px`,
                    height: `${flake.size}px`,
                    opacity: flake.opacity,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        /* ===================================================================== */
        /* 2. DARK MODE: 3D THREE.JS STARS & COSMIC NEBULA                       */
        /* ===================================================================== */
        <motion.div style={{ opacity }} className="w-full h-full relative">
          {/* Enhanced Three.js Stars & 3D Rotating Mesh */}
          <Canvas camera={{ position: [0, 0, 1] }}>
            <RotatingWireframeMesh />
            <Stars
              radius={300}
              depth={60}
              count={10000}
              factor={6}
              saturation={0}
              fade
              speed={2}
            />
          </Canvas>

          {/* Shooting Stars */}
          {shootingStars.map((star, index) => (
            <motion.div
              key={`shooting-star-${index}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                top: `${star.startY}%`,
                left: `${star.startX}%`,
                width: `${star.length}px`,
                transform: `rotate(${star.angle}deg)`,
                transformOrigin: "left center",
              }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, star.length * 2],
                scale: [1, 1, 0],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Floating Stardust Particles */}
          {particles.map((particle, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute rounded-full"
              style={{
                width: particle.size,
                height: particle.size,
                top: `${particle.top}%`,
                left: `${particle.left}%`,
                background: `rgba(255, 255, 255, ${particle.opacity || 0.8})`,
                boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity || 0.3})`,
              }}
              animate={{
                y: particle.direction === "up" ? ["-100%", "100%"] : ["100%", "-100%"],
                scale: [1, 1.2, 1],
                opacity: [particle.opacity || 0.8, (particle.opacity || 0.8) * 1.5, particle.opacity || 0.8],
              }}
              transition={{
                y: {
                  duration: particle.speed,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: particle.speed / 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                opacity: {
                  duration: particle.speed / 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}

          {/* Nebula Effect */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(128, 128, 128, 0.1) 0%, rgba(32, 32, 32, 0.1) 50%, transparent 100%)",
              filter: "blur(40px)",
              transform: "scale(1.2)",
            }}
          />
        </motion.div>
      )}
    </div>
  )
}

export default SpaceBackground
