"use client"

import Image from "next/image"
import { Eye, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<"All" | "Web" | "Design">("All")
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = [
    {
      id: "01",
      title: "Pronto",
      description:
        "MERN stack grocery delivery platform with real-time order tracking, a React.js frontend, Node.js & Express.js backend, and MongoDB & Firebase integration.",
      image: "/pronto.png",
      category: "Web",
      status: "Live Demo",
      demoUrl: "https://youtu.be/s1Xknl_fnmM?si=RcEwIgcxlTbgDs_g",
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Firebase"],
    },
    {
      id: "02",
      title: "RentEase",
      description:
        "Car rental platform built with React.js featuring seamless booking, driver hiring, car delivery, and a user-friendly UI/UX designed in Figma.",
      image: "/rentease.png",
      category: "Web",
      status: "Live Web App",
      demoUrl: "https://rent-ease-navy.vercel.app/",
      tags: ["React.js", "JavaScript", "Figma", "JSON", "Vercel"],
    },
    {
      id: "03",
      title: "OmniDoctor",
      description:
        "Telemedicine platform connecting patients with doctors for virtual consultations, built with React.js and Firebase.",
      image: "/Omnidoctor.png",
      category: "Web",
      status: "Live Web App",
      demoUrl: "https://omni-doctor.vercel.app/",
      tags: ["React.js", "Firebase", "Telemedicine", "UI/UX"],
    },
    {
      id: "04",
      title: "Hotel Booking UI",
      description:
        "Modern hotel booking interface with advanced search filters, room selection, and booking flow designed in Figma.",
      image: "/hotelbooking.png",
      category: "Design",
      status: "Figma Prototype",
      demoUrl: "https://www.figma.com/proto/your-hotel-booking-link",
      tags: ["Figma", "UI/UX", "Prototyping", "Booking Flow"],
    },
    {
      id: "05",
      title: "Disney Hotstar UI",
      description:
        "Streaming platform UI/UX design with video player, content library, and subscription management.",
      image: "/disneyhtostarclone.png",
      category: "Design",
      status: "Figma Prototype",
      demoUrl: "https://www.figma.com/proto/your-disney-hotstar-link",
      tags: ["Figma", "Streaming UI", "UX Research", "Design Systems"],
    },
    {
      id: "06",
      title: "RentEase UI Design",
      description:
        "Comprehensive UI/UX design system for a car rental mobile and web platform designed in Figma.",
      image: "/figmarentease.png",
      category: "Design",
      status: "Figma Prototype",
      demoUrl: "https://www.figma.com/proto/your-loan-management-link",
      tags: ["Figma", "Mobile UI", "Car Rental", "Wireframes"],
    },
  ]

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory)

  // Smooth, Slower 1-by-1 Wheel Scroll Interceptor
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let isLocked = false
    let cooldownTimeout: any = null
    let deltaAccumulator = 0

    const handleWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top <= 80 && rect.bottom >= window.innerHeight - 80

      if (!isVisible) return

      deltaAccumulator += e.deltaY

      // Scrolling Down 1 card at a time with smooth 1000ms cooldown
      if (deltaAccumulator > 120 && activeIndex < filteredProjects.length - 1) {
        if (!isLocked) {
          e.preventDefault()
          setActiveIndex((prev) => Math.min(prev + 1, filteredProjects.length - 1))
          isLocked = true
          deltaAccumulator = 0
          clearTimeout(cooldownTimeout)
          cooldownTimeout = setTimeout(() => {
            isLocked = false
          }, 1000)
        } else {
          e.preventDefault()
        }
      }
      // Scrolling Up 1 card at a time with smooth 1000ms cooldown
      else if (deltaAccumulator < -120 && activeIndex > 0) {
        if (!isLocked) {
          e.preventDefault()
          setActiveIndex((prev) => Math.max(prev - 1, 0))
          isLocked = true
          deltaAccumulator = 0
          clearTimeout(cooldownTimeout)
          cooldownTimeout = setTimeout(() => {
            isLocked = false
          }, 1000)
        } else {
          e.preventDefault()
        }
      } else if (
        (e.deltaY > 0 && activeIndex < filteredProjects.length - 1) ||
        (e.deltaY < 0 && activeIndex > 0)
      ) {
        e.preventDefault()
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(cooldownTimeout)
    }
  }, [activeIndex, filteredProjects.length])

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen sticky top-0 bg-black text-white overflow-hidden flex flex-col justify-between p-6 sm:p-12 z-40 select-none"
      id="projects"
    >
      {/* Background Dot Matrix Grid */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none z-0" />

      {/* Top Header Section (MY PROJECTS Title & Category Tabs) */}
      <div className="relative z-30 flex flex-col sm:flex-row sm:items-start justify-between gap-6 max-w-7xl w-full mx-auto">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-sans font-bold tracking-tight uppercase text-white leading-none mb-2"
          >
            MY PROJECTS <span className="text-xl sm:text-3xl font-mono align-top text-gray-400">({filteredProjects.length})</span>
          </motion.h2>

          {/* Filter Category Tabs */}
          <motion.div
            className="flex items-center gap-3 mt-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {(["All", "Web", "Design"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setActiveIndex(0)
                }}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white text-black font-bold shadow-lg scale-105"
                    : "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 3D Stage - Slower, Silkier Spring Animation */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto z-20"
        style={{ perspective: 1400 }}
      >
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {filteredProjects.map((project, index) => {
            const offset = index - activeIndex

            // Straight, clean position calculation
            const xPos = offset === 0 ? -160 : offset > 0 ? -160 + offset * 180 : -160 + offset * 320
            const yPos = offset === 0 ? 20 : offset > 0 ? 20 - offset * 60 : 20 + Math.abs(offset) * 120
            const zPos = offset === 0 ? 0 : offset > 0 ? -offset * 110 : -Math.abs(offset) * 160
            const scale = offset === 0 ? 1 : offset > 0 ? Math.max(0.5, 1 - offset * 0.08) : 0.85
            const opacity = offset < 0 ? 0 : offset > 5 ? 0 : Math.max(0.2, 1 - offset * 0.16)

            return (
              <motion.div
                key={project.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: xPos,
                  y: yPos,
                  z: zPos,
                  rotateY: -3,   // Straight, clean upright card alignment
                  rotateX: 0,    // Level baseline
                  rotateZ: 0,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 70,  // Extra smooth & slow spring animation
                  damping: 22,
                  mass: 1.2,
                }}
                style={{ transformStyle: "preserve-3d" }}
                className={`absolute w-[290px] sm:w-[360px] md:w-[410px] lg:w-[440px] bg-gray-950/95 border rounded-2xl overflow-hidden shadow-2xl cursor-pointer group transform-gpu transition-colors duration-300 ${
                  offset === 0
                    ? "border-white/80 shadow-white/15 ring-2 ring-white/30 z-50"
                    : "border-white/15 hover:border-white/35 z-20"
                }`}
              >
                {/* Index Tag */}
                <div className="absolute top-3.5 left-3.5 z-30 font-mono text-[11px] text-white/90 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 tracking-widest font-bold">
                  {project.id}
                </div>

                {/* Status Tag */}
                <div className="absolute top-3.5 right-3.5 z-30 font-mono text-[10px] font-semibold text-gray-200 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {project.status}
                </div>

                {/* Project Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent opacity-90" />
                </div>

                {/* Card Body */}
                <div className="p-5 bg-gray-950/95 flex flex-col justify-between gap-3 border-t border-white/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5 group-hover:text-gray-100 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs font-light leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{project.category === "Web" ? "Live Demo" : "View Prototype"}</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="relative z-30 flex items-center justify-between max-w-7xl w-full mx-auto">
        <motion.a
          href="https://github.com/BHAGATBHAGYASHREE"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-mono tracking-wider uppercase flex items-center gap-2 hover:bg-white/20 transition-all shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Explore All Repositories on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 text-white" />
        </motion.a>

        {/* SCROLL TO SURF Indicator */}
        <div className="text-right font-mono text-[11px] tracking-widest text-gray-400 uppercase flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>SCROLL TO SURF ({activeIndex + 1}/{filteredProjects.length})</span>
        </div>
      </div>
    </section>
  )
}
