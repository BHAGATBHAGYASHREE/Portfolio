"use client"

import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowDown, ArrowUp, FileText, Sparkles } from "lucide-react"
import ResumeModal from "./resume-modal"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })

  // Detect Scroll Direction via Motion useScroll & useMotionValueEvent
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down")

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = current - previous
    setScrollDirection(diff > 0 ? "down" : "up")
  })

  // Mapping scrollYProgress to CSS filter blur, scale, opacity, and translateY position values
  const titleFilter = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(12px)"])
  const subtitleFilter = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(8px)"])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.2])
  const subtitleScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1])
  const buttonsScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.05])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.15])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -50])

  const scrollToProjects = () => {
    const el = document.getElementById("projects")
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  // Floating space particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 20 + 10}s`,
    opacity: Math.random() * 0.5 + 0.1,
  }))

  return (
    <section className="w-full min-h-screen flex flex-col justify-between items-center pt-28 pb-0 px-4 relative overflow-hidden" id="home" ref={containerRef}>
      {/* Background Video with reduced height and smooth bottom gradient fade */}
      <div className="absolute inset-0 z-0 h-[85vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/halfmoon_web.mp4" type="video/mp4" />
          <source src="/halfmoon_web.webm" type="video/webm" />
        </video>
        {/* Dark Overlay gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      {/* Floating Particles Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white animate-pulse"
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
      </div>

      {/* Centered Main Hero Container with Motion Scroll Transform & Filter Blur */}
      <div className="max-w-4xl w-full flex-1 flex flex-col items-center justify-center relative z-10 text-center pt-48 sm:pt-56 pb-12">
        {/* Scroll Zoom Hero Container */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-gray-300 mb-8 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Available for Internships & Full-Time Roles</span>
          </div>
          {/* Main Headline Title (Strictly 1 line with Scroll useTransform Blur & Scale) */}
          <motion.h1
            style={{ scale: heroScale, filter: titleFilter }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight text-white mb-6 drop-shadow-2xl whitespace-nowrap origin-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi. I’m Bhagyashree.
          </motion.h1>

          {/* Subtitle Text (With Scroll useTransform Blur & Scale) */}
          <motion.p
            style={{ scale: subtitleScale, filter: subtitleFilter }}
            className="text-base sm:text-xl font-light text-gray-300 max-w-3xl leading-relaxed mb-8 px-2 origin-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I specialize in turning data and technology into intelligent, scalable solutions through Data Science, AI/ML, and full-stack development.
          </motion.p>

          {/* Action Buttons (Explore My Work & My Resume) */}
          <motion.div
            style={{ scale: buttonsScale }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8 origin-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded-full bg-white text-black text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-gray-200 transition-all shadow-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => setIsResumeOpen(true)}
              className="px-6 py-3 rounded-full bg-gray-900/80 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all shadow-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" />
              <span>My Resume</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Printable Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  )
}
