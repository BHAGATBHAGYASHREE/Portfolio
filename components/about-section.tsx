"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Phone, Award, Trophy } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Generate space particles
  const generateParticles = (count: number) => {
    const particles = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1
      particles.push({
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    return particles
  }

  const particles = generateParticles(30)

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-32 px-4 relative overflow-hidden" id="home" ref={ref}>
      {/* Background Video */}
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-79 z-0"
      >
        <source src="/halfmoon_web.mp4" type="video/mp4" />
      </video>
      {/* Space background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: particle.top,
              left: particle.left,
              opacity: particle.opacity,
              animationDuration: particle.animationDuration,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* 3D floating elements */}
        <motion.div
          className="absolute top-[20%] right-[15%] w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
              B
            </span>
          </div>
        </motion.div>

        {/* Floating award */}
        <motion.div
          className="absolute bottom-[25%] left-[10%] w-14 h-14"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="w-full h-full relative">
            <div className="absolute inset-0 w-full h-full bg-gray-800 rounded-full"></div>
            <div className="absolute inset-2 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <motion.div
          className="flex items-center justify-center gap-2 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          {/* <span className="text-gray-300 font-medium text-sm">AVAILABLE FOR HIRE</span> */}
        </motion.div>

        <motion.div
          className="relative text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.h1
            className="text-6xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
           BHAGYASHREE BHAGAT
          </motion.h1>
          <motion.div
            className="absolute -bottom-2 left-1/2 h-1 bg-gradient-to-r from-gray-300 to-white rounded-full transform -translate-x-1/2"
            initial={{ width: 0 }}
            animate={isInView ? { width: "40%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl text-gray-400 mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          FRONTEND & UI/UX DESIGNER
        </motion.h2>

        <motion.div
          className="space-y-10 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2 text-md  bg-gray-900/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-800"
              whileHover={{ y: -5, borderColor: "rgba(229, 231, 235, 0.3)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-white flex items-center justify-center">
                <MapPin className="w-4 h-4 text-black" />
              </div>
              <span className="text-md">Navi Mumbai</span>
            </motion.div>

            {/* <motion.div
              className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-800"
              whileHover={{ y: -5, borderColor: "rgba(229, 231, 235, 0.3)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-white flex items-center justify-center">
                <Phone className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm">9167177647</span>
            </motion.div> */}

            {/* <motion.div
              className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-800"
              whileHover={{ y: -5, borderColor: "rgba(229, 231, 235, 0.3)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-white flex items-center justify-center">
                <Award className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm">Hackathon Runner Up</span>
            </motion.div> */}

            {/* <motion.div
              className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-800"
              whileHover={{ y: -5, borderColor: "rgba(229, 231, 235, 0.3)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-300 to-white flex items-center justify-center">
                <Trophy className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm">1st Place in Internal Shark Tank</span>
            </motion.div> */}
          </motion.div>

          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ borderColor: "rgba(229, 231, 235, 0.3)" }}
          >
            <motion.div
              className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-gray-300/10 to-white/10 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            ></motion.div>

            <h2 className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
              ABOUT ME 
            </h2>

            <p className="text-gray-300 relative z-10 text-center text-md leading-relaxed">
            I’m a frontend + UI/UX enthusiast who loves turning ideas into smooth, scroll-worthy designs. Whether it’s coding responsive layouts or experimenting with AI tools, I’m all about creating digital magic that actually works. Currently studying CSE at ITM Skills University and always up for a challenge (or a good coffee ☕) in the tech space!

</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div
              className="flex items-center gap-2 bg-gradient-to-r from-gray-300/10 to-white/10 backdrop-blur-sm border border-gray-700/20 px-4 py-3 rounded-xl"
              whileHover={{ scale: 1.05, borderColor: "rgba(229, 231, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">🌐</span>
              <span className="text-sm">Frontend Development</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 bg-gradient-to-r from-gray-300/10 to-white/10 backdrop-blur-sm border border-gray-700/20 px-4 py-3 rounded-xl"
              whileHover={{ scale: 1.05, borderColor: "rgba(229, 231, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">🎨</span>
              <span className="text-sm">UI/UX Design</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 bg-gradient-to-r from-gray-300/10 to-white/10 backdrop-blur-sm border border-gray-700/20 px-4 py-3 rounded-xl"
              whileHover={{ scale: 1.05, borderColor: "rgba(229, 231, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl">💻</span>
              <span className="text-sm">React.js Expert</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
