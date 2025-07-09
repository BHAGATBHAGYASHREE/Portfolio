"use client"

import { Building, GraduationCap } from "lucide-react"
import { motion, useScroll, useTransform, easeInOut } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function EducationJourney() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Star trail that follows scroll progress - fixed to move with the timeline
  const starTrailY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

const timelineAnimation = {
  hidden: { height: "0px" },
  visible: {
    height: "100%",
    transition: {
      duration: 1.5,
      ease: easeInOut, // <--- fix here
    },
  },
}


  const cardAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  const circleAnimation = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: {
        delay: 0.2 * i,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
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
    <section className="min-h-screen w-full flex items-center justify-center py-16 px-4" id="education" ref={ref}>
      <div className="max-w-6xl w-full">
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

          {/* 3D floating book */}
          <motion.div
            className="absolute top-[20%] right-[10%] w-16 h-20 bg-gray-800 rounded-sm"
            animate={{
              y: [0, -10, 0],
              rotateY: [0, 180, 360],
              rotateX: [0, 10, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <div className="absolute inset-1 bg-gray-700 flex items-center justify-center">
              <span className="text-xs text-gray-300">KNOWLEDGE</span>
            </div>
          </motion.div>

          {/* Floating graduation cap */}
          <motion.div
            className="absolute bottom-[20%] left-[15%] w-16 h-16"
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
            <div className="w-full h-full relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-800 rounded-sm rotate-45"></div>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-2 bg-gray-700 rounded-full"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-10 h-[1px] bg-gray-500"></div>
              <div className="absolute top-6 left-[calc(50%+5px)] w-[1px] h-6 bg-gray-500"></div>
            </div>
          </motion.div>

          {/* Floating diplomas */}
          <motion.div
            className="absolute top-[60%] right-[20%] w-14 h-18 bg-gray-800/50 rounded-sm border border-gray-700"
            animate={{
              y: [0, -8, 0],
              rotate: [0, 3, 0, -3, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <div className="absolute inset-1 bg-gray-700/50 flex items-center justify-center">
              <div className="w-full h-full border-2 border-gray-600 rounded-sm flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-4 mb-16 justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-10 bg-gradient-to-b from-gray-300 to-white rounded-full"></div>
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            EDUCATION JOURNEY
          </h2>
        </motion.div>

        <div className="relative">
          {/* Enhanced timeline line with star trail effect */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300/50 to-gray-500/50 transform -translate-x-1/2 overflow-visible"
            variants={timelineAnimation}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Timeline sparkles */}
            <motion.div
              className="absolute -left-2 top-0 w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -left-2 bottom-0 w-3 h-3 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.4,
              }}
            />
          </motion.div>

          {/* Enhanced star trail */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 z-10" 
            style={{ top: starTrailY }}
          >
            <motion.div
              className="w-6 h-24 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 255, 255, 0.5)",
                    "0 0 16px 4px rgba(255, 255, 255, 0.7)",
                    "0 0 8px 2px rgba(255, 255, 255, 0.5)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-24 bg-gradient-to-b from-white via-white to-transparent"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced ITM Skills University */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative">
            <div className="md:col-start-2">
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
                custom={1}
                variants={cardAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(229, 231, 235, 0.3)",
                  scale: 1.01,
                }}
              >
                {/* Floating gradient background */}
                <motion.div
                  className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -bottom-16 -left-16 w-36 h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                />

                {/* Enhanced content */}
                <div className="flex justify-between items-start mb-4">
                  <motion.h3
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    ITM Skills University
                  </motion.h3>
                  <motion.span
                    className="text-sm bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    August 2023 - Present
                  </motion.span>
                </div>
                <div className="flex items-center gap-3 mb-4 text-gray-400 text-lg">
                  <GraduationCap size={24} className="text-white" />
                  <motion.span
                    className="font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    BACHELORS OF TECHNOLOGY IN COMPUTER SCIENCE
                  </motion.span>
                </div>

                {/* Enhanced content with staggered animations */}
                <motion.div
                  className="space-y-6 mt-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Pursuing a comprehensive curriculum in computer science fundamentals</p>
                  </motion.div>
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Specializing in UI/UX design and frontend development</p>
                  </motion.div>
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Active participant in technical workshops and hackathons</p>
                  </motion.div>
                </motion.div>

                {/* Enhanced floating elements */}
                <motion.div
                  className="absolute -bottom-3 -right-3 w-12 h-12 opacity-20"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <GraduationCap className="w-full h-full text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Ramseth Thakur College */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative">
            <div className="md:col-start-1">
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
                custom={2}
                variants={cardAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(229, 231, 235, 0.3)",
                  scale: 1.01,
                }}
              >
                {/* Floating gradient background */}
                <motion.div
                  className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -bottom-16 -left-16 w-36 h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                />

                {/* Enhanced content */}
                <div className="flex justify-between items-start mb-4">
                  <motion.h3
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Ramseth Thakur College
                  </motion.h3>
                  <motion.span
                    className="text-sm bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    2021 - 2023
                  </motion.span>
                </div>
                <div className="flex items-center gap-3 mb-4 text-gray-400 text-lg">
                  <Building size={24} className="text-white" />
                  <motion.span
                    className="font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    SECONDARY EDUCATION
                  </motion.span>
                </div>

                {/* Enhanced content with staggered animations */}
                <motion.div
                  className="space-y-6 mt-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Completed higher secondary education with focus on science and mathematics</p>
                  </motion.div>
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Participated in various technical competitions and events</p>
                  </motion.div>
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Developed initial interest in computer science and design</p>
                  </motion.div>
                </motion.div>

                {/* Enhanced floating elements */}
                <motion.div
                  className="absolute -bottom-3 -right-3 w-12 h-12 opacity-20"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <Building className="w-full h-full text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Harmony Public School */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div className="md:col-start-2">
              <motion.div
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
                custom={3}
                variants={cardAnimation}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{
                  y: -3,
                  borderColor: "rgba(229, 231, 235, 0.3)",
                  scale: 1.01,
                }}
              >
                {/* Floating gradient background */}
                <motion.div
                  className="absolute -top-16 -right-16 w-36 h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -bottom-16 -left-16 w-36 h-36 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full blur-xl opacity-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                />

                {/* Enhanced content */}
                <div className="flex justify-between items-start mb-4">
                  <motion.h3
                    className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    Harmony Public School
                  </motion.h3>
                  <motion.span
                    className="text-sm bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    2015 - 2020
                  </motion.span>
                </div>
                <div className="flex items-center gap-3 mb-4 text-gray-400 text-lg">
                  <Building size={24} className="text-white" />
                  <motion.span
                    className="font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    PRIMARY EDUCATION
                  </motion.span>
                </div>

                {/* Enhanced content with staggered animations */}
                <motion.div
                  className="space-y-6 mt-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                >
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Completed primary education with distinction</p>
                  </motion.div>
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Participated in various extracurricular activities</p>
                  </motion.div>
                  <motion.div variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}>
                    <p className="text-lg text-gray-300 font-medium">• Developed foundation in creative thinking and problem-solving</p>
                  </motion.div>
                </motion.div>

                {/* Enhanced floating elements */}
                <motion.div
                  className="absolute -bottom-3 -right-3 w-12 h-12 opacity-20"
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Building className="w-full h-full text-white" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
