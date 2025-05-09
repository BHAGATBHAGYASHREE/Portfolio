"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Palette, Layers, Cpu, Lightbulb } from "lucide-react"

export default function SkillsExpertise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const technicalSkills = [
    { name: "HTML/HTML5", percentage: 95, color: "from-gray-900/50 via-gray-300/50 to-white/50" },
    { name: "React.js", percentage: 80, color: "from-gray-900/50 via-gray-300/50 to-white/50" },
    { name: "JavaScript", percentage: 85, color: "from-gray-900/50 via-gray-300/50 to-white/50" },
    { name: "CSS (Sass)", percentage: 88, color: "from-gray-900/50 via-gray-300/50 to-white/50" },
    { name: "Next.js", percentage: 70, color: "from-gray-900/50 via-gray-300/50 to-white/50" },
    { name: "TypeScript", percentage: 70, color: "from-gray-900/50 via-gray-300/50 to-white/50" },
  ]

  const skillCategories = [
    {
      title: "Design Skills",
      icon: <Palette className="w-8 h-8 text-white" />,
      skills: [
        "UI/UX",
        "Wireframing",
        "Agile UX",
        "Interactive Design",
        "SDLC",
        "Design Thinking",
        "User Research",
        "Visual Design",
      ],
      color: "from-gray-900/50 via-gray-300/50 to-white/50",
    },
    {
      title: "Tools",
      icon: <Layers className="w-6 h-6 text-white" />,
      skills: ["Figma", "Sketch", "Firebase", "Canva", "Google Appsheet", "Video Editors"],
      color: "from-gray-900/50 via-gray-300/50 to-white/50",
    },
    {
      title: "Cloud & DevOps",
      icon: <Cpu className="w-6 h-6 text-white" />,
      skills: ["AWS (EC2, VPC, S3, IAM)", "Git", "GitHub"],
      color: "from-gray-900/50 via-gray-300/50 to-white/50",
    },
    {
      title: "Soft Skills",
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      skills: [
        "Marketing Strategies",
        "Content Creation",
        "Customer Journey Strategies",
        "Communication",
        "Problem Solving",
      ],
      color: "from-gray-900/50 via-gray-300/50 to-white/50",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const barAnimation = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    }),
  }

  // Generate space particles
  const generateParticles = (count: number) => {
    const particles = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1
      particles.push({
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    return particles
  }

  const particles = generateParticles(30)

  return (
    <section className="min-h-screen py-32 relative flex items-center justify-center" id="skills" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Space background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Floating particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white animate-float"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                top: particle.top,
                left: particle.left,
                opacity: particle.opacity,
                animationDuration: particle.animationDuration,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          {/* Floating skill icons */}
          <motion.div
            className="absolute top-[20%] right-[15%] w-16 h-16 bg-gray-900/10 rounded-lg flex items-center justify-center"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Code className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            className="absolute bottom-[25%] left-[10%] w-10 h-10 bg-gray-900/10 rounded-lg flex items-center justify-center"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -3, 0, 3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 1,
            }}
          >
            <Palette className="w-5 h-5 text-white" />
          </motion.div>

          {/* Skill connections */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
            <motion.line
              x1="20%"
              y1="30%"
              x2="40%"
              y2="50%"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 1 }}
            />
            <motion.line
              x1="40%"
              y1="50%"
              x2="60%"
              y2="40%"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 1.5 }}
            />
            <motion.line
              x1="60%"
              y1="40%"
              x2="80%"
              y2="60%"
              stroke="white"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 2 }}
            />
          </svg>
        </div>

        {/* Main heading */}
        <motion.div
          className="flex items-center gap-4 mb-16 justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-12 bg-gradient-to-b from-gray-300 to-white rounded-full"></div>
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            SKILLS & EXPERTISE
          </h2>
        </motion.div>

        {/* Technical Skills Section */}
        <div className="mb-24 max-w-5xl mx-auto">
          <motion.h3
            className="text-2xl font-bold mb-12 inline-block relative text-center w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
              <Code className="inline-block mr-2 mb-1 w-6 h-6" />
              Technical Skills
            </span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">{skill.name}</span>
                  <span className="text-gray-400 text-lg">{skill.percentage}%</span>
                </div>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden relative">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative z-10`}
                    custom={skill.percentage}
                    variants={barAnimation}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  ></motion.div>
                  <motion.div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full opacity-30 blur-sm`}
                    custom={skill.percentage}
                    variants={barAnimation}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-10 border border-gray-800 hover:border-gray-700 transition-all duration-300 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 * catIndex }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${category.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300`}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              ></motion.div>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="bg-black/30 backdrop-blur-sm border border-gray-800 px-4 py-2 rounded-lg text-base transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: 0.1 * index + 0.3 * catIndex }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(30, 30, 30, 0.6)",
                      borderColor: "rgba(229, 231, 235, 0.3)",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
