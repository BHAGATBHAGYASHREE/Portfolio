"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function LoadingScreen() {
  // Use state to store the stars
  const [loadingStars, setLoadingStars] = useState<Array<{
    id: number;
    size: number;
    top: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
    opacity: number;
  }>>([]);

  // Generate stars only on the client side to avoid hydration errors
  useEffect(() => {
    // Generate random stars for loading screen
    const generateLoadingStars = (count: number) => {
      const stars = []
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 3 + 1
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
      return stars
    }

    setLoadingStars(generateLoadingStars(50));
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/loadingpage.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Stars background - only rendered on client side */}
      <div className="absolute inset-0 z-20">
        {loadingStars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
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

      {/* Loading animation */}
      <div className="relative z-30">
        <motion.div
          className="w-24 h-24 rounded-full border-4 border-t-white border-r-white border-b-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-0 w-24 h-24 rounded-full border-4 border-t-transparent border-r-transparent border-b-white border-l-white"
          animate={{ rotate: -180 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="text-white text-4xl font-bold"
          >
            B
          </motion.div>
        </div>
      </div>

      <motion.p
        className="absolute bottom-20 text-white text-xl z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        BB's Portfolio Loading...
      </motion.p>
    </div>
  )
}
