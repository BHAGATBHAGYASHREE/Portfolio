"use client"

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import {
  Code2,
  Palette,
  Database,
  Cpu,
  Server,
  Terminal,
  Sparkles,
  X,
  CheckCircle2,
  ArrowRight,
  Layers,
} from "lucide-react"

// Creative 3D Holographic Skill Card with Click-to-Expand Accordion
function AsymmetricSkillCard({
  card,
  isOpen,
  onToggle,
  onOpenModal,
  colSpan,
}: {
  card: any
  isOpen: boolean
  onToggle: () => void
  onOpenModal: () => void
  colSpan: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Gyroscope Physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 220 })
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 220 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3.5deg", "-3.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3.5deg", "3.5deg"])

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const IconComp = card.icon

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onToggle}
      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-2xl w-full ${
        isOpen
          ? "bg-white/95 dark:bg-neutral-950/95 border-slate-300 dark:border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.08),0_0_30px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.08)] z-30 ring-1 ring-slate-300 dark:ring-white/20"
          : "bg-slate-100/80 dark:bg-neutral-950/60 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 shadow-sm dark:shadow-lg z-10 opacity-95 hover:opacity-100"
      } ${colSpan}`}
      style={{
        rotateX: isOpen ? rotateX : 0,
        rotateY: isOpen ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08), transparent 60%)`,
        }}
      />

      {/* Top Ambient Horizon Shimmer Line when Open */}
      {isOpen && (
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-slate-400 dark:via-white/70 to-transparent" />
      )}

      {/* Background Watermark Number Index */}
      <span className="absolute -right-2 -bottom-4 text-7xl sm:text-8xl font-mono font-black text-slate-900/[0.04] dark:text-white/[0.025] pointer-events-none select-none tracking-tighter">
        {card.numIndex}
      </span>

      {/* Main Card Face */}
      <div className="p-4 sm:p-5 relative z-10 flex flex-col justify-between">
        
        {/* Row 1: Index Badge + Category + 3D Icon */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs sm:text-sm font-mono font-extrabold px-3 py-1 rounded-lg tracking-wider transition-colors ${
                isOpen ? "bg-slate-900 text-white dark:bg-white dark:text-black shadow-md" : "bg-slate-200 text-slate-800 dark:bg-white/10 dark:text-white"
              }`}
            >
              {card.numIndex}
            </span>
            <span className="text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-neutral-200 uppercase truncate">
              {card.badge}
            </span>
          </div>

          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              isOpen
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-black dark:border-white shadow-sm"
                : "bg-slate-200 text-slate-800 border-slate-300 dark:bg-white/10 dark:text-white dark:border-white/20 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black"
            }`}
          >
            <IconComp className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Row 2: Title & Subtitle */}
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-snug">
            {card.title}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-neutral-300 line-clamp-1 mt-1 font-medium">
            {card.subtitle}
          </p>
        </div>

        {/* Default Idle State Footer Cue (When closed) */}
        {!isOpen && (
          <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-neutral-500 group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors" />
              <span className="font-semibold text-slate-700 dark:text-neutral-300">CLICK TO EXPAND</span>
            </div>
            <span className="text-slate-700 dark:text-neutral-300 font-semibold">{card.skills.length} Skills</span>
          </div>
        )}

        {/* POP-UP SKILLS DRAWER (Frozen open until user hovers/clicks another card) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="overflow-hidden pt-3.5 border-t border-slate-200 dark:border-white/20"
            >
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-200 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                  <span>CORE SKILLS & TECHNOLOGIES</span>
                </span>
                <span className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
                  Click to collapse ✕
                </span>
              </div>

              {/* Clean Skill Items without percentages */}
              <div className="space-y-2 mb-3.5">
                {card.skills.map((skill: any, sIdx: number) => (
                  <div
                    key={sIdx}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-white flex-shrink-0" />
                      <span className="text-sm sm:text-base font-mono text-slate-800 dark:text-neutral-100 font-medium">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights preview */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/15 space-y-2">
                {card.highlights.slice(0, 2).map((h: string, hIdx: number) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-neutral-200 font-normal leading-relaxed">
                    <span className="text-slate-900 dark:text-white font-bold mt-0.5">•</span>
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>

              {/* Click to inspect tip */}
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenModal()
                }}
                className="mt-3.5 pt-2.5 border-t border-slate-200 dark:border-white/15 flex items-center justify-between text-xs font-mono text-slate-700 hover:text-slate-900 dark:text-neutral-300 dark:hover:text-white font-semibold transition-colors cursor-pointer"
              >
                <span>CLICK FOR FULL OVERVIEW</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}

export default function SkillsExpertise() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.12 })
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "fullstack" | "languages" | "infra" | "cloud" | "design">("all")
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  
  // Single active card state: clicking opens it and closes any other open card
  const [activeCardId, setActiveCardId] = useState<string | null>("ai-ml")

  const handleCardClick = (cardId: string) => {
    setActiveCardId((prev) => (prev === cardId ? null : cardId))
  }

  // 100% Real Skills from User's Resume (Clean content with zero percentages)
  const skillCategories = [
    {
      id: "ai-ml",
      numIndex: "01",
      title: "Data Science & AI/ML",
      subtitle: "TensorFlow • PyTorch • Scikit-Learn • Keras • Pandas • NumPy • Matplotlib • NLP",
      category: "ai",
      badge: "DATA SCIENCE & AI",
      icon: Database,
      colSpan: "md:col-span-2 lg:col-span-2",
      description:
        "Analyzing complex datasets, engineering predictive neural networks, exploratory data analysis, and deploying high-precision machine learning models.",
      skills: [
        { name: "TensorFlow & PyTorch (Deep Learning)" },
        { name: "Scikit-Learn & Keras (Predictive Modeling)" },
        { name: "Pandas & NumPy (Data Pipelines)" },
        { name: "Exploratory Data Analysis (EDA) & Matplotlib" },
        { name: "Natural Language Processing (NLP) & Neural Networks" },
      ],
      highlights: [
        "Deep Learning & Neural Network modeling with TensorFlow & PyTorch",
        "End-to-end Machine Learning pipelines with Scikit-Learn & Keras",
        "Statistical analysis, predictive analytics & data visualization",
      ],
    },
    {
      id: "fullstack",
      numIndex: "02",
      title: "Full-Stack Development",
      subtitle: "MERN Stack • MongoDB • Express • React • Node • REST APIs",
      category: "fullstack",
      badge: "WEB & ENGINE",
      icon: Code2,
      colSpan: "md:col-span-1 lg:col-span-1",
      description:
        "Building scalable full-stack applications using MongoDB, Express.js, React.js, Node.js, RESTful API integration, and secure user authentication.",
      skills: [
        { name: "MERN Stack (MongoDB, Express, React, Node)" },
        { name: "REST APIs & API Integration" },
        { name: "Authentication & Authorization (JWT)" },
        { name: "Next.js & Frontend State Management" },
      ],
      highlights: [
        "End-to-end web architecture & API design",
        "Secure user authentication (JWT, OAuth, Session Management)",
        "High-performance frontend component engineering",
      ],
    },
    {
      id: "languages",
      numIndex: "03",
      title: "Programming Languages & Algorithms",
      subtitle: "Python • C++ • SQL • JavaScript • TypeScript • HTML • CSS",
      category: "languages",
      badge: "CORE CODE & DSA",
      icon: Terminal,
      colSpan: "md:col-span-1 lg:col-span-1",
      description:
        "Proficient in data structures, algorithms, object-oriented programming (OOP), system design, and database architecture across multiple programming languages.",
      skills: [
        { name: "Python (Data Science, ML & Backend)" },
        { name: "C++ (DSA & Algorithmic Problem Solving)" },
        { name: "SQL (Database Design, Joins & Queries)" },
        { name: "JavaScript & TypeScript (Full-Stack)" },
        { name: "HTML5 & CSS3 (Responsive UI)" },
      ],
      highlights: [
        "Data Structures, Algorithms & Object-Oriented Programming (OOP)",
        "System Design, Software Engineering principles & optimization",
        "Relational database management & complex schema query tuning",
      ],
    },
    {
      id: "infra",
      numIndex: "04",
      title: "Infrastructure & Operations",
      subtitle: "ServiceNow • Infrastructure Monitoring • Incident SLA",
      category: "infra",
      badge: "ENTERPRISE",
      icon: Server,
      colSpan: "md:col-span-2 lg:col-span-2",
      description:
        "Supporting critical data center infrastructure, ITSM operations using ServiceNow, incident tracking, asset management, and SLA compliance.",
      skills: [
        { name: "ServiceNow & ITSM Operations" },
        { name: "Infrastructure Monitoring" },
        { name: "Asset & SLA Incident Management" },
      ],
      highlights: [
        "Data center operations monitoring in high-availability banking environments",
        "Incident lifecycle tracking & SLA compliance enforcement",
        "Asset management & IT governance documentation",
      ],
    },
    {
      id: "cloud-tools",
      numIndex: "05",
      title: "Cloud, DevOps & Engineering Tools",
      subtitle: "AWS (EC2, S3, IAM) • Git • GitHub • Postman • Power BI • Agile • Scrum",
      category: "cloud",
      badge: "CLOUD & DEVOPS",
      icon: Cpu,
      colSpan: "md:col-span-2 lg:col-span-2",
      description:
        "Deploying cloud workloads on AWS, version control with Git/GitHub, analytics dashboards with Power BI, and automated API testing with Postman in Agile sprints.",
      skills: [
        { name: "AWS (Amazon Web Services, EC2, S3, IAM)" },
        { name: "Git & GitHub Version Control" },
        { name: "Postman API Testing & Collection Suites" },
        { name: "Power BI & Jupyter Notebook Analytics" },
        { name: "Agile Methodology & Scrum Sprints" },
      ],
      highlights: [
        "Amazon Web Services (AWS EC2, S3, IAM) cloud administration",
        "Version control, collaborative code reviews & release management in Git",
        "Data visualization in Power BI & Agile development lifecycle execution",
      ],
    },
    {
      id: "uiux-design",
      numIndex: "06",
      title: "UI/UX & Product Design",
      subtitle: "Figma • Wireframing • User Research • Prototyping",
      category: "design",
      badge: "DESIGN",
      icon: Palette,
      colSpan: "md:col-span-1 lg:col-span-1",
      description:
        "Crafting intuitive user interfaces, wireframes, high-fidelity Figma prototypes, customer journey mapping, and user research.",
      skills: [
        { name: "Figma & Wireframing" },
        { name: "Interactive Prototyping" },
        { name: "User Research & Journey Mapping" },
        { name: "Design Systems & Visual Design" },
      ],
      highlights: [
        "Human-centric UI/UX design systems and component libraries",
        "Clickable Figma interactive prototypes for desktop & mobile",
        "Design thinking, accessibility & responsive design standards",
      ],
    },
  ]

  const filteredCards =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((card) => card.category === activeTab)

  // When filtering tabs, ensure the active card belongs to the visible set
  useEffect(() => {
    if (filteredCards.length > 0 && !filteredCards.some((c) => c.id === activeCardId)) {
      setActiveCardId(filteredCards[0].id)
    }
  }, [activeTab, filteredCards, activeCardId])

  const selectedCard = skillCategories.find((c) => c.id === selectedCardId)

  return (
    <section
      ref={containerRef}
      className="py-10 sm:py-14 relative flex flex-col items-center justify-center bg-transparent dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden w-full select-none"
    >
      {/* Dark Cosmic Vignette Overlay & Matrix Dot Grid */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:32px_32px] opacity-35 dark:opacity-100 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[400px] bg-slate-200/50 dark:bg-white/[0.015] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* FULL PAGE WIDTH WRAPPER (Edge-to-edge padding) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        
        {/* ===================================================================== */}
        {/* COMPACT SECTION HEADER                                                */}
        {/* ===================================================================== */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10 mb-6"
          initial={{ opacity: 0, y: -15 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif uppercase">
                SKILLS & EXPERTISE
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-start sm:justify-center gap-2.5 mb-7 overflow-x-auto pb-2 scrollbar-none relative z-10">
          {[
            { id: "all", label: "All Skills" },
            { id: "ai", label: "Data Science & AI" },
            { id: "fullstack", label: "Full-Stack MERN" },
            { id: "languages", label: "Languages" },
            { id: "infra", label: "ITSM Ops" },
            { id: "cloud", label: "Cloud & Tools" },
            { id: "design", label: "UI/UX Design" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? "text-white dark:text-black font-bold"
                    : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/80 dark:bg-white/[0.05] border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="skillsActiveTabIndicator"
                    className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* 3D Gyroscope Grid with Click-to-Open Accordion */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 w-full items-start"
          style={{ perspective: 1600 }}
        >
          {filteredCards.map((card) => (
            <AsymmetricSkillCard
              key={card.id}
              card={card}
              isOpen={activeCardId === card.id}
              onToggle={() => handleCardClick(card.id)}
              onOpenModal={() => {
                setSelectedCardId(card.id)
              }}
              colSpan={activeTab === "all" ? card.colSpan : "col-span-1"}
            />
          ))}
        </div>

        {/* Interactive Full Inspection Overlay Modal */}
        <AnimatePresence>
          {selectedCardId && selectedCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCardId(null)}
                className="absolute inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-2xl cursor-pointer"
              />

              {/* Expanded Card Modal */}
              <motion.div
                layoutId={`card-${selectedCard.id}`}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-slate-300 dark:border-white/25 rounded-3xl p-6 sm:p-9 shadow-[0_25px_90px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_90px_rgba(0,0,0,0.9),0_0_60px_rgba(255,255,255,0.1)] z-10 overflow-hidden max-h-[88vh] overflow-y-auto"
              >
                {/* Top Glowing Horizon Filament */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-400 dark:via-white/50 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCardId(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer z-20 shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Section */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <motion.div
                    layoutId={`icon-${selectedCard.id}`}
                    className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 p-0.5 shadow-md flex-shrink-0 flex items-center justify-center text-slate-900 dark:text-white"
                  >
                    {<selectedCard.icon className="w-7 h-7" />}
                  </motion.div>

                  <div>
                    <span className="text-xs sm:text-sm font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-neutral-200 uppercase mb-2 inline-block">
                      {selectedCard.badge}
                    </span>
                    <motion.h3
                      layoutId={`title-${selectedCard.id}`}
                      className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans mb-1.5"
                    >
                      {selectedCard.title}
                    </motion.h3>
                    <p className="text-sm sm:text-base font-mono text-slate-600 dark:text-neutral-300">{selectedCard.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-700 dark:text-neutral-200 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-normal border-b border-slate-200 dark:border-white/15 pb-5">
                  {selectedCard.description}
                </p>

                {/* Clean Skills Section without percentages */}
                <div className="mb-6">
                  <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200 mb-3.5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-slate-900 dark:text-white" />
                    <span>Core Skills & Competencies</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCard.skills.map((skill: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/15 text-sm sm:text-base font-mono text-slate-800 dark:text-neutral-100 shadow-sm"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-white flex-shrink-0" />
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-5 border-t border-slate-200 dark:border-white/15">
                  <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-neutral-200 mb-3.5 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-slate-900 dark:text-white" />
                    <span>Key Highlights & Practice</span>
                  </h4>
                  <ul className="space-y-3">
                    {selectedCard.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-neutral-100 leading-relaxed font-normal">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-white flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
