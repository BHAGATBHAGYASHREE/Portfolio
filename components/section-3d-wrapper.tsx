"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function Section3DWrapper({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Futuristic 3D perspective transformation matrix - softened on mobile to prevent horizontal scroll wobble
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [6, 0, 0, -6])
  const rotateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-1.5, 0, 0, 1.5])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <div ref={ref} className="w-full relative py-4 sm:py-6 overflow-x-clip" style={{ perspective: 1200 }} id={id}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className={`w-full flex items-center justify-center ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
