"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { useEffect, useState } from "react"

interface Particle {
  size: number
  top: number
  left: number
  speed: number
  direction: "up" | "down"
  opacity?: number
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
    angle: Math.random() * 45 - 22.5, // Random angle between -22.5 and 22.5 degrees
    duration: Math.random() * 1.5 + 0.8,
    delay: Math.random() * 5,
    length: Math.random() * 150 + 100,
  }))
}

const SpaceBackground = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const [particles, setParticles] = useState<Particle[]>(INITIAL_PARTICLES)
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([])

  useEffect(() => {
    // Generate additional random particles on client-side
    const additionalParticles = Array.from({ length: 15 }, () => ({
      size: Math.random() * 2 + 0.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      speed: Math.random() * 10 + 8,
      direction: Math.random() > 0.5 ? "up" : "down" as "up" | "down",
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setParticles([...INITIAL_PARTICLES, ...additionalParticles])

    // Initialize shooting stars
    setShootingStars(generateShootingStars(5))

    // Regenerate shooting stars periodically
    const interval = setInterval(() => {
      setShootingStars(generateShootingStars(5))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black overflow-hidden" style={{ zIndex: 0 }}>
      <motion.div style={{ opacity }} className="w-full h-full relative">
        {/* Enhanced Three.js Stars */}
        <Canvas camera={{ position: [0, 0, 1] }}>
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

        {/* Enhanced Floating Particles */}
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
    </div>
  )
}

export default SpaceBackground
