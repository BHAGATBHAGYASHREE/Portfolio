"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function LandscapeCutout() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Smooth scroll-driven parallax wave translation
  const waveY = useTransform(scrollYProgress, [0, 1], [0, 30])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden leading-none z-20 pointer-events-none select-none -mt-24 sm:-mt-36 md:-mt-48 lg:-mt-60"
    >
      <div className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] lg:h-[460px] xl:h-[500px]">
        <svg
          viewBox="0 0 1440 400"
          className="w-full h-full object-fill min-w-full"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle Dark Navy Layer for Background Depth */}
            <linearGradient id="darkHillDepth" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0a0f1d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* SUBTLE BACKGROUND HILL SILHOUETTE (Dark Night Depth) */}
          <path
            d="M 0 400 L 0 270 C 140 240, 260 300, 410 270 C 560 240, 620 310, 770 270 C 920 230, 1080 310, 1250 250 C 1350 230, 1400 255, 1440 240 L 1440 400 Z"
            fill="url(#darkHillDepth)"
          />

          {/* MAIN SOLID PITCH-BLACK ORGANIC LANDSCAPE CUTOUT (With Parallax Scroll Motion) */}
          <motion.path
            style={{ y: waveY }}
            d="M 0 400 
               L 0 170 
               C 40 110, 160 130, 220 200 
               C 270 260, 100 285, 270 305
               C 360 320, 480 310, 560 280
               C 600 240, 615 160, 680 155
               C 745 150, 770 230, 840 275
               C 920 325, 1050 340, 1120 320
               C 1220 300, 1340 270, 1440 200
               L 1440 400 Z"
            fill="#000000"
          />
        </svg>
      </div>
    </div>
  )
}
