"use client"

import {
  Building2,
  Calendar,
  Briefcase,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Server,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  FileText,
  Activity,
  Terminal,
  Maximize2,
  SlidersHorizontal,
  ChevronRight,
  Radio,
  Layers,
  Clock,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function WorkExperience() {
  const [activeId, setActiveId] = useState<string>("01")
  const [activeTab, setActiveTab] = useState<"deliverables" | "telemetry">("deliverables")

  const experiences = [
    {
      id: "01",
      code: "HDFC",
      year: "2025",
      period: "JUL 2025 - DEC 2025",
      company: "HDFC Bank Data Center",
      shortCompany: "HDFC Bank",
      role: "Data Center Operations Specialist",
      category: "ENTERPRISE INFRASTRUCTURE",
      badge: "High Availability SLA",
      status: "PRODUCTION RUN",
      summary:
        "Engineered zero-downtime reliability for India's premier private bank, monitoring critical core data center server & network infrastructure and executing enterprise ServiceNow ITSM workflows under strict financial SLAs.",
      metrics: [
        { label: "SLA Uptime", value: "99.9%", desc: "Financial Incident Standard", icon: ShieldCheck },
        { label: "ITSM Ops", value: "Ops Triage", desc: "Priority Ticket Lifecycle", icon: Server },
        { label: "Watchdog", value: "24/7 Run", desc: "Zero-Downtime Monitoring", icon: Activity },
      ],
      achievements: [
        "Monitored critical banking server and network infrastructure under stringent SLA compliance guidelines.",
        "Managed incident tracking, priority triaging, and end-to-end ServiceNow ticket lifecycle workflows.",
        "Assisted in physical & logical asset audits and compliance documentation for continuous operations.",
        "Collaborated with senior sysadmins to document operational SOPs and incident escalation runbooks.",
      ],
      tags: ["Data Center Ops", "ServiceNow", "ITSM", "SLA Monitoring", "Compliance SOPs"],
      accentWatermark: "HDFC",
    },
    {
      id: "02",
      code: "ZINQ",
      year: "2024",
      period: "APR 2024",
      company: "Zinq Technologies",
      shortCompany: "Zinq Tech",
      role: "Corporate AI Trainer & Enablement Lead",
      category: "ARTIFICIAL INTELLIGENCE",
      badge: "GenAI Enablement",
      status: "AI ENABLEMENT",
      summary:
        "Architected and delivered hands-on corporate Generative AI enablement sessions for enterprise employees, focusing on custom prompt engineering, creative workflow automation, and accelerating pitch-deck design pipelines.",
      metrics: [
        { label: "Staff Trained", value: "30+", desc: "Cross-Functional Teams", icon: Users },
        { label: "Velocity Gain", value: "+25%", desc: "Turnaround Acceleration", icon: TrendingUp },
        { label: "Prompt Pipeline", value: "100%", desc: "GenAI Workflow Adoption", icon: Sparkles },
      ],
      achievements: [
        "Trained 30+ enterprise employees on Generative AI tooling, prompt engineering, and daily workflow integration.",
        "Accelerated team presentation turnaround speed by 25% through customized prompt engineering frameworks.",
        "Engineered reusable AI prompt libraries and guidelines for corporate presentations and pitch-deck creation.",
        "Facilitated interactive workshop exercises empowering staff to eliminate manual design bottlenecks.",
      ],
      tags: ["Generative AI", "Prompt Engineering", "Workflow Automation", "Corporate Training"],
      accentWatermark: "ZINQ",
    },
    {
      id: "03",
      code: "LETS",
      year: "2023 - 2024",
      period: "DEC 2023 - JAN 2024",
      company: "LetsUpgrade",
      shortCompany: "LetsUpgrade",
      role: "Software Development & Engineering Intern",
      category: "FRONTEND SYSTEMS",
      badge: "UX Revamp & Outreach",
      status: "CORE REFACTOR",
      summary:
        "Spearheaded official platform frontend redesign and UX optimization with responsive, high-performance web components and digital outreach strategies to expand learner engagement and brand reach.",
      metrics: [
        { label: "Traffic Surge", value: "+40%", desc: "Measured Post-Launch Growth", icon: TrendingUp },
        { label: "Device Fidelity", value: "100%", desc: "Responsive Multi-Device", icon: Cpu },
        { label: "Engagement", value: "2.5x", desc: "Interactive UI Retention", icon: Users },
      ],
      achievements: [
        "Increased official website traffic by 40% through modern UI/UX architectural revamps and performance tuning.",
        "Engineered responsive, accessible component layouts maintaining pixel-perfect fidelity across mobile and desktop.",
        "Built interactive dynamic elements that measurably boosted on-page user session duration and engagement.",
        "Collaborated with product and marketing teams to formulate community digital outreach strategies.",
      ],
      tags: ["UI/UX Architecture", "Frontend Engineering", "Responsive Systems", "Web Performance"],
      accentWatermark: "LETS",
    },
  ]

  const activeExp = experiences.find((e) => e.id === activeId) || experiences[0]

  return (
    <section
      className="py-10 sm:py-12 relative flex flex-col items-center justify-center bg-transparent dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden w-full select-none"
      id="work"
    >
      {/* Background Matrix & Ambient Light */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff07_1px,transparent_1px)] [background-size:28px_28px] opacity-35 dark:opacity-100 pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[350px] bg-slate-200/50 dark:bg-white/[0.015] rounded-full blur-[150px] pointer-events-none z-0" />

      {/* FULL PAGE WIDTH WRAPPER (Edge-to-edge padding) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14 relative z-10">
        
        {/* ===================================================================== */}
        {/* COMPACT TELEMETRY HORIZON HEADER                                      */}
        {/* ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10 mb-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif uppercase">
                WORK EXPERIENCE
              </h2>
            </div>
          </div>

          {/* Quick Stage Selectors + Resume Action */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="p-1.5 rounded-xl bg-slate-200/80 dark:bg-neutral-950/90 border border-slate-300 dark:border-white/15 flex items-center gap-1.5 shadow-sm">
              {experiences.map((exp) => {
                const isCurrent = exp.id === activeId
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveId(exp.id)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isCurrent
                        ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                        : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span className="text-xs opacity-80">{exp.id}</span>
                    <span>{exp.shortCompany}</span>
                  </button>
                )
              })}
            </div>

            <a
              href="/Bhagyashree.pdf"
              download
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white/15 dark:hover:bg-white/25 border border-slate-700 dark:border-white/25 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* CREATIVE CHASSIS: FULL-WIDTH INTERACTIVE EXPANDING APERTURE BLADES    */}
        {/* Height: ~540px, 100% full screen width, buttery spring physics        */}
        {/* ===================================================================== */}
        <div className="w-full hidden md:flex flex-row gap-3 min-h-[520px] lg:h-[550px] items-stretch">
          {experiences.map((exp) => {
            const isSelected = exp.id === activeId

            return (
              <motion.div
                key={exp.id}
                layout
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                onClick={() => setActiveId(exp.id)}
                className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-colors duration-300 backdrop-blur-2xl flex flex-col justify-between ${
                  isSelected
                    ? "flex-[6] bg-white/95 dark:bg-neutral-950/95 border-slate-300 dark:border-white/35 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-slate-300 dark:ring-white/25"
                    : "flex-[1.2] bg-slate-100/90 dark:bg-neutral-950/40 border-slate-200 dark:border-white/15 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-200/80 dark:hover:bg-neutral-950/70 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Top Subtle Light Horizon Filament */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-slate-400 dark:via-white to-transparent z-20" />
                )}

                {/* =========================================================== */}
                {/* STATE A: EXPANDED STATE (Rich Telemetry & Deliverables)     */}
                {/* =========================================================== */}
                {isSelected ? (
                  <div className="p-6 lg:p-8 flex flex-col justify-between h-full relative z-10 overflow-hidden">
                    {/* Giant Faint Monolithic Watermark */}
                    <span className="absolute -right-4 -bottom-6 text-9xl lg:text-[12rem] font-mono font-black text-slate-900/[0.04] dark:text-white/[0.03] pointer-events-none select-none tracking-tighter">
                      {exp.accentWatermark}
                    </span>

                    {/* Top Row: Mission Status & Header Bar */}
                    <div>
                      <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-white/15 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-md bg-slate-900 text-white dark:bg-white dark:text-black font-mono font-extrabold text-xs sm:text-sm">
                            STAGE {exp.id}
                          </span>
                          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-600 dark:text-neutral-300 font-semibold">
                            {exp.category}
                          </span>
                          <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-neutral-500" />
                          <span className="hidden lg:inline-block text-xs sm:text-sm font-mono text-slate-600 dark:text-neutral-300 font-medium">
                            {exp.badge}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 text-xs sm:text-sm font-mono text-slate-700 dark:text-neutral-200">
                            <Calendar className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
                            <span>{exp.period}</span>
                          </div>

                          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-white/15 text-xs font-mono font-bold text-slate-900 dark:text-white border border-slate-300 dark:border-white/25">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-white animate-ping" />
                            <span>{exp.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Main Titles */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
                            {exp.company}
                          </h3>
                          <p className="text-sm sm:text-base font-mono font-semibold text-slate-700 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-2 mt-1">
                            <Building2 className="w-4 h-4 text-slate-600 dark:text-neutral-300" />
                            <span>{exp.role}</span>
                          </p>
                        </div>

                        {/* View Switcher Tabs inside the active blade */}
                        <div className="p-1 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/15 flex items-center self-start sm:self-auto gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveTab("deliverables")
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all ${
                              activeTab === "deliverables"
                                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold shadow-md"
                                : "text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            Deliverables
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveTab("telemetry")
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-all ${
                              activeTab === "telemetry"
                                ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold shadow-md"
                                : "text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                            }`}
                          >
                            Impact HUD
                          </button>
                        </div>
                      </div>

                      {/* Executive Summary */}
                      <p className="text-sm sm:text-base text-slate-700 dark:text-neutral-200 leading-relaxed font-normal mb-5">
                        {exp.summary}
                      </p>

                      {/* Dynamic Content Panel based on selected sub-tab */}
                      <AnimatePresence mode="wait">
                        {activeTab === "deliverables" ? (
                          <motion.div
                            key="tab-deliverables"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1"
                          >
                            {exp.achievements.map((ach, aIdx) => (
                              <div
                                key={aIdx}
                                className="p-3 sm:p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/15 flex items-start gap-3 hover:border-slate-300 dark:hover:border-white/30 hover:bg-white dark:hover:bg-white/[0.07] transition-all shadow-sm"
                              >
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-white flex-shrink-0 mt-0.5" />
                                <span className="text-sm sm:text-base text-slate-800 dark:text-neutral-100 leading-relaxed font-normal">
                                  {ach}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="tab-telemetry"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-3 gap-4 pt-2"
                          >
                            {exp.metrics.map((m, mIdx) => {
                              const IconComp = m.icon
                              return (
                                <div
                                  key={mIdx}
                                  className="p-5 rounded-xl bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/15 flex flex-col justify-between shadow-sm"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs sm:text-sm font-mono text-slate-600 dark:text-neutral-300 uppercase tracking-wider font-semibold">
                                      {m.label}
                                    </span>
                                    <IconComp className="w-4 h-4 text-slate-800 dark:text-white" />
                                  </div>
                                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white tracking-tight">
                                    {m.value}
                                  </div>
                                  <div className="text-xs font-mono text-slate-600 dark:text-neutral-300 mt-1 font-medium">
                                    {m.desc}
                                  </div>
                                </div>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom Telemetry Dock: Applied Stack Pills */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/15 flex items-center justify-between mt-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold mr-1">
                          STACK:
                        </span>
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/15 text-xs sm:text-sm font-mono text-slate-800 dark:text-neutral-100 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Quick Next Navigation Arrow */}
                      <div className="text-right">
                        <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                          CLICK NEIGHBORING BLADES TO SLIDE //
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* =========================================================== */
                  /* STATE B: COLLAPSED BLADE (Vertical Telemetry Pillar)       */
                  /* =========================================================== */
                  <div className="p-4 flex flex-col items-center justify-between h-full relative z-10 group/blade">
                    {/* Top Stage Marker */}
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 flex items-center justify-center font-mono text-sm font-bold text-slate-800 dark:text-neutral-200 group-hover/blade:bg-slate-900 group-hover/blade:text-white dark:group-hover/blade:bg-white dark:group-hover/blade:text-black transition-all">
                        {exp.id}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase font-semibold">
                        {exp.year.split(" ")[0]}
                      </span>
                    </div>

                    {/* Rotated Vertical Typography */}
                    <div className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180 py-4">
                      <span className="font-sans font-bold text-base sm:text-lg tracking-wide text-slate-700 dark:text-neutral-300 group-hover/blade:text-slate-900 dark:group-hover/blade:text-white transition-all whitespace-nowrap">
                        {exp.company}
                      </span>
                    </div>

                    {/* Bottom Status Dot & Expand Icon */}
                    <div className="flex flex-col items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-neutral-500 group-hover/blade:bg-slate-900 dark:group-hover/blade:bg-white transition-all" />
                      <div className="w-7 h-7 rounded-md bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-neutral-300 group-hover/blade:text-slate-900 dark:group-hover/blade:text-white group-hover/blade:border-slate-400 dark:group-hover/blade:border-white/30 transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* ===================================================================== */}
        {/* MOBILE RESPONSIVE ACCORDION VIEW (< md screens)                      */}
        {/* ===================================================================== */}
        <div className="flex md:hidden flex-col gap-3.5 w-full">
          {experiences.map((exp) => {
            const isCurrent = exp.id === activeId

            return (
              <div
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                className={`rounded-2xl border transition-all duration-300 p-4 sm:p-5 ${
                  isCurrent
                    ? "bg-white dark:bg-neutral-950 border-slate-300 dark:border-white/35 shadow-lg"
                    : "bg-slate-100/90 dark:bg-neutral-950/60 border-slate-200 dark:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-white/15 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded bg-slate-900 text-white dark:bg-white dark:text-black font-mono font-extrabold text-xs">
                      {exp.id}
                    </span>
                    <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-600 dark:text-neutral-300 font-medium">
                    {exp.period}
                  </span>
                </div>

                {isCurrent && (
                  <div className="pt-2">
                    <p className="text-sm font-mono text-slate-800 dark:text-neutral-200 font-bold uppercase mb-2">
                      {exp.role}
                    </p>
                    <p className="text-sm text-slate-700 dark:text-neutral-200 font-normal leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    <div className="space-y-2.5 mb-4">
                      {exp.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-neutral-100 font-normal leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-white flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 dark:border-white/15 mb-3">
                      {exp.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded bg-slate-50 dark:bg-white/[0.05] border border-slate-200 dark:border-white/15 text-center">
                          <div className="text-base font-bold font-mono text-slate-900 dark:text-white">{m.value}</div>
                          <div className="text-[10px] font-mono text-slate-600 dark:text-neutral-300 truncate mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-white/[0.08] border border-slate-200 dark:border-white/15 text-xs font-mono text-slate-700 dark:text-neutral-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Chronological Timeline Horizon Track (Bottom Micro-Rail) */}
        <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-neutral-400 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-white animate-pulse flex-shrink-0" />
            <span>TIMELINE: 2023 [LETSUPGRADE] ─── 2024 [ZINQ TECH] ─── 2025 [HDFC DATA CENTER]</span>
          </div>
        </div>

      </div>
    </section>
  )
}
