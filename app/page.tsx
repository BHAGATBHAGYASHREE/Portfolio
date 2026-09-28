"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MainContent from "@/components/main-content"
import LoadingScreen from "@/components/loading-screen"
import SpaceBackground from "@/components/space-background"
import AstronautChatbot from "@/components/astronaut-chatbot"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Snappy, smooth loading transition that never hangs
    const timer = setTimeout(() => {
      setLoading(false)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white relative transition-colors duration-500">
      {/* Space background with stars, moon, and planets */}
      <SpaceBackground />

      {/* Main Content is always mounted so page never hangs on loading screen */}
      <div className="w-full relative z-10">
        <MainContent />
        <AstronautChatbot />
      </div>

      {/* Loading Screen Overlay with smooth fadeout and click-to-dismiss fallback */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setLoading(false)}
            className="fixed inset-0 z-50 cursor-pointer"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
