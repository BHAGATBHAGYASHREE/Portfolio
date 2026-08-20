"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, Calendar } from "lucide-react"

export default function SocialDock() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const keys = [
    {
      id: "calendar",
      label: "Book a free call",
      icon: Calendar,
      glowColor: "rgba(56, 189, 248, 0.7)",
      url: "mailto:bhagyashreebhaagat8@gmail.com",
    },
    {
      id: "github",
      label: "Visit GitHub Profile",
      icon: Github,
      glowColor: "rgba(59, 130, 246, 0.7)",
      url: "https://github.com/BHAGATBHAGYASHREE",
    },
    {
      id: "linkedin",
      label: "Visit LinkedIn Profile",
      icon: Linkedin,
      glowColor: "rgba(99, 102, 241, 0.7)",
      url: "https://linkedin.com/in/bhagyashree-bhagat",
    },
  ]

  return (
    <div className="flex flex-col items-center my-8 select-none">
      {/* 3D Tactile Keycaps Dock Container (Same to Same as video) */}
      <div className="relative bg-gray-950/90 backdrop-blur-2xl border-2 border-gray-800/80 rounded-[32px] p-3 sm:p-4 shadow-2xl flex items-center justify-center gap-3 sm:gap-4">
        {keys.map((k) => {
          const IconComp = k.icon
          const isHovered = hoveredKey === k.id

          return (
            <motion.a
              key={k.id}
              href={k.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredKey(k.id)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden border ${
                isHovered
                  ? "border-blue-400/50 bg-gradient-to-b from-blue-950/40 to-gray-900 shadow-2xl"
                  : "border-gray-800 bg-gray-900/90"
              }`}
              whileHover={{ y: -3, scale: 1.06 }}
              whileTap={{ y: 2, scale: 0.94 }}
            >
              {/* Top Bevel Highlight for 3D Keycap feel */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl pointer-events-none" />

              {/* Blue Glow aura inside keycap when active/hovered (exact match to video) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-90 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${k.glowColor} 0%, transparent 75%)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Key Icon */}
              <IconComp
                className={`w-7 h-7 sm:w-8 sm:h-8 relative z-10 transition-colors duration-300 ${
                  isHovered ? "text-cyan-300" : "text-gray-400"
                }`}
              />

              {/* Small status light dot at bottom of keycap */}
              <div
                className={`absolute bottom-2.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isHovered ? "bg-cyan-300 shadow-[0_0_8px_#38bdf8]" : "bg-gray-700 opacity-40"
                }`}
              />
            </motion.a>
          )
        })}
      </div>

      {/* Dynamic Animated Tooltip Label below dock (Same to Same as video) */}
      <div className="h-10 mt-3 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredKey && (
            <motion.div
              key={hoveredKey}
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="px-4 py-1.5 rounded-xl bg-gray-900/90 border border-gray-800 backdrop-blur-md text-xs font-serif text-gray-200 shadow-xl tracking-wide"
            >
              {keys.find((k) => k.id === hoveredKey)?.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
