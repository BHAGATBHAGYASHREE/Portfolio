"use client"

import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { ArrowDown, ArrowUp, FileText, Sparkles, Snowflake } from "lucide-react"
import ResumeModal from "./resume-modal"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && (theme === "light" || resolvedTheme === "light")

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
    <section className="w-full min-h-screen flex flex-col justify-between items-center pt-20 sm:pt-24 pb-0 px-4 relative overflow-hidden" id="home" ref={containerRef}>
      {/* Background Video (Adaptive: Snowy Mountain Peaks in Light Mode, Moon in Dark Mode) */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        {isLight ? (
          <video
            key="light-snow-video"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-700"
          >
            <source
              src="/mixkit-rocky-snowy-peaks-in-andes-mountains-9677-hd-ready.mp4"
              type="video/mp4"
            />
          </video>
        ) : (
          <video
            key="dark-video"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-opacity duration-700"
          >
            <source src="/halfmoon_web.mp4" type="video/mp4" />
            <source src="/halfmoon_web.webm" type="video/webm" />
          </video>
        )}

        {/* Balanced contrast overlay tailored for both themes */}
        <div
          className={`absolute inset-0 pointer-events-none transition-colors duration-500 ${
            isLight
              ? "bg-gradient-to-b from-white/40 via-sky-50/20 to-slate-50/90 backdrop-blur-[0.5px]"
              : "bg-black/40"
          }`}
        />
      </div>

      {/* Floating Particles / Snowfall Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {isLight
          ? particles.map((flake) => (
              <motion.div
                key={`snow-${flake.id}`}
                className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] border border-sky-100/60"
                style={{
                  width: `${flake.size + 1.5}px`,
                  height: `${flake.size + 1.5}px`,
                  left: flake.left,
                  opacity: flake.opacity + 0.35,
                }}
                initial={{ top: "-5%", x: 0 }}
                animate={{
                  top: "105%",
                  x: [0, (flake.id % 2 === 0 ? 1 : -1) * 20, 0],
                }}
                transition={{
                  top: {
                    duration: Number.parseFloat(flake.animationDuration) * 0.7,
                    repeat: Infinity,
                    ease: "linear",
                    delay: (flake.id % 7) * 0.8,
                  },
                  x: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            ))
          : particles.map((particle) => (
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
      <div className="max-w-4xl w-full flex-1 flex flex-col items-center justify-center relative z-10 text-center pt-16 sm:pt-20 pb-6">
        {/* Scroll Zoom Hero Container */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex flex-col items-center w-full px-2"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/85 dark:bg-black/50 backdrop-blur-md border border-sky-200/80 dark:border-white/20 text-[11px] sm:text-sm font-mono font-semibold text-slate-800 dark:text-white mb-4 sm:mb-6 shadow-xl transition-colors max-w-full">
            {isLight ? (
              <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 animate-spin-slow flex-shrink-0" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
            )}
            <span className="truncate">Available for Internships & Full-Time Roles</span>
          </div>

          {/* Main Headline Title (Responsive sizing to prevent mobile clipping) */}
          <motion.h1
            style={{ scale: heroScale, filter: titleFilter }}
            className="text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold tracking-tight text-slate-950 dark:text-white mb-3 sm:mb-5 drop-shadow-[0_2px_14px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] whitespace-normal sm:whitespace-nowrap break-words origin-center transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi. I’m Bhagyashree.
          </motion.h1>

          {/* Subtitle Text (Responsive font and line spacing) */}
          <motion.p
            style={{ scale: subtitleScale, filter: subtitleFilter }}
            className="text-sm xs:text-base sm:text-xl md:text-2xl font-medium dark:font-normal text-slate-800 dark:text-neutral-100 max-w-3xl leading-relaxed mb-5 sm:mb-7 px-2 sm:px-4 origin-center drop-shadow-[0_1px_8px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            I specialize in turning data and technology into intelligent, scalable solutions through Data Science, AI/ML, and full-stack development.
          </motion.p>

          {/* Action Buttons (Full-width friendly on small mobile) */}
          <motion.div
            style={{ scale: buttonsScale }}
            className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0 mb-4 sm:mb-6 origin-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 hover:bg-slate-800 dark:hover:bg-gray-200 transition-all shadow-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={() => setIsResumeOpen(true)}
              className="w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white dark:bg-gray-900/80 backdrop-blur-md border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 hover:bg-slate-100 dark:hover:bg-gray-800 transition-all shadow-xl cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-4 h-4" />
              <span>My Resume</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Yeabsira-style Continuous Animated Marquee Ticker */}
      <div className="w-full overflow-hidden bg-slate-900/90 dark:bg-white/5 border-y border-slate-700/50 dark:border-white/10 py-3.5 backdrop-blur-md relative z-20 my-4 select-none">
        <motion.div
          className="flex whitespace-nowrap gap-8 text-sm sm:text-base font-mono tracking-wider font-semibold text-slate-200 dark:text-gray-200 uppercase"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>DATA SCIENCE & AI/ML ENGINEER</span>
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>FULL-STACK DEVELOPER (MERN & NEXT.JS)</span>
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>INFRASTRUCTURE & DATA CENTER OPS</span>
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span>UI/UX PRODUCT DESIGNER</span>
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Printable Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  )
}
