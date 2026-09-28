"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useTheme } from "next-themes"

export function Cursor3D() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const isLight = mounted && (theme === "light" || resolvedTheme === "light")
  const [isHovering, setIsHovering] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"down" | "up" | null>(null)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Fluid physics layers: core is snappy, outer ring has fluid inertia, ambient aura trails gently
  const coreSpring = { damping: 30, stiffness: 600 }
  const ringSpring = { damping: 25, stiffness: 320 }
  const auraSpring = { damping: 20, stiffness: 180 }

  const coreX = useSpring(cursorX, coreSpring)
  const coreY = useSpring(cursorY, coreSpring)

  const ringX = useSpring(cursorX, ringSpring)
  const ringY = useSpring(cursorY, ringSpring)

  const auraX = useSpring(cursorX, auraSpring)
  const auraY = useSpring(cursorY, auraSpring)

  // Scroll velocity stretch physics (stretches along Y axis during fast scrolls)
  const scrollStretchY = useMotionValue(1)
  const smoothStretchY = useSpring(scrollStretchY, { damping: 16, stiffness: 240 })
  // Compensate on X to preserve volume like fluid mercury
  const smoothStretchX = useTransform(smoothStretchY, (val) => 1 / Math.sqrt(Math.max(0.5, val)))

  const scrollTimer = useRef<NodeJS.Timeout | null>(null)
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())

  // Web Audio Context & Sound Synthesizer Refs
  const audioCtxRef = useRef<AudioContext | null>(null)
  const lastSoundPos = useRef({ x: -100, y: -100 })
  const lastSoundTime = useRef(0)
  const audioPlayingTimer = useRef<NodeJS.Timeout | null>(null)

  // Lazy initialize AudioContext on user interaction
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }, [])

  // 1. Synthesize smooth movement sound (tactile acoustic tick modulated by cursor speed)
  const playMoveSound = useCallback(
    (speed: number) => {
      if (!soundEnabled) return
      const ctx = getAudioContext()
      if (!ctx || ctx.state !== "running") return

      try {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        // Pitch modulates with movement velocity (between 480Hz and 920Hz)
        const baseFreq = Math.min(940, 480 + speed * 140)
        osc.type = "sine"
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, ctx.currentTime + 0.032)

        // Soft, subtle volume envelope
        const vol = Math.min(0.028, 0.012 + speed * 0.005)
        gain.gain.setValueAtTime(vol, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.032)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.035)

        setIsPlayingAudio(true)
        if (audioPlayingTimer.current) clearTimeout(audioPlayingTimer.current)
        audioPlayingTimer.current = setTimeout(() => setIsPlayingAudio(false), 80)
      } catch {
        // Safe fallback
      }
    },
    [soundEnabled, getAudioContext]
  )

  // 2. Synthesize hover chime when crossing buttons/links
  const playHoverSound = useCallback(() => {
    if (!soundEnabled) return
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== "running") return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(780, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.055)

      gain.gain.setValueAtTime(0.025, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.055)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.06)
    } catch {}
  }, [soundEnabled, getAudioContext])

  // 3. Synthesize click feedback
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== "running") return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "triangle"
      osc.frequency.setValueAtTime(340, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.045)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.045)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.05)
    } catch {}
  }, [soundEnabled, getAudioContext])

  // 4. Synthesize scroll cadence feedback
  const playScrollSound = useCallback(() => {
    if (!soundEnabled) return
    const ctx = getAudioContext()
    if (!ctx || ctx.state !== "running") return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = "sine"
      osc.frequency.setValueAtTime(520, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(310, ctx.currentTime + 0.038)

      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.038)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.04)
    } catch {}
  }, [soundEnabled, getAudioContext])

  // Load sound setting preference from localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("portfolio_cursor_sound")
    if (saved !== null) {
      setSoundEnabled(saved === "true")
    }
  }, [])

  // Toggle sound handler
  const handleToggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    localStorage.setItem("portfolio_cursor_sound", String(nextState))
    if (nextState) {
      getAudioContext()
      setTimeout(() => playHoverSound(), 50)
    }
  }

  useEffect(() => {
    if (!mounted) return

    // Unlock AudioContext on first page interaction
    const unlockAudio = () => {
      getAudioContext()
    }
    window.addEventListener("pointerdown", unlockAudio, { once: true })
    window.addEventListener("keydown", unlockAudio, { once: true })

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Calculate distance & speed for audio triggering
      const now = Date.now()
      const dx = e.clientX - lastSoundPos.current.x
      const dy = e.clientY - lastSoundPos.current.y
      const dist = Math.hypot(dx, dy)
      const timeDiff = Math.max(1, now - lastSoundTime.current)

      // Play subtle acoustic tick when moving (throttled to smooth cadence)
      if (dist > 45 && timeDiff > 60) {
        const speed = dist / timeDiff
        playMoveSound(speed)
        lastSoundPos.current = { x: e.clientX, y: e.clientY }
        lastSoundTime.current = now
      }

      // Check clickable element
      const target = e.target as HTMLElement
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer")

        if (isClickable && !isPointer) {
          playHoverSound()
        }
        setIsPointer(isClickable)
      }
    }

    const handleMouseDown = () => {
      setIsHovering(true)
      playClickSound()
    }
    const handleMouseUp = () => setIsHovering(false)

    let lastScrollSoundTime = 0
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const percent = maxScroll > 0 ? Math.min(100, Math.max(0, (currentScrollY / maxScroll) * 100)) : 0
      setScrollPercent(Math.round(percent))

      const now = Date.now()
      const dt = Math.max(1, now - lastScrollTime.current)
      const dy = currentScrollY - lastScrollY.current
      const speed = Math.abs(dy) / dt

      if (dy > 1.5) {
        setScrollDirection("down")
      } else if (dy < -1.5) {
        setScrollDirection("up")
      }

      // Play soft rhythmic audio pulse on scroll (cadenced every 120ms)
      if (now - lastScrollSoundTime > 120 && Math.abs(dy) > 4) {
        playScrollSound()
        lastScrollSoundTime = now
      }

      // Smooth stretch calculation: fast scrolling vertically stretches the ring up to 1.45x
      const stretch = 1 + Math.min(speed * 0.28, 0.45)
      scrollStretchY.set(stretch)

      setIsScrolling(true)

      if (scrollTimer.current) clearTimeout(scrollTimer.current)
      scrollTimer.current = setTimeout(() => {
        setIsScrolling(false)
        setScrollDirection(null)
        scrollStretchY.set(1)
      }, 550)

      lastScrollY.current = currentScrollY
      lastScrollTime.current = now
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("pointerdown", unlockAudio)
      window.removeEventListener("keydown", unlockAudio)
      if (scrollTimer.current) clearTimeout(scrollTimer.current)
      if (audioPlayingTimer.current) clearTimeout(audioPlayingTimer.current)
    }
  }, [
    mounted,
    cursorX,
    cursorY,
    scrollStretchY,
    isPointer,
    playMoveSound,
    playHoverSound,
    playClickSound,
    playScrollSound,
    getAudioContext,
  ])

  if (!mounted) return null

  // SVG circular perimeter: 2 * PI * 22 ≈ 138.23
  const circumference = 138.23
  const strokeOffset = circumference - (circumference * scrollPercent) / 100

  return (
    <>
      {/* ======================================================================= */}
      {/* 1. FLOATING AUDIO HUD CONTROL PILL (Bottom-Left)                        */}
      {/* ======================================================================= */}
      <motion.button
        type="button"
        onClick={handleToggleSound}
        className="fixed bottom-6 left-6 z-50 pointer-events-auto hidden md:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-xl border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white shadow-2xl hover:border-slate-400 dark:hover:border-white/40 transition-all cursor-pointer select-none group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={soundEnabled ? "Mute interactive cursor audio" : "Enable interactive cursor audio"}
        aria-label="Toggle cursor sound"
      >
        {soundEnabled ? (
          <Volume2 className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-400 dark:text-gray-400" />
        )}

        {/* Dynamic 3-Bar Equalizer Wave Animation */}
        <div className="flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
          <motion.span
            animate={{
              height: soundEnabled && isPlayingAudio ? ["20%", "90%", "35%"] : "25%",
            }}
            transition={{ repeat: Infinity, duration: 0.25, ease: "easeInOut" }}
            className="w-0.5 bg-slate-800 dark:bg-white rounded-full"
          />
          <motion.span
            animate={{
              height: soundEnabled && isPlayingAudio ? ["40%", "100%", "50%"] : "40%",
            }}
            transition={{ repeat: Infinity, duration: 0.2, ease: "easeInOut", delay: 0.05 }}
            className="w-0.5 bg-slate-800 dark:bg-white rounded-full"
          />
          <motion.span
            animate={{
              height: soundEnabled && isPlayingAudio ? ["15%", "75%", "25%"] : "20%",
            }}
            transition={{ repeat: Infinity, duration: 0.3, ease: "easeInOut", delay: 0.1 }}
            className="w-0.5 bg-slate-800 dark:bg-white rounded-full"
          />
        </div>

        <span className="text-[10px] font-mono font-bold tracking-wider uppercase">
          {soundEnabled ? "SFX: ON" : "SFX: MUTED"}
        </span>
      </motion.button>

      {/* ======================================================================= */}
      {/* 2. 3D CURSOR LAYERS                                                     */}
      {/* ======================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block select-none">
        {/* Trailing Ambient Halo Aura */}
        <motion.div
          style={{
            x: auraX,
            y: auraY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovering ? 0.8 : isPointer ? 1.4 : isScrolling ? 1.25 : 1,
            opacity: isPointer ? 0.35 : isScrolling ? 0.3 : 0.18,
          }}
          transition={{ duration: 0.3 }}
          className={`w-16 h-16 rounded-full transition-colors duration-300 ${
            isLight ? "bg-white/40 blur-md" : "bg-white/20 blur-lg"
          }`}
        />

        {/* Main Scroll-Responsive Fluid Stretch Ring / Snowflake */}
        <motion.div
          style={{
            x: ringX,
            y: ringY,
            translateX: "-50%",
            translateY: "-50%",
            scaleX: smoothStretchX,
            scaleY: smoothStretchY,
          }}
          animate={{
            scale: isHovering ? 0.75 : isPointer ? 1.35 : 1,
            opacity: isPointer ? 0.95 : 0.85,
          }}
          transition={{ type: "spring", stiffness: 450, damping: 28 }}
          className={`relative flex items-center justify-center ${isLight ? "w-14 h-14" : "w-12 h-12"}`}
        >
          {isLight ? (
            /* =============================================================== */
            /* LIGHT MODE: AUTHENTIC CLEAN CRYSTAL SNOWFLAKE (NO BLUE DOTS)     */
            /* =============================================================== */
            <>
              {/* Rotating Authentic Crystal Snowflake from User Example */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: isScrolling ? 2.5 : 14,
                  ease: "linear",
                }}
                className="relative w-full h-full flex items-center justify-center pointer-events-none"
              >
                <img
                  src="/snowflake-cursor.png"
                  alt="Crystal Snowflake Cursor"
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.32)] drop-shadow-[0_0_2px_rgba(255,255,255,0.95)]"
                />
              </motion.div>

              {/* Directional Scroll Micro-Indicators */}
              <AnimatePresence>
                {isScrolling && scrollDirection === "up" && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: -9 }}
                    exit={{ opacity: 0, y: 3 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-800 font-bold drop-shadow-[0_0_4px_rgba(255,255,255,0.95)]"
                  >
                    ▲
                  </motion.div>
                )}

                {isScrolling && scrollDirection === "down" && (
                  <motion.div
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 9 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-800 font-bold drop-shadow-[0_0_4px_rgba(255,255,255,0.95)]"
                  >
                    ▼
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Scroll Telemetry Pill */}
              <AnimatePresence>
                {isScrolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, x: 8 }}
                    animate={{ opacity: 1, scale: 1, x: 26 }}
                    exit={{ opacity: 0, scale: 0.7, x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/95 text-slate-900 border border-slate-300 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] font-mono text-[10px] font-bold tracking-wider pointer-events-none select-none whitespace-nowrap"
                  >
                    <span className="text-[9px] text-slate-700 font-bold">
                      {scrollDirection === "down" ? "▼" : scrollDirection === "up" ? "▲" : "❄"}
                    </span>
                    <span>{scrollPercent}%</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* =============================================================== */
            /* DARK MODE: COSMIC RADAR HUD COMPASS                             */
            /* =============================================================== */
            <>
              {/* SVG Circular Page Scroll Progress Radar Ring */}
              <svg viewBox="0 0 52 52" className="w-full h-full -rotate-90">
                {/* Subtle Background Track */}
                <circle
                  cx="26"
                  cy="26"
                  r="22"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="2 3"
                />

                {/* Dynamic Progress Fill (0% to 100%) */}
                <circle
                  cx="26"
                  cy="26"
                  r="22"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="2"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="transition-all duration-150 ease-out"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                  }}
                />
              </svg>

              {/* 4 Precision HUD Tick Marks */}
              <div className="absolute inset-0 flex items-center justify-between px-0.5 pointer-events-none opacity-40">
                <span className="w-1 h-0.5 bg-white rounded-full" />
                <span className="w-1 h-0.5 bg-white rounded-full" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-between py-0.5 pointer-events-none opacity-40">
                <span className="h-1 w-0.5 bg-white rounded-full" />
                <span className="h-1 w-0.5 bg-white rounded-full" />
              </div>

              {/* Orbiting Stardust Satellite Gyroscope Beads */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: isScrolling ? 1.2 : 5,
                  ease: "linear",
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Satellite Bead 1 */}
                <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                {/* Satellite Bead 2 */}
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/70 shadow-[0_0_6px_#ffffff]" />
              </motion.div>

              {/* Directional Scroll Micro-Indicators at North / South edges */}
              <AnimatePresence>
                {isScrolling && scrollDirection === "up" && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: -7 }}
                    exit={{ opacity: 0, y: 3 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                  >
                    ▲
                  </motion.div>
                )}

                {isScrolling && scrollDirection === "down" && (
                  <motion.div
                    initial={{ opacity: 0, y: -3 }}
                    animate={{ opacity: 1, y: 7 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-white font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                  >
                    ▼
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating Scroll Telemetry Pill (Visible during active scroll) */}
              <AnimatePresence>
                {isScrolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, x: 8 }}
                    animate={{ opacity: 1, scale: 1, x: 26 }}
                    exit={{ opacity: 0, scale: 0.7, x: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/90 text-white border border-white/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.8)] font-mono text-[10px] font-bold tracking-wider pointer-events-none select-none whitespace-nowrap"
                  >
                    <span className="text-[8px] opacity-80">
                      {scrollDirection === "down" ? "▼" : scrollDirection === "up" ? "▲" : "•"}
                    </span>
                    <span>{scrollPercent}%</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        {/* High-Precision Inner Core Dot (Dark Mode HUD Only) */}
        {!isLight && (
          <motion.div
            style={{
              x: coreX,
              y: coreY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: isHovering ? 1.4 : isPointer ? 0.5 : isScrolling ? 0.85 : 1,
            }}
            transition={{ type: "spring", stiffness: 650, damping: 30 }}
            className="w-2.5 h-2.5 rounded-full bg-white border border-white/60 shadow-[0_0_12px_rgba(255,255,255,0.9)]"
          />
        )}
      </div>
    </>
  )
}
