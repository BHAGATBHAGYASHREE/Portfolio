"use client"

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code2, Palette, Database, Cpu, Server, Terminal, Sparkles, X, CheckCircle2, ArrowRight } from "lucide-react"

// Ultra-Wide Asymmetrical 3D Gyroscope Skill Card (100% Contained, Zero Overflow!)
function AsymmetricSkillCard({
  card,
  isSelected,
  onSelect,
  colSpan,
}: {
  card: any
  isSelected: boolean
  onSelect: () => void
  colSpan: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D Gyroscope Physics
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const IconComp = card.icon

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${card.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={`bg-gray-950/90 border border-white/20 rounded-2xl py-4 px-5 sm:px-7 shadow-2xl cursor-pointer overflow-hidden group relative flex flex-col justify-between hover:border-white/60 transition-all duration-300 w-full ${colSpan}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Stardust Shimmer Accent */}
      <div className="absolute -right-16 -top-16 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:scale-125 transition-transform pointer-events-none" />

      {/* Top Badge & Icon Layer (Strictly Contained) */}
      <div
        style={{ transform: "translateZ(15px)" }}
        className="flex items-center justify-between gap-2 mb-3 relative z-10 w-full"
      >
        <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-gray-200 uppercase truncate">
          {card.badge}
        </span>

        <motion.div
          layoutId={`icon-${card.id}`}
          className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform flex-shrink-0"
        >
          <IconComp className="w-4.5 h-4.5" />
        </motion.div>
      </div>

      {/* Title & Action Layer (Flex-wrap with Zero Overflow) */}
      <div
        style={{ transform: "translateZ(20px)" }}
        className="relative z-10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 w-full"
      >
        <motion.h3
          layoutId={`title-${card.id}`}
          className="text-base sm:text-xl font-bold text-white tracking-wide font-sans leading-tight min-w-0 flex-1 break-words"
        >
          {card.title}
        </motion.h3>

        <span className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-mono font-bold tracking-wider uppercase group-hover:bg-gray-200 transition-colors flex items-center gap-1 shadow-md flex-shrink-0">
          <span>GET</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  )
}

export default function SkillsExpertise() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.15 })
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "fullstack" | "languages" | "infra" | "cloud" | "design">("all")
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  // 100% Real Skills from User's Resume
  const skillCategories = [
    {
      id: "ai-ml",
      title: "Data Science & AI/ML",
      subtitle: "Pandas • NumPy • Scikit-Learn • Data Visualization • EDA",
      category: "ai",
      badge: "DATA SCIENCE",
      icon: Database,
      colSpan: "md:col-span-2 lg:col-span-2",
      description:
        "Analyzing complex datasets, engineering predictive models, exploratory data analysis, and building intelligent data-driven solutions.",
      skills: [
        { name: "Pandas & NumPy", level: 92 },
        { name: "Scikit-Learn & ML Fundamentals", level: 88 },
        { name: "Exploratory Data Analysis (EDA)", level: 90 },
        { name: "Data Visualization & Statistics", level: 85 },
      ],
      highlights: [
        "Data wrangling, cleaning & feature engineering pipelines",
        "Statistical modeling, hypothesis testing & regression analysis",
        "Data visualization using Matplotlib, Seaborn & Power BI",
      ],
    },
    {
      id: "fullstack",
      title: "Full-Stack Development",
      subtitle: "MERN Stack • MongoDB • Express • React • Node • REST APIs",
      category: "fullstack",
      badge: "WEB & ENGINE",
      icon: Code2,
      colSpan: "md:col-span-1 lg:col-span-1",
      description:
        "Building scalable full-stack applications using MongoDB, Express.js, React.js, Node.js, RESTful API integration, and secure user authentication.",
      skills: [
        { name: "MERN Stack (MongoDB, Express, React, Node)", level: 90 },
        { name: "REST APIs & API Integration", level: 95 },
        { name: "Authentication & Authorization (JWT)", level: 88 },
        { name: "Next.js & Frontend State Management", level: 85 },
      ],
      highlights: [
        "End-to-end web architecture & API design",
        "Secure user authentication (JWT, OAuth, Session Management)",
        "High-performance frontend component engineering",
      ],
    },
    {
      id: "languages",
      title: "Programming Languages",
      subtitle: "Python • C++ • SQL",
      category: "languages",
      badge: "CORE CODE",
      icon: Terminal,
      colSpan: "md:col-span-1 lg:col-span-1",
      description:
        "Proficient in object-oriented programming, data structures, algorithm design, and database query optimization across multiple languages.",
      skills: [
        { name: "Python (Data & Backend)", level: 92 },
        { name: "C++ (DSA & Problem Solving)", level: 85 },
        { name: "SQL (Relational Queries & Schema)", level: 88 },
      ],
      highlights: [
        "Data structures and algorithmic efficiency in C++ & Python",
        "Complex SQL queries, joins, indexing & database optimization",
        "Object-Oriented Programming (OOP) design principles",
      ],
    },
    {
      id: "infra",
      title: "Infrastructure & Operations",
      subtitle: "ServiceNow • Infrastructure Monitoring • Incident SLA",
      category: "infra",
      badge: "ENTERPRISE",
      icon: Server,
      colSpan: "md:col-span-2 lg:col-span-2",
      description:
        "Supporting critical data center infrastructure, ITSM operations using ServiceNow, incident tracking, asset management, and SLA compliance.",
      skills: [
        { name: "ServiceNow & ITSM Operations", level: 90 },
        { name: "Infrastructure Monitoring", level: 88 },
        { name: "Asset & SLA Incident Management", level: 92 },
      ],
      highlights: [
        "Data center operations monitoring in high-availability banking environments",
        "Incident lifecycle tracking & SLA compliance enforcement",
        "Asset management & IT governance documentation",
      ],
    },
    {
      id: "cloud-tools",
      title: "Cloud & Developer Tools",
      subtitle: "AWS (EC2, S3, VPC) • Git • Power BI • Postman",
      category: "cloud",
      badge: "CLOUD & DEVOPS",
      icon: Cpu,
      colSpan: "md:col-span-2 lg:col-span-2",
      description:
        "Deploying cloud workloads on AWS, version control with Git/GitHub, analytics dashboards with Power BI, and API testing with Postman.",
      skills: [
        { name: "AWS (EC2, VPC, S3, IAM)", level: 85 },
        { name: "Git & GitHub Version Control", level: 95 },
        { name: "Power BI & Jupyter Notebook", level: 88 },
        { name: "Postman & VS Code Environment", level: 92 },
      ],
      highlights: [
        "Amazon Web Services virtual cloud infrastructure setup",
        "API endpoint testing, collection mocking & documentation in Postman",
        "Interactive analytics dashboard creation in Power BI",
      ],
    },
    {
      id: "uiux-design",
      title: "UI/UX & Product Design",
      subtitle: "Figma • Wireframing • User Research • Prototyping",
      category: "design",
      badge: "DESIGN",
      icon: Palette,
      colSpan: "md:col-span-1 lg:col-span-1",
      description:
        "Crafting intuitive user interfaces, wireframes, high-fidelity Figma prototypes, customer journey mapping, and user research.",
      skills: [
        { name: "Figma & Wireframing", level: 94 },
        { name: "Interactive Prototyping", level: 90 },
        { name: "User Research & Journey Mapping", level: 86 },
        { name: "Design Systems & Visual Design", level: 90 },
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

  const selectedCard = skillCategories.find((c) => c.id === selectedCardId)

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-24 relative flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      id="skills"
    >
      {/* Dark Vignette Overlay & Matrix Dot Grid */}
      <div className="absolute inset-0 bg-radial-vignette opacity-85 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0" />

      {/* Ultra-Wide Full Horizontal Container with Perfect Padding */}
      <div className="container mx-auto px-4 sm:px-10 max-w-[1500px] relative z-10 w-full">
        {/* Section Heading */}
        <motion.div
          className="flex flex-col items-center mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-mono uppercase tracking-widest text-gray-300 mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Capabilities & Technical Stack</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-serif uppercase drop-shadow-2xl mb-2">
            SKILLS & EXPERTISE
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2.5 mb-10 flex-wrap relative z-10">
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
                className={`relative px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected ? "text-black font-bold" : "text-gray-300 hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="appStoreTabPerfectContain"
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Asymmetrical 3D Gyroscope Grid Layout (100% Contained & Properly Aligned!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 w-full" style={{ perspective: 1400 }}>
          {filteredCards.map((card) => (
            <AsymmetricSkillCard
              key={card.id}
              card={card}
              colSpan={activeTab === "all" ? card.colSpan : "col-span-1"}
              isSelected={selectedCardId === card.id}
              onSelect={() => setSelectedCardId(card.id)}
            />
          ))}
        </div>

        {/* iOS App Store Full Overlay Modal with Motion AnimatePresence & layoutId */}
        <AnimatePresence>
          {selectedCardId && selectedCard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCardId(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-2xl cursor-pointer"
              />

              {/* Expanded Card Modal */}
              <motion.div
                layoutId={`card-${selectedCard.id}`}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-xl bg-gray-950 border border-white/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_90px_rgba(255,255,255,0.18)] z-10 overflow-hidden max-h-[85vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCardId(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer z-20 shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Section */}
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <motion.div
                    layoutId={`icon-${selectedCard.id}`}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/30 via-white/15 to-transparent p-0.5 shadow-xl flex-shrink-0"
                  >
                    <div className="w-full h-full bg-gray-950 rounded-xl flex items-center justify-center border border-white/20">
                      {<selectedCard.icon className="w-7 h-7 text-white" />}
                    </div>
                  </motion.div>

                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-gray-300 uppercase mb-1.5 inline-block">
                      {selectedCard.badge}
                    </span>
                    <motion.h3
                      layoutId={`title-${selectedCard.id}`}
                      className="text-xl sm:text-3xl font-extrabold text-white tracking-wide font-sans mb-1"
                    >
                      {selectedCard.title}
                    </motion.h3>
                    <p className="text-xs font-mono text-gray-400">{selectedCard.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light border-b border-white/10 pb-4">
                  {selectedCard.description}
                </p>

                {/* Skill Level Progress Bars */}
                <div className="mb-6">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 mb-3">
                    Proficiency Metrics
                  </h4>
                  <div className="space-y-3">
                    {selectedCard.skills.map((skill, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-gray-200 font-mono">{skill.name}</span>
                          <span className="text-xs font-bold text-gray-400 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/15">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="h-full bg-gradient-to-r from-gray-400 via-gray-200 to-white rounded-full shadow-md"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 mb-2.5">
                    Key Highlights & Practice
                  </h4>
                  <ul className="space-y-2">
                    {selectedCard.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
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
