"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 flex items-center justify-center ${className}`}>
        <div className="w-4 h-4 rounded-full bg-slate-400 dark:bg-white/40 animate-pulse" />
      </div>
    )
  }

  const isDark = theme === "dark" || resolvedTheme === "dark"

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none cursor-pointer border shadow-lg ${
        isDark
          ? "bg-black/85 border-white/25 text-amber-300 hover:bg-black hover:border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          : "bg-slate-900 border-slate-800 text-sky-200 hover:bg-slate-800 hover:border-slate-700 shadow-[0_4px_18px_rgba(15,23,42,0.35)]"
      } ${className}`}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Toggle light and dark mode"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* In Light Mode: Prominently display the MOON (Dark Mode logo) in glowing cyan/silver so the user can easily see and switch to Dark Mode */}
      {!isDark ? (
        <div className="flex items-center justify-center">
          <Moon className="w-5 h-5 text-sky-200 fill-sky-300/30 drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
        </div>
      ) : (
        /* In Dark Mode: Prominently display the SUN (Light Mode logo) in glowing gold/amber */
        <div className="flex items-center justify-center">
          <Sun className="w-5 h-5 text-amber-300 fill-amber-400/30 drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]" />
        </div>
      )}
    </motion.button>
  )
}
