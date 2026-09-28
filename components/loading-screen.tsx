"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingStars, setLoadingStars] = useState<Array<{
    id: number;
    size: number;
    top: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
    opacity: number;
  }>>([])

  useEffect(() => {
    const stars = []
    for (let i = 0; i < 40; i++) {
      const size = Math.random() * 2.5 + 1
      stars.push({
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 1}s`,
        animationDelay: `${Math.random() * 2}s`,
        opacity: Math.random() * 0.7 + 0.3,
      })
    }
    setLoadingStars(stars)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const formattedProgress = String(progress).padStart(3, "0")

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden select-none">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="/loadingpage.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />

      {/* Stars Background */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {loadingStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              animationDuration: star.animationDuration,
              animationDelay: star.animationDelay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Yeabsira-inspired Big Numeric Progress Counter (Bottom Left) */}
      <div className="fixed left-6 sm:left-12 bottom-6 sm:bottom-12 z-40 text-5xl sm:text-8xl font-serif text-white/90 font-light tabular-nums tracking-tighter drop-shadow-2xl">
        {formattedProgress}
      </div>

      {/* Perfectly Symmetrical Centered Loader Container */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        {/* Glowing Symmetrical Dual Concentric Spinner */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          <motion.div
            className="absolute inset-0 w-28 h-28 rounded-full border-2 border-white/10 border-t-white border-r-white/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <motion.div
            className="absolute inset-2 w-24 h-24 rounded-full border-2 border-white/5 border-b-white border-l-white/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white font-serif font-bold text-xl shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            BB
          </motion.div>
        </div>

        {/* Yeabsira-style Sleek Progress Bar Track */}
        <div className="w-[260px] sm:w-[340px] h-1.5 bg-white/20 rounded-full overflow-hidden mb-4 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-400 via-white to-gray-200 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Symmetrical Label & Pulse Status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gray-200 mb-2 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>BHAGYASHREE BHAGAT</span>
          </div>

          <p className="text-[11px] font-mono text-gray-400 uppercase tracking-widest animate-pulse">
            INITIALIZING EXPERIENCE... {progress}%
          </p>
        </motion.div>
      </div>
    </div>
  )
}
