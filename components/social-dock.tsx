"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, Mail } from "lucide-react"

interface SocialDockProps {
  className?: string
}

export default function SocialDock({ className = "" }: SocialDockProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)

  const keys = [
    {
      id: "email",
      label: "Send an Email",
      icon: Mail,
      glowColor: "rgba(255, 255, 255, 0.35)",
      url: "mailto:bhagyashreebhagat8@gmail.com",
    },
    {
      id: "github",
      label: "Visit GitHub Profile",
      icon: Github,
      glowColor: "rgba(255, 255, 255, 0.35)",
      url: "https://github.com/BHAGATBHAGYASHREE",
    },
    {
      id: "linkedin",
      label: "Visit LinkedIn Profile",
      icon: Linkedin,
      glowColor: "rgba(255, 255, 255, 0.35)",
      url: "https://linkedin.com/in/bhagatbhagyashree",
    },
  ]

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Tactile Keycaps Dock Container */}
      <div className="relative bg-white/90 dark:bg-black/80 backdrop-blur-2xl border border-slate-300 dark:border-white/15 rounded-[26px] p-2 sm:p-2.5 shadow-md dark:shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center gap-2.5 sm:gap-3 transition-colors">
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
              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden border ${
                isHovered
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white/50 dark:bg-gradient-to-b dark:from-white/20 dark:via-white/5 dark:to-neutral-900 shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-zinc-900/90 text-slate-700 dark:text-neutral-400"
              }`}
              whileHover={{ y: -2, scale: 1.06 }}
              whileTap={{ y: 2, scale: 0.94 }}
            >
              {/* Top Bevel Highlight for 3D Keycap feel */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-t-2xl pointer-events-none" />

              {/* White Glow aura inside keycap when active/hovered */}
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
                className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-colors duration-300 ${
                  isHovered ? "text-white" : "text-slate-700 dark:text-neutral-400"
                }`}
              />

              {/* Small status light dot at bottom of keycap */}
              <div
                className={`absolute bottom-1.5 sm:bottom-2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isHovered ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" : "bg-slate-400 dark:bg-neutral-600/70"
                }`}
              />
            </motion.a>
          )
        })}
      </div>

      {/* Dynamic Animated Tooltip Label floating below dock */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-30 whitespace-nowrap">
        <AnimatePresence mode="wait">
          {hoveredKey && (
            <motion.div
              key={hoveredKey}
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="px-3.5 py-1 rounded-xl bg-slate-900/95 dark:bg-neutral-950/95 border border-slate-700 dark:border-white/20 backdrop-blur-md text-[11px] font-mono text-white shadow-xl tracking-wide"
            >
              {keys.find((k) => k.id === hoveredKey)?.label}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
