"use client"

import { Building, GraduationCap, BookOpen, CheckCircle2, Calendar } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// Individual Education Card with Motion.dev Circular Progress Ring tracking element scroll position through viewport
function EducationCardItem({ edu, index }: { edu: any; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion useScroll: Track specific card scroll position through viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 20%"],
  })

  // Circular SVG ring progress path length from 0 to 1
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])
  const cardScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.96])
  const borderOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.15, 0.6, 0.6, 0.15])

  const IconComponent = edu.icon

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: cardOpacity, scale: cardScale }}
      className="relative group"
    >
      {/* Motion Circular Scroll Progress Ring on Timeline Node (Matching Motion.dev Reference Video 1:1!) */}
      <div className="absolute -left-[45px] md:-left-[61px] top-6 w-9 h-9 flex items-center justify-center z-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          {/* Background Circle Ring */}
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            className="stroke-white/15"
            strokeWidth="2.5"
          />
          {/* Motion Scroll-Linked Circular Progress Path */}
          <motion.circle
            cx="18"
            cy="18"
            r="14"
            fill="none"
            className="stroke-white"
            strokeWidth="2.5"
            strokeDasharray="88"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>
        {/* Core Node Center Dot */}
        <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </div>

      {/* Glassmorphic Education Card Container */}
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="bg-gray-950/90 backdrop-blur-2xl border rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-2xl relative overflow-hidden group-hover:border-white/40"
      >
        {/* Background Stardust Shimmer */}
        <div className="absolute -right-20 -top-20 w-56 h-56 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors" />

        {/* Floating Number Tag */}
        <div className="absolute top-4 right-6 font-mono text-4xl font-extrabold text-white/5 group-hover:text-white/15 transition-colors pointer-events-none select-none">
          {edu.id}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
          <div className="flex items-center gap-4">
            {/* Institution Avatar Box */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/30 via-white/15 to-transparent p-0.5 shadow-lg flex-shrink-0">
              <div className="w-full h-full bg-gray-950 rounded-xl flex items-center justify-center border border-white/15">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide">{edu.institution}</h3>
              <p className="text-xs sm:text-sm font-mono font-semibold text-gray-300 uppercase tracking-wider mt-0.5">
                {edu.degree}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-medium text-gray-200 w-fit">
              <Calendar className="w-3.5 h-3.5 text-white" />
              <span>{edu.period}</span>
            </span>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-gray-400 uppercase">
              {edu.badge}
            </span>
          </div>
        </div>

        {/* Bullet Highlights */}
        <ul className="space-y-2.5 pt-4 border-t border-white/10 relative z-10">
          {edu.points.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-light">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function EducationJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.1 })

  // Overall Section Scroll Progress for timeline line beam
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  })

  const scaleY = useTransform(sectionScrollProgress, [0, 1], [0, 1])

  const educationList = [
    {
      id: "01",
      institution: "ITM Skills University",
      degree: "BACHELORS OF TECHNOLOGY IN COMPUTER SCIENCE",
      period: "August 2023 - Present",
      points: [
        "Pursuing a comprehensive curriculum in computer science fundamentals",
        "Specializing in UI/UX design and frontend development",
        "Active participant in technical workshops and hackathons",
      ],
      icon: GraduationCap,
      badge: "Current Degree",
    },
    {
      id: "02",
      institution: "Ramseth Thakur College",
      degree: "HIGHER SECONDARY EDUCATION (HSC)",
      period: "2021 - 2023",
      points: [
        "Completed higher secondary education with focus on science and mathematics",
        "Participated in various technical competitions and events",
        "Developed initial interest in computer science and design",
      ],
      icon: Building,
      badge: "High School",
    },
    {
      id: "03",
      institution: "Harmony Public School",
      degree: "PRIMARY & SECONDARY EDUCATION (SSC)",
      period: "2015 - 2020",
      points: [
        "Completed primary education with distinction",
        "Participated in various extracurricular activities and art competitions",
        "Developed foundation in creative thinking and problem-solving",
      ],
      icon: BookOpen,
      badge: "Schooling",
    },
  ]

  return (
    <section
      className="min-h-screen py-28 relative flex flex-col items-center justify-center overflow-hidden bg-black text-white"
      id="education"
      ref={containerRef}
    >
      {/* Background Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Heading */}
        <motion.div
          className="flex flex-col items-center mb-20 text-center"
          initial={{ opacity: 0, y: -25 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-gray-300 mb-4 shadow-lg">
            <GraduationCap className="w-3.5 h-3.5 text-white" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-serif uppercase drop-shadow-2xl">
            EDUCATION JOURNEY
          </h2>
        </motion.div>

        {/* Timeline Container with Motion Circular Progress Rings per Card */}
        <div className="relative ml-4 md:ml-12 pl-8 md:pl-12 space-y-16">
          {/* Static Background Timeline Line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10" />

          {/* Motion Scroll-Linked Animated Line Beam */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-white via-gray-300 to-white/20 shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10"
          />

          {educationList.map((edu, index) => (
            <EducationCardItem key={edu.institution} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
