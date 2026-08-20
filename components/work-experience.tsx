"use client"

import { Building, Calendar, Briefcase, CheckCircle2, Sparkles, TrendingUp, Users, Server, ShieldCheck, Cpu, ChevronDown } from "lucide-react"
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

export default function WorkExperience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.15 })
  const [expandedIndex, setExpandedIndex] = useState<number>(0)

  // Mouse 3D Tilt Gyroscope
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]), { damping: 25, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]), { damping: 25, stiffness: 200 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(xPct)
    mouseY.set(yPct)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const experiences = [
    {
      id: "01",
      company: "HDFC Bank Data Center",
      role: "DATA CENTER OPERATIONS",
      period: "JUL 2025 - DEC 2025",
      iconLetter: "H",
      badgeText: "High Availability Banking Environment",
      metrics: [
        { label: "SLA Monitoring", value: "99.9%", icon: ShieldCheck },
        { label: "ITSM ServiceNow", value: "Ops", icon: Server },
      ],
      description:
        "Monitored critical data center infrastructure and supported ITSM operations using ServiceNow, including incident tracking, SLA monitoring, and ticket lifecycle management.",
      achievements: [
        "Monitored critical data center infrastructure and supported ITSM operations using ServiceNow",
        "Managed incident tracking, SLA monitoring, and ticket lifecycle management",
        "Assisted in asset management, compliance documentation, and operational workflows in a high-availability banking environment",
      ],
      tags: ["Data Center Ops", "ServiceNow", "ITSM Operations", "SLA Monitoring", "Asset Management"],
    },
    {
      id: "02",
      company: "Zinq Technologies",
      role: "CORPORATE TRAINER",
      period: "APR 2024",
      iconLetter: "Z",
      badgeText: "Generative AI Enablement",
      metrics: [
        { label: "Employees Trained", value: "30+", icon: Users },
        { label: "Productivity Boost", value: "+25%", icon: TrendingUp },
      ],
      description:
        "Generative AI Enablement: Delivered hands-on guidance to employees on effectively leveraging Generative AI tools, with a focus on enhancing creativity and productivity in tasks such as PowerPoint presentation design.",
      achievements: [
        "Trained 30+ employees on AI tools implementation",
        "Improved team productivity by 25% through AI integration",
        "Developed custom AI workflows for design teams",
      ],
      tags: ["Generative AI", "Corporate Training", "AI Workflows", "Presentation Design"],
    },
    {
      id: "03",
      company: "Letsupgrade",
      role: "SOFTWARE DEVELOPMENT & ENGINEERING INTERN",
      period: "DEC 2023 - JAN 2024",
      iconLetter: "L",
      badgeText: "UX Revamp & Digital Outreach",
      metrics: [
        { label: "Traffic Surge", value: "+40%", icon: TrendingUp },
        { label: "UI/UX Optimization", value: "100%", icon: Cpu },
      ],
      description:
        "Website Revamp and User Experience Optimization: Led the redesign of the official website with a focus on intuitive navigation, modern UI/UX elements, and enhanced user interaction. Digital Outreach Strategies to expand reach and elevate online presence.",
      achievements: [
        "Increased website traffic by 40% through UI/UX improvements",
        "Implemented responsive design principles across all pages",
        "Created interactive elements that boosted user engagement metrics",
      ],
      tags: ["UI/UX Design", "Website Revamp", "Frontend Development", "User Outreach"],
    },
  ]

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen py-24 relative flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      id="work"
    >
      {/* Background Vignette & Matrix Grid */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0" />

      {/* Ambient Stardust Light Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-white/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-14 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gray-300 mb-3 shadow-lg">
            <Briefcase className="w-3.5 h-3.5 text-white" />
            <span>Interactive 3D Experience Deck</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif uppercase drop-shadow-2xl mb-2">
            WORK EXPERIENCE
          </h2>
        </motion.div>

        {/* 3D Glass Stage Container (Refined Sizes & Smooth 3D Gyro Tilt) */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="flex flex-col gap-5 w-full"
        >
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => setExpandedIndex((prev) => (prev === index ? -1 : index))}
                className={`w-full bg-gray-950/90 backdrop-blur-2xl border rounded-2xl p-5 sm:p-7 transition-all duration-400 shadow-2xl relative overflow-hidden cursor-pointer group transform-gpu ${
                  isExpanded
                    ? "border-white/70 ring-2 ring-white/25 shadow-[0_0_40px_rgba(255,255,255,0.1)] z-30"
                    : "border-white/15 hover:border-white/35 z-10 opacity-85 hover:opacity-100"
                }`}
              >
                {/* Subtle Stardust Shimmer Glow */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-full blur-2xl transition-transform duration-500 pointer-events-none ${isExpanded ? "scale-110" : "scale-90"}`} />

                {/* Floating Number Tag */}
                <div className="absolute top-4 right-6 font-mono text-4xl sm:text-5xl font-extrabold text-white/5 group-hover:text-white/15 transition-colors pointer-events-none select-none">
                  {exp.id}
                </div>

                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-4">
                    {/* Brand Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/30 via-white/10 to-transparent p-0.5 shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                      <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center border border-white/15">
                        <span className="text-xl font-black text-white font-mono">{exp.iconLetter}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide font-sans">{exp.company}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-gray-300">
                          {exp.badgeText}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-gray-400" />
                        <span>{exp.role}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono font-medium text-gray-200 shadow-sm">
                      <Calendar className="w-3 h-3 text-white" />
                      <span>{exp.period}</span>
                    </span>

                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Expanded Accordion Body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="pt-6 mt-5 border-t border-white/15 relative z-10 flex flex-col gap-5"
                    >
                      {/* Metric Hologram Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {exp.metrics.map((m, mIdx) => {
                          const IconComponent = m.icon
                          return (
                            <div
                              key={mIdx}
                              className="p-3 rounded-xl bg-white/5 border border-white/15 backdrop-blur-md flex items-center gap-3 hover:bg-white/10 transition-colors shadow-md"
                            >
                              <div className="p-2 rounded-lg bg-white/10 text-white">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xl font-extrabold text-white font-mono leading-none mb-0.5">
                                  {m.value}
                                </div>
                                <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                                  {m.label}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="pt-3 border-t border-white/10">
                        <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 mb-2.5 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                          <span>Key Achievements</span>
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-gray-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/10">
                        {exp.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/15 text-[10px] font-mono text-gray-300 hover:bg-white/15 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
