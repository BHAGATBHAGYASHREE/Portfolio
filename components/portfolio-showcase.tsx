"use client"

import Image from "next/image"
import { ExternalLink, X, Github } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

export default function PortfolioShowcase() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<"All" | "AI / Data Science" | "Web" | "Design">("All")
  const [poppedUpProject, setPoppedUpProject] = useState<any | null>(null)
  const [isHoveringWorkspace, setIsHoveringWorkspace] = useState(false)

  // Floating sleek circular "CLICK" badge that tracks mouse cursor (from user reference video)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 350 })
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 350 })

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
    if (!isHoveringWorkspace) setIsHoveringWorkspace(true)
  }

  // Pinning scroll track (320vh for smooth exploration)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  })

  // 1. Laptop Opening Transition
  // White shutters slide open to the left and right cleanly
  const doorLeftX = useTransform(smoothProgress, [0.04, 0.18, 0.80, 0.94], ["0%", "-102%", "-102%", "0%"])
  const doorRightX = useTransform(smoothProgress, [0.04, 0.18, 0.80, 0.94], ["0%", "102%", "102%", "0%"])

  // Center seam hairline fades out as doors open
  const centerSeamOpacity = useTransform(smoothProgress, [0.02, 0.08, 0.85, 0.94], [1, 0, 0, 1])

  // Laptop zooms into full screen and cross-fades into the general full-screen workspace
  const macScale = useTransform(smoothProgress, [0.06, 0.20, 0.78, 0.92], [1, 2.6, 2.6, 1])
  const macOpacity = useTransform(smoothProgress, [0.12, 0.20, 0.78, 0.86], [1, 0, 0, 1])

  // 2. Full-Screen Projects Workspace (Shown IN GENERAL, responsive in light & dark mode)
  const generalWorkspaceOpacity = useTransform(smoothProgress, [0.12, 0.22, 0.78, 0.88], [0, 1, 1, 0])
  const generalWorkspaceScale = useTransform(smoothProgress, [0.12, 0.22, 0.78, 0.88], [0.94, 1, 1, 0.94])

  // 3. Gliding Lines Speed Offset by Scroll
  const line1Scroll = useTransform(smoothProgress, [0.18, 0.82], ["0%", "-20%"])
  const line2Scroll = useTransform(smoothProgress, [0.18, 0.82], ["-20%", "0%"])

  const projects = [
    {
      id: "01",
      title: "SCAMSHIELD AI",
      subtitle: "FRAUD RISK & CYBER FORENSICS",
      description:
        "Production-grade cybersecurity intelligence engine detecting smishing, banking fraud, and coercive social engineering attacks with 95.11% accuracy, 0.9858 ROC-AUC, and 0.08ms CPU latency. Engineered with 18 cyber threat heuristics, calibrated risk scoring, Streamlit forensics dashboard, and FastAPI microservice.",
      image: "/scamshield.png",
      category: "AI / Data Science",
      categories: ["AI / Data Science", "Web"],
      demoUrl: "https://faarzi-ai.onrender.com/",
      githubUrl: "https://github.com/BHAGATBHAGYASHREE/ScamShieldAI",
      tags: ["Python", "FastAPI", "Streamlit", "Scikit-Learn", "MLflow", "DVC", "Docker", "Cybersecurity"],
    },
    {
      id: "02",
      title: "MATERNAL HEALTH AI",
      subtitle: "PREDICTIVE RISK CLASSIFIER",
      description:
        "AI-powered maternal health risk prediction system leveraging Python, Machine Learning, and healthcare IoT telemetry. Engineered and trained predictive models to classify maternal risk levels with high precision for early clinical risk detection.",
      image: "/maternal_health_ai.jpg",
      category: "AI / Data Science",
      categories: ["AI / Data Science", "Web"],
      demoUrl: "https://maternal-risk-ai.vercel.app",
      githubUrl: "https://github.com/BHAGATBHAGYASHREE",
      tags: ["Python", "Machine Learning", "Healthcare IoT", "Predictive Modeling", "Risk Analytics"],
    },
    {
      id: "03",
      title: "SPENDORA",
      subtitle: "FINANCE & ORDER TRACKING",
      description:
        "Full-stack React.js application unifying Personal Finance Management and Business Order Tracking through a responsive, scalable UI. Architected cloud-based storage to track and synchronize 50+ orders in real-time.",
      image: "/spendora.jpg",
      category: "Web",
      categories: ["Web"],
      demoUrl: "https://github.com/BHAGATBHAGYASHREE",
      githubUrl: "https://github.com/BHAGATBHAGYASHREE",
      tags: ["React.js", "Full-Stack", "Cloud Storage", "Order Tracking", "Finance", "UI/UX"],
    },
    {
      id: "04",
      title: "PRONTO",
      subtitle: "CAB BOOKING & GROCERY PLATFORM",
      description:
        "Full-stack MERN grocery delivery and ride-booking platform with real-time tracking, React.js frontend, Node.js & Express backend, and MongoDB & Firebase integration.",
      image: "/pronto.png",
      category: "Web",
      categories: ["Web"],
      demoUrl: "https://youtu.be/s1Xknl_fnmM?si=RcEwIgcxlTbgDs_g",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Firebase"],
    },
    {
      id: "05",
      title: "RENTEASE",
      subtitle: "CAR RENTAL & DRIVER HIRING",
      description:
        "Car rental ecosystem built with React.js featuring seamless online booking, professional driver hiring, car delivery, and an intuitive UI/UX crafted in Figma.",
      image: "/rentease.png",
      category: "Web",
      categories: ["Web"],
      demoUrl: "https://rent-ease-navy.vercel.app/",
      tags: ["React.js", "JavaScript", "Figma", "JSON", "Vercel"],
    },
    {
      id: "06",
      title: "OMNIDOCTOR",
      subtitle: "TELEMEDICINE HEALTHCARE APP",
      description:
        "Telemedicine digital platform connecting patients with certified physicians for online consultations, smart appointments, and prescriptions via React.js & Firebase.",
      image: "/Omnidoctor.png",
      category: "Web",
      categories: ["Web"],
      demoUrl: "https://omni-doctor.vercel.app/",
      tags: ["React.js", "Firebase", "Healthcare", "UI/UX"],
    },
    {
      id: "07",
      title: "HOTEL BOOKING UI",
      subtitle: "LUXURY RESORT RESERVATION",
      description:
        "Modern hotel booking interface with advanced search filters, multi-tier room selection, and high-conversion reservation flow designed in Figma.",
      image: "/hotelbooking.png",
      category: "Design",
      categories: ["Design"],
      demoUrl: "https://www.figma.com/proto/your-hotel-booking-link",
      tags: ["Figma", "UI/UX", "Prototyping", "Booking Flow"],
    },
    {
      id: "08",
      title: "DISNEY+ HOTSTAR UI",
      subtitle: "STREAMING PLATFORM REDESIGN",
      description:
        "Streaming entertainment platform UI/UX redesign featuring immersive media player, curated catalogs, and streamlined subscription flows.",
      image: "/disneyhtostarclone.png",
      category: "Design",
      categories: ["Design"],
      demoUrl: "https://www.figma.com/proto/your-disney-hotstar-link",
      tags: ["Figma", "Streaming UI", "UX Research", "Design Systems"],
    },
    {
      id: "09",
      title: "RENTEASE DESIGN SYSTEM",
      subtitle: "MOBILE & WEB COMPONENT KIT",
      description:
        "Comprehensive UI/UX design kit, wireframes, and interactive components for vehicle rental mobile and web applications.",
      image: "/figmarentease.png",
      category: "Design",
      categories: ["Design"],
      demoUrl: "https://www.figma.com/proto/your-loan-management-link",
      tags: ["Figma", "Mobile UI", "Car Rental", "Wireframes"],
    },
  ]

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (p) =>
            p.category === activeCategory ||
            (p.categories && p.categories.includes(activeCategory))
        )

  // Split projects into two lines as instructed by user:
  // "one is moving like, left, all the projects, half of them are moving to left in one line, and another are moving to right"
  const half = Math.ceil(filteredProjects.length / 2)
  const line1List = [...filteredProjects.slice(0, half), ...filteredProjects.slice(half)]
  const line2List = [...filteredProjects.slice(half), ...filteredProjects.slice(0, half)]

  // Duplicate arrays for continuous infinite smooth loop across the screen
  const infiniteLine1 = [...line1List, ...line1List, ...line1List, ...line1List]
  const infiniteLine2 = [...line2List, ...line2List, ...line2List, ...line2List]

  return (
    <div
      ref={trackRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[320vh] bg-transparent dark:bg-black text-slate-900 dark:text-white transition-colors duration-500"
    >
      {/* ========================================================================= */}
      {/* PURE NATIVE STICKY CONTAINER: Pinned across scroll distance               */}
      {/* ========================================================================= */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-transparent dark:bg-black select-none z-30 transition-colors duration-500">
        
        {/* Ambient background glows tailored for both Light & Dark modes */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-25 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-white/5 dark:bg-white/5 rounded-full blur-[180px] pointer-events-none" />

        {/* ========================================================================= */}
        {/* 1. OUTSIDE WHOLE SECTION HEADING: "PROJECTS" (Light & Dark Responsive)    */}
        {/* ========================================================================= */}
        <div className="absolute top-4 sm:top-6 inset-x-0 mx-auto px-6 sm:px-10 max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-40">
          <div className="flex flex-col">
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif uppercase drop-shadow-sm dark:drop-shadow-2xl">
              PROJECTS
            </h2>
          </div>

          {/* Category Filter Pills (Light & Dark responsive) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 dark:bg-white/10 backdrop-blur-md rounded-full border border-slate-300 dark:border-white/20 shadow-sm flex-wrap">
            {(["All", "AI / Data Science", "Web", "Design"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. APPLE MAC LAPTOP (Adaptive Silver/Space Gray in Light & Dark Mode)      */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            scale: macScale,
            opacity: macOpacity,
            transformStyle: "preserve-3d",
          }}
          className="absolute flex flex-col items-center justify-center w-[94vw] max-w-[1140px] z-20 pointer-events-none mt-10 sm:mt-12"
        >
          {/* iMac / MacBook Enclosure */}
          <div className="relative w-full rounded-[24px] border-[2.5px] border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-[#121316] p-2.5 sm:p-3 pb-0 flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(56,189,248,0.18)] transition-colors duration-500">
            
            {/* Top FaceTime Camera */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border border-slate-400 dark:border-slate-500 bg-slate-900 z-40" />

            {/* Laptop Screen Display: AESTHETIC FRONT COVER THAT SPLITS CLEANLY */}
            <div className="relative w-full h-[260px] xs:h-[340px] sm:h-[480px] md:h-[530px] bg-slate-100 dark:bg-[#0c0d12] rounded-[14px] overflow-hidden border-[1.5px] border-slate-300 dark:border-slate-800 flex items-center justify-center transition-colors duration-500">
              
              {/* LEFT SHUTTER: Left half of the single aesthetic front page */}
              <motion.div
                style={{ x: doorLeftX }}
                className="absolute top-0 left-0 w-1/2 h-full bg-white dark:bg-[#f8fafc] text-slate-900 dark:text-black z-30 overflow-hidden shadow-[10px_0_25px_rgba(0,0,0,0.12)] dark:shadow-[15px_0_35px_rgba(0,0,0,0.35)] border-r border-slate-200 dark:border-slate-300/50"
              >
                {/* Viewfinder brackets & metadata badges */}
                <div className="absolute top-7 left-7 w-7 h-7 border-t-2 border-l-2 border-slate-800 dark:border-black" />
                <div className="absolute bottom-7 left-7 w-7 h-7 border-b-2 border-l-2 border-slate-800 dark:border-black" />
                
                <div className="absolute top-7 left-18 text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  BHAGYASHREE • LAB
                </div>

                <div className="absolute bottom-7 left-18 text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                  VOL. 2026 // WORKSPACE
                </div>

                {/* Left Half of Perfectly Centered Word "PROJECTS" */}
                <div className="absolute top-0 left-0 w-[200%] h-full flex items-center justify-center pointer-events-none">
                  <span className="text-4xl xs:text-5xl sm:text-8xl md:text-9xl font-sans font-black text-slate-900 dark:text-black tracking-tight uppercase select-none">
                    PROJECTS
                  </span>
                </div>
              </motion.div>

              {/* RIGHT SHUTTER: Right half of the single aesthetic front page */}
              <motion.div
                style={{ x: doorRightX }}
                className="absolute top-0 right-0 w-1/2 h-full bg-white dark:bg-[#f8fafc] text-slate-900 dark:text-black z-30 overflow-hidden shadow-[-10px_0_25px_rgba(0,0,0,0.12)] dark:shadow-[-15px_0_35px_rgba(0,0,0,0.35)] border-l border-slate-200 dark:border-slate-300/50"
              >
                {/* Viewfinder brackets & metadata badges */}
                <div className="absolute top-7 right-7 w-7 h-7 border-t-2 border-r-2 border-slate-800 dark:border-black" />
                <div className="absolute bottom-7 right-7 w-7 h-7 border-b-2 border-r-2 border-slate-800 dark:border-black" />
                
                <div className="absolute top-7 right-18 text-[10px] font-mono tracking-widest text-neutral-500 uppercase text-right">
                  SCROLL TO VIEW
                </div>

                <div className="absolute bottom-7 right-18 text-[9px] font-mono tracking-widest text-neutral-400 uppercase text-right">
                  01 / 07 ARCHIVE
                </div>

                {/* Right Half of Perfectly Centered Word "PROJECTS" */}
                <div className="absolute top-0 right-0 w-[200%] h-full flex items-center justify-center pointer-events-none">
                  <span className="text-4xl xs:text-5xl sm:text-8xl md:text-9xl font-sans font-black text-slate-900 dark:text-black tracking-tight uppercase select-none">
                    PROJECTS
                  </span>
                </div>
              </motion.div>

              {/* Center Hairline Indicator */}
              <motion.div
                style={{ opacity: centerSeamOpacity }}
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-neutral-300 z-35 pointer-events-none"
              />

            </div>

            {/* Lower Aluminum Chin with Official Apple Logo & Mac Text */}
            <div className="w-full h-11 sm:h-13 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-[#1c1d22] dark:via-[#24252b] dark:to-[#1c1d22] border-t-[1.5px] border-slate-300 dark:border-slate-700/80 flex items-center justify-center gap-2 relative transition-colors duration-500">
              <svg className="w-4 h-4 fill-slate-800 dark:fill-white transition-colors duration-500" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.74 1.02-1.77.91-2.8-.88.04-1.95.59-2.57 1.32-.55.63-.99 1.67-.86 2.69.98.08 1.91-.47 2.52-1.21z" />
              </svg>
              <span className="text-xs font-sans font-medium tracking-widest text-slate-700 dark:text-slate-300 transition-colors duration-500">
                Mac
              </span>
            </div>
          </div>

          {/* Stand Foot Outline */}
          <div className="hidden sm:flex flex-col items-center pointer-events-none">
            <div className="w-24 sm:w-28 h-12 sm:h-14 border-x-2 border-slate-300 dark:border-slate-700 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-[#24252b] dark:to-[#1a1b1e] transition-colors duration-500" />
            <div className="w-56 sm:w-64 h-3.5 rounded-b-md border-b-2 border-x-2 border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-[#24252b] shadow-md dark:shadow-xl transition-colors duration-500" />
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* 3. GENERAL FULL-SCREEN PROJECTS WORKSPACE (Light & Dark Responsive)        */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: generalWorkspaceOpacity,
            scale: generalWorkspaceScale,
          }}
          onMouseEnter={() => setIsHoveringWorkspace(true)}
          onMouseLeave={() => setIsHoveringWorkspace(false)}
          className="absolute inset-0 w-full h-full flex flex-col justify-between pt-24 pb-6 sm:pb-8 z-25 pointer-events-auto overflow-hidden bg-slate-50/95 dark:bg-black transition-colors duration-500"
        >
          {/* Subtle Top Status Indicator */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between z-40">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-slate-800 dark:text-slate-200 uppercase font-bold">
                FEATURED PROJECTS
              </span>
            </div>
            <span className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 hidden sm:inline-block font-medium">
              CLICK ANY CARD TO POPUP DETAILS
            </span>
          </div>

          {/* ======================================================================= */}
          {/* DUAL OPPOSITE GLIDING LINES IN GENERAL (Light & Dark Mode Cards)        */}
          {/* ======================================================================= */}
          <div className="w-full flex flex-col justify-center gap-6 sm:gap-8 my-auto overflow-hidden select-none py-2">
            
            {/* LINE 1: Projects gliding continuously to the LEFT across screen */}
            <motion.div
              style={{ x: line1Scroll }}
              className="flex items-center will-change-transform"
            >
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 32,
                }}
                className="flex gap-6 sm:gap-8 w-max py-2 px-4"
              >
                {infiniteLine1.map((p, idx) => (
                  <div
                    key={`l1-${p.id}-${idx}`}
                    onClick={() => setPoppedUpProject(p)}
                    className="relative w-64 xs:w-76 sm:w-96 md:w-[460px] h-38 xs:h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-white dark:bg-[#121317] border border-slate-200 dark:border-white/10 flex-shrink-0 cursor-pointer hover:border-white/80 dark:hover:border-white/80 hover:scale-[1.03] transition-all duration-300 shadow-lg dark:shadow-2xl group"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Gradient Overlay & Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-4 sm:p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/80 text-white border border-white/40">
                          {p.category}
                        </span>
                        <span className="text-xs font-mono tracking-wider text-white font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          CLICK TO POPUP
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-white text-xs font-black">▶</span>
                          <h4 className="font-mono text-lg sm:text-xl font-black tracking-wider uppercase drop-shadow-md">
                            {p.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-100 line-clamp-1 mt-1 font-normal">
                          {p.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* LINE 2: Projects gliding continuously to the RIGHT across screen */}
            <motion.div
              style={{ x: line2Scroll }}
              className="flex items-center will-change-transform"
            >
              <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 32,
                }}
                className="flex gap-6 sm:gap-8 w-max py-2 px-4"
              >
                {infiniteLine2.map((p, idx) => (
                  <div
                    key={`l2-${p.id}-${idx}`}
                    onClick={() => setPoppedUpProject(p)}
                    className="relative w-64 xs:w-76 sm:w-96 md:w-[460px] h-38 xs:h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden bg-white dark:bg-[#121317] border border-slate-200 dark:border-white/10 flex-shrink-0 cursor-pointer hover:border-white/80 dark:hover:border-white/80 hover:scale-[1.03] transition-all duration-300 shadow-lg dark:shadow-2xl group"
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity duration-300"
                    />

                    {/* Gradient Overlay & Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-4 sm:p-5 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/80 text-white border border-white/40">
                          {p.category}
                        </span>
                        <span className="text-xs font-mono tracking-wider text-white font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          CLICK TO POPUP
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-white">
                          <span className="text-white text-xs font-black">▶</span>
                          <h4 className="font-mono text-lg sm:text-xl font-black tracking-wider uppercase drop-shadow-md">
                            {p.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-100 line-clamp-1 mt-1 font-normal">
                          {p.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>

          {/* Bottom Action Bar: VIEW MORE PROJECTS (Light & Dark Responsive) */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-mono z-40">
            <div className="hidden sm:block w-28" />

            {/* VIEW MORE PROJECTS BUTTON (GitHub Link) */}
            <a
              href="https://github.com/BHAGATBHAGYASHREE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-900 text-white hover:bg-white hover:text-black hover:border-white dark:bg-white/15 dark:hover:bg-white dark:hover:text-black border border-slate-300 dark:border-white/25 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md shadow-md dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer pointer-events-auto"
            >
              <Github className="w-4 h-4" />
              <span>VIEW MORE PROJECTS</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <span className="text-slate-600 dark:text-slate-300 hidden sm:inline-block font-semibold">
              SCROLL TO EXIT
            </span>
          </div>

        </motion.div>

        {/* ========================================================================= */}
        {/* 4. POPPED-UP SPOTLIGHT MODAL (Light & Dark Responsive)                    */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {poppedUpProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPoppedUpProject(null)}
              className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0f1015] border-2 border-slate-200 dark:border-white/40 overflow-hidden shadow-2xl transition-colors duration-500 max-h-[90vh] overflow-y-auto"
              >
                {/* Viewfinder Corner Brackets ⌜ ⌝ ⌞ ⌟ */}
                <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-slate-800 dark:border-white z-30 pointer-events-none" />
                <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-slate-800 dark:border-white z-30 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-slate-800 dark:border-white z-30 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-slate-800 dark:border-white z-30 pointer-events-none" />

                {/* Close Button */}
                <button
                  onClick={() => setPoppedUpProject(null)}
                  className="absolute top-4 right-4 z-40 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-300 dark:border-white/20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Project Screenshot Media Display */}
                <div className="relative w-full h-[180px] xs:h-[220px] sm:h-[360px] bg-slate-900 flex-shrink-0">
                  <Image
                    src={poppedUpProject.image}
                    alt={poppedUpProject.title}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0f1015] via-transparent to-transparent opacity-80" />
                </div>

                {/* Project Details */}
                <div className="p-4 sm:p-8 pt-3 sm:pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-white text-sm font-black">▶</span>
                        <h3 className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white tracking-wider uppercase">
                          {poppedUpProject.title}
                        </h3>
                      </div>
                      <span className="text-sm font-mono tracking-widest text-slate-600 dark:text-slate-300 uppercase font-semibold">
                        {poppedUpProject.subtitle}
                      </span>
                    </div>

                    {/* Action Buttons: Source Code & Live Demo */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      {poppedUpProject.githubUrl && (
                        <a
                          href={poppedUpProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white font-mono font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-300 dark:border-white/20 transition-all cursor-pointer flex-shrink-0"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                      <a
                        href={poppedUpProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all cursor-pointer flex-shrink-0"
                      >
                        <span>VISIT LIVE DEMO</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-100 font-normal leading-relaxed mb-5">
                    {poppedUpProject.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
                    {poppedUpProject.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-white/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 5. FLOATING SLEEK CIRCULAR "CLICK" BADGE (Tracks Mouse Cursor)             */}
        {/* ========================================================================= */}
        {isHoveringWorkspace && !poppedUpProject && (
          <motion.div
            style={{
              left: smoothMouseX,
              top: smoothMouseY,
            }}
            className="fixed pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-black border border-white/80 flex flex-col items-center justify-center font-mono font-black text-[11px] tracking-wider shadow-[0_0_30px_rgba(255,255,255,0.8)]"
          >
            <span>CLICK</span>
          </motion.div>
        )}

      </div>
    </div>
  )
}
