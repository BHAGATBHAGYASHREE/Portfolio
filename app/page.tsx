"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import MainContent from "@/components/main-content"
import LoadingScreen from "@/components/loading-screen"
import SpaceBackground from "@/components/space-background"
import AstronautChatbot from "@/components/astronaut-chatbot"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Space background with stars, moon, and planets */}
      <SpaceBackground />

      {loading ? (
        <LoadingScreen />
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="w-full">
          <MainContent />
          <AstronautChatbot />
        </motion.div>
      )}
    </main>
  )
}
