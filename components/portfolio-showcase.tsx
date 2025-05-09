 "use client"

import Image from "next/image"
import { Eye, Code, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

export default function PortfolioShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const projects = [
    {
      title: "Pronto",
      description:
        "MERN stack grocery delivery platform with real-time order tracking, a React.js frontend, Node.js & Express.js backend, and MongoDB & Firebase integration",
      image: "/pronto.png",
      category: "Web",
      status: "Completed",
      demoUrl: "https://youtu.be/s1Xknl_fnmM?si=RcEwIgcxlTbgDs_g",
      codeUrl: "#",
      color: "from-gray-300 to-white",
    },
    {
      title: "RentEase",
      description:
        "Car rental platform built with React.js and JSON for storage, featuring seamless booking, driver hiring, car delivery, and a user-friendly UI/UX designed in Figma",
      image: "/rentease.png",
      category: "Web",
      status: "Completed",
      demoUrl: "https://rent-ease-navy.vercel.app/home",
      codeUrl: "#",
      color: "from-gray-300 to-white",
    },
    {
      title: "OmniDoctor",
      description:
        "Telemedicine platform connecting patients with doctors for virtual consultations, built with React.js and Firebase",
      image: "/Omnidoctor.png",
      category: "Web",
      status: "Completed",
      demoUrl: "https://omni-doctor.vercel.app/",
      codeUrl: "#",
      color: "from-gray-300 to-white",
    },
    {
      title: "Hotel Booking UI",
      description:
        "Modern hotel booking interface with advanced search filters, room selection, and booking flow designed in Figma",
      image: "/hotelbooking.png",
      category: "Design",
      status: "Completed",
      demoUrl: "https://www.figma.com/proto/your-hotel-booking-link",
      codeUrl: "#",
      color: "from-gray-300 to-white",
    },
    {
      title: "Disney Hotstar UI",
      description:
        "Streaming platform UI/UX design with video player, content library, and subscription management",
      image: "/disneyhtostarclone.png",
      category: "Design",
      status: "Completed",
      demoUrl: "https://www.figma.com/proto/your-disney-hotstar-link",
      codeUrl: "#",
      color: "from-gray-300 to-white",
    },
    {
      title: "Loan Management UI",
      description:
        "Professional loan management system interface with loan application, approval workflow, and dashboard",
      image: "/figmarentease.png",
      category: "Design",
      status: "Completed",
      demoUrl: "https://www.figma.com/proto/your-loan-management-link",
      codeUrl: "#",
      color: "from-gray-300 to-white",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const [filteredProjects, setFilteredProjects] = useState(projects)

  const handleFilter = (category: string) => {
    if (category === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === category))
    }
  }

  return (
    <section className="min-h-screen py-16 relative flex items-center justify-center" id="projects" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            My Projects
          </h2>
        </motion.div>

        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-4">
            <motion.button
              onClick={() => handleFilter("All")}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-4 py-1.5 rounded-lg hover:border-gray-700 transition-colors text-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            <motion.button
              onClick={() => handleFilter("Web")}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-4 py-1.5 rounded-lg hover:border-gray-700 transition-colors text-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Web
            </motion.button>
            <motion.button
              onClick={() => handleFilter("Design")}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 px-4 py-1.5 rounded-lg hover:border-gray-700 transition-colors text-sm cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Design
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative group h-full"
              whileHover={{ y: -10, borderColor: "rgba(229, 231, 235, 0.3)" }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${project.color}`}
                >
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-4 text-base leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${project.color} text-black text-sm font-medium transition-all duration-200 hover:scale-105`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-5 h-5" />
                    {project.category === "Web" ? "View Demo" : "View Design"}
                  </motion.a>
                  {project.codeUrl !== "#" && (
                    <motion.a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700 text-white text-sm font-medium transition-all duration-200 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code className="w-5 h-5" />
                      View Code
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/BHAGATBHAGYASHREE"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-gray-300/20 to-white/20 backdrop-blur-sm border border-gray-300/30 px-5 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.05, borderColor: "rgba(229, 231, 235, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>VIEW ALL PROJECTS</span>
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ExternalLink size={14} />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
