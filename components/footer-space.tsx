"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Rocket, Compass, FileText, Mountain } from "lucide-react"
import { useTheme } from "next-themes"
import SocialDock from "./social-dock"

export default function FooterSpace() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateISTTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      setCurrentTime(timeStr)
    }

    updateISTTime()
    const timer = setInterval(updateISTTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const isLight = mounted && (theme === "light" || resolvedTheme === "light")

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="relative w-full bg-slate-100 dark:bg-[#05060a] text-slate-900 dark:text-white pt-24 pb-10 overflow-hidden select-none border-t border-slate-300 dark:border-slate-900 z-20 transition-colors duration-500">
      
      {/* ========================================================================= */}
      {/* 1. AMBIENCE & THEME GLOW                                                  */}
      {/* ========================================================================= */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-400 dark:via-white/30 to-transparent pointer-events-none" />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] rounded-full blur-[160px] pointer-events-none ${
        isLight ? "bg-sky-200/40" : "bg-white/5"
      }`} />
      <div className={`absolute bottom-0 right-10 w-[500px] h-[300px] rounded-full blur-[140px] pointer-events-none ${
        isLight ? "bg-blue-100/50" : "bg-white/5"
      }`} />

      <div className="container mx-auto px-6 sm:px-10 max-w-7xl relative z-10">
        
        {/* ======================================================================= */}
        {/* 2. TOP MISSION / SUMMIT STATUS & TELEMETRY BAR                          */}
        {/* ======================================================================= */}
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-300 dark:border-slate-800/80">
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] flex-shrink-0">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isLight ? "bg-sky-500" : "bg-emerald-500 dark:bg-white"}`} />
                <span className="text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  {isLight ? "SUMMIT STATUS: ONLINE • OPEN FOR ROLES" : "SYSTEM STATUS: ONLINE • OPEN FOR ROLES"}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 mt-1 font-medium">
                NAVI MUMBAI, INDIA • {currentTime || "00:00:00 IST"} (UTC +5:30)
              </p>
            </div>
          </div>

          {/* 3D Tactile Keycaps Social Dock (In the same line as System Status) */}
          <div className="flex items-center justify-center flex-shrink-0">
            <SocialDock />
          </div>

          <div className="flex flex-col xs:flex-row items-center gap-3 sm:gap-4 w-full xs:w-auto justify-center flex-shrink-0">
            <a
              href="/Bhagyashree.pdf"
              download
              className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm flex-shrink-0"
            >
              <FileText className="w-4 h-4 text-slate-900 dark:text-white" />
              <span>Resume Sheet</span>
            </a>

            <button
              onClick={scrollToTop}
              className="w-full xs:w-auto px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 border border-slate-800 dark:border-white/40 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] group flex-shrink-0"
            >
              <span>{isLight ? "Back To Summit" : "Back To Orbit"}</span>
              {isLight ? (
                <Mountain className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-sky-400" />
              ) : (
                <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </div>

      </div>

      {/* ======================================================================= */}
      {/* 4. MONUMENTAL "BHAGYASHREE" EDGE-TO-EDGE FULL-WIDTH PAGE BANNER        */}
      {/* ======================================================================= */}
      <div className="w-full pt-6 pb-2 px-0 flex items-center justify-center select-none pointer-events-none overflow-hidden text-slate-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="w-full"
        >
          <svg
            viewBox="0 0 1000 125"
            className="w-full h-auto select-none pointer-events-none block"
            preserveAspectRatio="xMidYMid meet"
            aria-label="BHAGYASHREE"
          >
            <defs>
              {/* Light Mode Gradient: Dark, prominent, clean slate gradient (plain text, no outlines) */}
              <linearGradient id="footerNameGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.72" />
                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.18" />
              </linearGradient>

              {/* Dark Mode Gradient: Clean cosmic starlight glow (100% UNTOUCHED) */}
              <linearGradient id="footerNameGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              fill={isLight ? "url(#footerNameGradientLight)" : "url(#footerNameGradientDark)"}
              className="footer-monumental-text font-black font-sans uppercase"
              fontSize="120"
              fontWeight="900"
              letterSpacing="-0.035em"
            >
              BHAGYASHREE
            </text>
          </svg>
        </motion.div>
      </div>

      {/* ======================================================================= */}
      {/* 5. BOTTOM COPYRIGHT & SIGNATURE LINE                                    */}
      {/* ======================================================================= */}
      <div className="container mx-auto px-6 sm:px-10 max-w-7xl relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-300 dark:border-slate-900 text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">
          <p>© 2026 Bhagyashree Bhagat • All Rights Reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            <span>Designed & Engineered in Kharghar, Navi Mumbai</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
