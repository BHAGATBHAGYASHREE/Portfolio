"use client"

import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion"
import { useRef, useState } from "react"
import { Sparkles, Terminal, FileCode, Folder, ChevronRight, ChevronDown, MessageSquare, Bot, ArrowRight, CornerDownLeft, Sparkle, GitBranch, Bell, Check } from "lucide-react"

export default function AboutPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isSectionInView = useInView(containerRef, { once: false, amount: 0.15 })

  // Softened 3D Gyroscope Physics for optimal reading angle
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 180 })
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 180 })

  // Flatter, clearer viewing angle so text is directly facing the user
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-4deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

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

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-16 sm:py-24 relative flex flex-col items-center justify-center bg-transparent dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden w-full"
      id="about-me"
    >
      {/* Background Radial Vignette & Grid */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#888_1px,transparent_1px)] dark:bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none z-0" />

      {/* Ambient Stardust Light Orb behind laptop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-white/5 dark:bg-white/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* FULL PAGE WIDTH WRAPPER (Edge-to-edge padding matching Work Experience) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14 relative z-10">
        {/* Section Heading matching Work Experience on the extreme left-hand side */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/10 mb-8 w-full text-left"
          initial={{ opacity: 0, y: -15 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif uppercase">
                ABOUT ME
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-slate-600 dark:text-slate-400 uppercase font-bold mt-1">
              A GLIMPSE INTO MY WORLD
            </p>
          </div>
        </motion.div>

        {/* 3D Laptop / Tablet Perspective Stage */}
        <div className="w-full flex justify-center" style={{ perspective: 1600 }}>
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={isSectionInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-6xl rounded-[24px] sm:rounded-[36px] p-2 sm:p-3.5 bg-[#18181b] border-2 sm:border-4 border-[#3f3f46] shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(255,255,255,0.15)] transition-shadow duration-500"
          >
            {/* Top Camera Dot */}
            <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#09090b] border border-[#52525b] z-30" />

            {/* Laptop Screen Content (Crisp High-Contrast VS Code Replica) */}
            <div className="w-full rounded-[18px] sm:rounded-[26px] bg-[#1e1e1e] text-[#f1f5f9] font-mono text-sm overflow-hidden border border-[#333338] flex flex-col shadow-2xl select-none">
              
              {/* VS Code Titlebar */}
              <div className="h-9 sm:h-10 bg-[#2d2d30] text-[#e2e8f0] px-3 sm:px-4 flex items-center justify-between text-xs sm:text-sm border-b border-[#333338] select-none font-medium">
                {/* Menu items */}
                <div className="flex items-center gap-2.5 sm:gap-4 overflow-hidden">
                  <span className="w-3 h-3 rounded-full bg-white/80 inline-block shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  <span className="hidden sm:inline font-sans text-slate-200">File</span>
                  <span className="hidden sm:inline font-sans text-slate-200">Edit</span>
                  <span className="hidden sm:inline font-sans text-slate-200">Selection</span>
                  <span className="hidden sm:inline font-sans text-slate-200">View</span>
                  <span className="hidden sm:inline font-sans text-slate-200">Go</span>
                  <span className="hidden sm:inline font-sans text-slate-200">Run</span>
                  <span className="hidden sm:inline font-sans text-slate-200">Terminal</span>
                  <span className="hidden sm:inline font-sans text-slate-200">Help</span>
                </div>

                {/* Window Title */}
                <div className="text-xs text-slate-300 font-sans font-semibold truncate px-2">
                  About.tsx - portfolio-v2 - Bhagyashree - Visual Studio Code
                </div>

                {/* Window Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-slate-300 text-sm hidden sm:inline cursor-pointer">-</span>
                  <span className="text-slate-300 text-sm hidden sm:inline cursor-pointer">□</span>
                  <span className="text-slate-300 text-sm cursor-pointer hover:text-white">✕</span>
                </div>
              </div>

              {/* Breadcrumb Bar */}
              <div className="h-7 sm:h-8 bg-[#252528] text-slate-300 text-xs px-4 flex items-center justify-between border-b border-[#333338] font-medium">
                <div className="flex items-center gap-1.5">
                  <span>src</span>
                  <span className="text-slate-500">&gt;</span>
                  <span>sections</span>
                  <span className="text-slate-500">&gt;</span>
                  <span className="text-white font-semibold">About.tsx</span>
                  <span className="text-slate-500">&gt;</span>
                  <span className="text-slate-300 font-semibold">[o] AboutSection</span>
                </div>
                <span className="hidden md:inline text-slate-400 text-xs">
                  You, 20 seconds ago | 2 authors (You and one other)
                </span>
              </div>

              {/* Main IDE Body (Explorer Sidebar + Code Editor + AI Copilot Chat Panel) */}
              <div className="flex h-[380px] xs:h-[440px] sm:h-[520px] md:h-[580px] overflow-hidden">
                             {/* Left Sidebar: Slim Explorer */}
                <div className="w-36 sm:w-40 lg:w-44 bg-[#252526] border-r border-[#333338] flex-col hidden lg:flex flex-shrink-0 text-xs text-slate-200 select-none">
                  <div className="px-3 py-2 text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between border-b border-[#333338]">
                    <span>EXPLORER</span>
                    <span>...</span>
                  </div>

                  <div className="p-2 space-y-1.5 overflow-y-auto">
                    {/* OPEN EDITORS */}
                    <div className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
                      <ChevronDown className="w-3 h-3" />
                      <span>OPEN EDITORS</span>
                    </div>
                    <div className="pl-3 py-1 flex items-center gap-1.5 bg-[#37373d] text-white rounded px-2 font-medium">
                      <span className="text-slate-300">✕</span>
                      <span className="truncate">About.tsx</span>
                    </div>

                    {/* FOLDER TREE */}
                    <div className="pt-2 text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1">
                      <ChevronDown className="w-3 h-3" />
                      <span>PORTFOLIO-V2</span>
                    </div>

                    <div className="pl-2.5 space-y-1 text-slate-300 text-[11px]">
                      <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <span>.next</span>
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-white cursor-pointer py-0.5">
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                        <span>public</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white py-0.5 font-semibold">
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                        <span className="text-white">src</span>
                      </div>
                      <div className="pl-2.5 space-y-1">
                        <div className="flex items-center gap-1.5 py-0.5 text-slate-200">
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                          <span>app</span>
                        </div>
                        <div className="flex items-center gap-1.5 py-0.5 text-slate-200">
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                          <span>components</span>
                        </div>
                        <div className="flex items-center gap-1.5 py-0.5 text-white font-semibold">
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                          <span className="text-white">sections</span>
                        </div>
                        <div className="pl-3 space-y-0.5 text-[11px]">
                          <div className="text-white font-bold bg-[#37373d] px-1.5 py-0.5 rounded flex items-center gap-1 truncate">
                            <span>About.tsx</span>
                          </div>
                          <div className="text-slate-300 truncate">Experience.tsx</div>
                          <div className="text-slate-300 truncate">Projects.tsx</div>
                          <div className="text-slate-300 truncate">Skills.tsx</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: Code Editor Area (MAXIMIZED WIDTH for About.tsx) */}
                <div className="flex-1 bg-[#1e1e1e] flex flex-col overflow-hidden">
                  {/* File Tabs */}
                  <div className="flex items-center bg-[#252528] text-slate-300 border-b border-[#333338] overflow-x-auto text-xs font-medium">
                    <div className="px-5 py-2 bg-[#1e1e1e] text-white border-t-2 border-white flex items-center gap-2 font-semibold">
                      <span className="text-white text-sm">⚛</span>
                      <span>About.tsx</span>
                      <span className="text-slate-400 text-xs ml-3 hover:text-white cursor-pointer">✕</span>
                    </div>
                  </div>

                  {/* Code Line Content - Expansive, Super Readable, High-Impact Bio */}
                  <div className="p-3.5 sm:p-7 overflow-y-auto flex-1 font-mono text-xs sm:text-base md:text-[16.5px] leading-relaxed sm:leading-loose text-slate-100 antialiased font-normal">
                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">1</span>
                      <span className="text-[#c586c0] font-semibold">export const</span>&nbsp;
                      <span className="text-[#dcdcaa] font-bold">AboutSection</span> = () =&gt; &#123;
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">2</span>
                      <span className="pl-4 text-[#c586c0] font-semibold">return</span> (
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">3</span>
                      <span className="pl-8 text-slate-300">&lt;</span>
                      <span className="text-[#4ec9b0] font-semibold">section</span>&nbsp;
                      <span className="text-[#9cdcfe]">className</span>=
                      <span className="text-[#ce9178]">"flex items-center justify-center w-full py-24"</span>&nbsp;
                      <span className="text-[#9cdcfe]">id</span>=
                      <span className="text-[#ce9178]">"about"</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">4</span>
                      <span className="pl-4 sm:pl-12 text-slate-300">&lt;</span>
                      <span className="text-[#4ec9b0] font-semibold">div</span>&nbsp;
                      <span className="text-[#9cdcfe]">className</span>=
                      <span className="text-[#ce9178]">"max-w-4xl px-6 flex flex-col items-center justify-center w-full"</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">5</span>
                      <span className="pl-6 sm:pl-16 text-slate-300">&lt;</span>
                      <span className="text-[#4ec9b0] font-semibold">h1</span>&nbsp;
                      <span className="text-[#9cdcfe]">className</span>=
                      <span className="text-[#ce9178]">"text-4xl font-semibold text-white font-serif text-center"</span>
                      <span className="text-slate-300">&gt;</span>
                      <span className="text-white font-serif font-bold">About me</span>
                      <span className="text-slate-300">&lt;/</span>
                      <span className="text-[#4ec9b0] font-semibold">h1</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">6</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">7</span>
                      <span className="pl-6 sm:pl-16 text-slate-300">&lt;</span>
                      <span className="text-[#4ec9b0] font-semibold">p</span>&nbsp;
                      <span className="text-[#9cdcfe]">className</span>=
                      <span className="text-[#ce9178]">"text-center mt-4 text-white/90 md:text-lg"</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">8</span>
                      <span className="pl-8 sm:pl-20 text-white font-normal leading-relaxed">
                        Hey there! I'm <strong className="text-white font-bold bg-white/10 px-1.5 py-0.5 rounded border border-white/20">Bhagyashree Bhagat</strong>, a passionate Data Science Student, AI/ML Engineer & Full-Stack Developer based in Navi Mumbai.
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">9</span>
                      <span className="pl-8 sm:pl-20 text-slate-100 font-normal leading-relaxed">
                        Currently pursuing B.Tech in Computer Science at ITM Skills University (2023–2027), I engineer scalable web apps and predictive AI systems with modern tech stacks.
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">10</span>
                      <span className="pl-8 sm:pl-20 text-slate-100 font-normal leading-relaxed">
                        My skill set spans from crafting intuitive reactive user interfaces with React , to building efficient backends with Node.js, Express & MongoDB, to predictive ML modeling in Python.
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">11</span>
                      <span className="pl-6 sm:pl-16 text-slate-300">&lt;/</span>
                      <span className="text-[#4ec9b0] font-semibold">p</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">12</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">13</span>
                      <span className="pl-6 sm:pl-16 text-slate-300">&lt;</span>
                      <span className="text-[#4ec9b0] font-semibold">p</span>&nbsp;
                      <span className="text-[#9cdcfe]">className</span>=
                      <span className="text-[#ce9178]">"text-center mt-4 text-white/90 md:text-lg"</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">14</span>
                      <span className="pl-8 sm:pl-20 text-slate-100 font-normal leading-relaxed">
                        From supporting enterprise data center operations at HDFC Bank using ServiceNow to corporate AI enablement at Zinq Technologies, I love connecting technology with real-world impact.
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">15</span>
                      <span className="pl-8 sm:pl-20 text-slate-100 font-normal leading-relaxed">
                        Whether optimizing end-to-end data pipelines, training ML algorithms, or building modern responsive software, I solve real-world problems through intelligent code.
                      </span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">16</span>
                      <span className="pl-6 sm:pl-16 text-slate-300">&lt;/</span>
                      <span className="text-[#4ec9b0] font-semibold">p</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">17</span>
                      <span className="pl-4 sm:pl-12 text-slate-300">&lt;/</span>
                      <span className="text-[#4ec9b0]">div</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">18</span>
                      <span className="pl-8 text-slate-300">&lt;/</span>
                      <span className="text-[#4ec9b0]">section</span>
                      <span className="text-slate-300">&gt;</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">19</span>
                      <span className="pl-4">)</span>
                    </div>

                    <div className="flex items-start">
                      <span className="w-8 sm:w-10 text-slate-500 font-semibold select-none text-right pr-3 sm:pr-4">20</span>
                      <span>&#125;</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Sleek, Low-Weight AI Chat Panel (Maximizes space for About.tsx) */}
                <div className="w-44 sm:w-48 bg-[#18181b] border-l border-[#333338] hidden md:flex flex-col justify-between p-3 flex-shrink-0 text-slate-200">
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#333338] text-[11px] text-slate-300 font-bold tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                      <span>AGENT</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <span className="cursor-pointer hover:text-white text-xs">...</span>
                      <span className="cursor-pointer hover:text-white text-xs">✕</span>
                    </div>
                  </div>

                  {/* Chat Center Compact Graphic */}
                  <div className="flex flex-col items-center text-center my-auto space-y-2 px-1">
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                      <Bot className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-bold text-white font-sans">Build with Agent</h4>
                    <p className="text-[10px] text-slate-400 leading-snug font-sans">
                      AI context synced with About.tsx
                    </p>
                  </div>

                  {/* Chat Prompt Compact Input Box */}
                  <div className="bg-[#27272a] rounded-xl p-2 border border-[#44444a] shadow-sm">
                    <div className="flex items-center gap-1 text-[9px] text-slate-300 mb-1 font-semibold">
                      <span className="text-white/80">@</span>
                      <span>About.tsx</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1.5 font-sans truncate">Describe next task...</p>
                    <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-[#3f3f46]">
                      <span>Auto ▾</span>
                      <div className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center">
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* VS Code Bottom Status Bar */}
              <div className="h-7 bg-[#252528] border-t border-[#333338] text-slate-200 px-3 flex items-center justify-between text-xs font-sans font-medium">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 font-mono">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>main*</span>
                  </div>
                  <span className="hidden sm:inline">Launchpad</span>
                  <span className="hidden sm:inline">⨂ 0  ⚠ 0</span>
                  <span className="hidden sm:inline">3 hrs 33 mins</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden md:inline">You, 20 seconds ago</span>
                  <span>{'{ }'} TypeScript JSX</span>
                  <span className="hidden sm:inline">Prettier</span>
                  <Bell className="w-3.5 h-3.5 cursor-pointer" />
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

