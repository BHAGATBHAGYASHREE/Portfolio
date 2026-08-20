"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll, useMotionValueEvent } from "framer-motion"
import { useRef, useState } from "react"
import { Sparkles, Terminal, Code, Cpu, Database, Flame, Wrench, Layers, Rocket, ShieldCheck, ArrowDown, ArrowUp } from "lucide-react"

export default function AboutPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Detect Scroll Direction via Motion useScroll & useMotionValueEvent
  const { scrollY } = useScroll()
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down")

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = current - previous
    setScrollDirection(diff > 0 ? "down" : "up")
  })

  // 3D Gyroscope Physics for Glass Card
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const pillars = [
    {
      icon: Wrench,
      title: "BUILD",
      desc: "Architecting robust full-stack applications & data pipelines from zero to production.",
      badge: "ENGINEERING",
    },
    {
      icon: Flame,
      title: "BREAK",
      desc: "Stress-testing systems, discovering edge-case flaws, and pushing code boundaries.",
      badge: "RESILIENCY",
    },
    {
      icon: Layers,
      title: "LEARN",
      desc: "Continuous evolution across Data Science, AI/ML models & enterprise IT infrastructure.",
      badge: "EVOLUTION",
    },
    {
      icon: Rocket,
      title: "IMPACT",
      desc: "Turning data, curiosity, and ideas into real-world intelligent solutions that matter.",
      badge: "SOLUTIONS",
    },
  ]

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-28 relative flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      id="about-me"
    >
      {/* Background Radial Vignette & Grid */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-0" />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl relative z-10 w-full">
        {/* Section Header with Motion Scroll Direction Indicator */}
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gray-300 mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Core Philosophy & Ethos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif uppercase drop-shadow-2xl">
            ABOUT ME
          </h2>
        </motion.div>

        {/* 3D Glass Hero Manifesto Card with Scroll Direction State Transitions */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{
            borderColor: scrollDirection === "down" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.4)",
            y: scrollDirection === "down" ? 0 : -4,
          }}
          transition={{ duration: 0.4 }}
          className="w-full bg-gray-950/90 border border-white/20 rounded-3xl p-6 sm:p-12 shadow-[0_0_90px_rgba(255,255,255,0.12)] relative overflow-hidden group mb-12"
        >
          {/* Background Ambient Glowing Orb */}
          <div className="absolute -right-24 -top-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute -left-24 -bottom-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Terminal Bar Header */}
          <div style={{ transform: "translateZ(20px)" }} className="flex items-center justify-between pb-6 border-b border-white/15 mb-8">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-white" />
              <span className="text-xs font-mono tracking-widest text-gray-300 uppercase">bhagyashree_manifesto.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-400 tracking-wider">
                {scrollDirection === "down" ? "DIR: DOWN ↓" : "DIR: UP ↑"}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/40 inline-block" />
            </div>
          </div>

          {/* Quote Block (User's Exact Bio!) */}
          <div style={{ transform: "translateZ(35px)" }} className="relative z-10 mb-10">
            <p className="text-xl sm:text-3xl md:text-4xl font-serif text-white leading-relaxed font-normal tracking-wide drop-shadow-md">
              “I <span className="underline decoration-white/40 underline-offset-8">build things</span>, <span className="underline decoration-white/40 underline-offset-8">break things</span>, learn from them, and <span className="text-gray-100 font-semibold">build them better</span>. My journey spans full-stack development, enterprise IT operations, and now Data Science, AI & Machine Learning. I’m interested in the space where technology meets real-world problems—turning data, ideas, and curiosity into solutions that actually make an impact.”
            </p>
          </div>

          {/* Core Discipline Badges */}
          <div style={{ transform: "translateZ(25px)" }} className="flex flex-wrap gap-2.5 pt-6 border-t border-white/10 relative z-10">
            {[
              { label: "Data Science & AI/ML", icon: Database },
              { label: "MERN Full-Stack Dev", icon: Code },
              { label: "Enterprise ITSM Ops", icon: Cpu },
              { label: "Problem Solver & Builder", icon: ShieldCheck },
            ].map((item, idx) => {
              const IconComponent = item.icon
              return (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-xs font-mono text-gray-200 flex items-center gap-2 shadow-md hover:bg-white/20 transition-colors"
                >
                  <IconComponent className="w-3.5 h-3.5 text-white" />
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* 4 Interactive Pillars Grid (Build, Break, Learn, Impact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {pillars.map((pillar, idx) => {
            const IconC = pillar.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionInView ? { opacity: 1, y: scrollDirection === "down" ? 0 : -2 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-gray-950/80 border border-white/15 rounded-2xl p-6 flex flex-col justify-between hover:border-white/40 transition-colors shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <IconC className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-gray-300 uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white font-sans tracking-wide mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
