"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Lightbulb, Users, Rocket } from "lucide-react"

export default function CollegeClubs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

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
    <section className="min-h-screen py-16 relative flex items-center justify-center" id="college-clubs" ref={ref}>
      <div className="container mx-auto px-4 flex flex-col items-center">
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

          {/* 3D floating club logo - CodeNex */}
          <motion.div
            className="absolute top-[15%] right-[20%] w-20 h-20"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border border-gray-600 flex items-center justify-center">
                <Code className="w-8 h-8 text-gray-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 to-gray-900/30 rounded-full blur-md transform translate-x-2 translate-y-2"></div>
            </div>
          </motion.div>

          {/* 3D floating club logo - Founders Club */}
          <motion.div
            className="absolute bottom-[20%] left-[15%] w-16 h-16"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border border-gray-600 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-gray-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 to-gray-900/30 rounded-full blur-md transform translate-x-1 translate-y-1"></div>
            </div>
          </motion.div>

          {/* 3D floating generic club icon */}
          <motion.div
            className="absolute top-[40%] left-[20%] w-24 h-24"
            animate={{
              y: [0, -12, 0],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border border-gray-600 flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 to-gray-900/30 rounded-lg blur-md transform translate-x-2 translate-y-2"></div>
            </div>
          </motion.div>

          {/* Orbital path */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gray-800 rounded-full opacity-20 rotate-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Orbital planets */}
          <motion.div
            className="absolute w-6 h-6 bg-gradient-to-br from-gray-300 to-white rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              top: "calc(50% - 200px)",
              left: "50%",
              transformOrigin: "0 200px",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-white opacity-50 blur-sm"></div>
          </motion.div>

          <motion.div
            className="absolute w-4 h-4 bg-gradient-to-br from-gray-300 to-white rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              top: "calc(50% - 150px)",
              left: "50%",
              transformOrigin: "0 150px",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-white opacity-50 blur-sm"></div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-4 mb-10 justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-10 bg-gradient-to-b from-gray-300 to-white"></div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            COLLEGE CLUBS
          </h2>
        </motion.div>

        <motion.div
          className="space-y-8 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* CodeNex Club */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            whileHover={{ y: -5, borderColor: "rgba(229, 231, 235, 0.3)" }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-gray-300/10 to-white/10 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300"
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

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(255, 255, 255, 0.1)",
                      "0 0 10px rgba(255, 255, 255, 0.2)",
                      "0 0 5px rgba(255, 255, 255, 0.1)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Code className="w-8 h-8 text-gray-300" />
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    CodeNex Club SRM
                  </h3>
                  <span className="text-xs bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    Sep 2024 - Present
                  </span>
                </div>
                <div className="text-gray-400 mb-4 text-sm">Technical Team Member</div>
                <p className="text-gray-300 text-sm">
                  Contributed to multiple club projects as a Web Developer and UI/UX designer by building responsive
                  frontends and crafting clean, user-friendly interfaces that aligned with the team's tech goals.
                </p>

                {/* Added content */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-300 border border-gray-800"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(229, 231, 235, 0.3)",
                      backgroundColor: "rgba(50, 50, 50, 0.3)",
                    }}
                  >
                    <span className="block font-medium mb-1 text-gray-200">Key Project</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Code className="w-4 h-4 text-gray-300" />
                      </div>
                      <span>Club website redesign with React and Tailwind CSS</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-300 border border-gray-800"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(229, 231, 235, 0.3)",
                      backgroundColor: "rgba(50, 50, 50, 0.3)",
                    }}
                  >
                    <span className="block font-medium mb-1 text-gray-200">Achievements</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-gray-300" />
                      </div>
                      <span>Led UI/UX workshop for 30+ club members</span>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive element - Skills used */}
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {["React", "Tailwind CSS", "Figma", "UI/UX", "JavaScript"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="bg-gray-800/70 px-2 py-1 rounded-md text-xs border border-gray-700"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(75, 75, 75, 0.7)",
                        borderColor: "rgba(229, 231, 235, 0.5)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Founders Club */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            whileHover={{ y: -5, borderColor: "rgba(229, 231, 235, 0.3)" }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-gray-300/10 to-white/10 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-300"
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

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 0 5px rgba(255, 255, 255, 0.1)",
                      "0 0 10px rgba(255, 255, 255, 0.2)",
                      "0 0 5px rgba(255, 255, 255, 0.1)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Rocket className="w-8 h-8 text-gray-300" />
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    Founders Club
                  </h3>
                  <span className="text-xs bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    Oct 2023 - Present
                  </span>
                </div>
                <div className="text-gray-400 mb-4 text-sm">Creative Associate Lead</div>
                <p className="text-gray-300 text-sm">
                  Spearheaded creative initiatives and design projects for the entrepreneurship club, focusing on
                  branding, marketing materials, and digital presence to promote startup culture on campus.
                </p>

                {/* Added content */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-300 border border-gray-800"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(229, 231, 235, 0.3)",
                      backgroundColor: "rgba(50, 50, 50, 0.3)",
                    }}
                  >
                    <span className="block font-medium mb-1 text-gray-200">Key Project</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Rocket className="w-4 h-4 text-gray-300" />
                      </div>
                      <span>Startup Showcase Event branding and marketing</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 text-xs text-gray-300 border border-gray-800"
                    whileHover={{
                      scale: 1.02,
                      borderColor: "rgba(229, 231, 235, 0.3)",
                      backgroundColor: "rgba(50, 50, 50, 0.3)",
                    }}
                  >
                    <span className="block font-medium mb-1 text-gray-200">Achievements</span>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-gray-300" />
                      </div>
                      <span>Increased event participation by 40% through creative marketing</span>
                    </div>
                  </motion.div>
                </div>

                {/* Interactive element - Skills used */}
                <motion.div
                  className="mt-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {["Branding", "Marketing", "Event Planning", "Graphic Design", "Social Media"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="bg-gray-800/70 px-2 py-1 rounded-md text-xs border border-gray-700"
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(75, 75, 75, 0.7)",
                        borderColor: "rgba(229, 231, 235, 0.5)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
