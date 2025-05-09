"use client"
import { Building, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function WorkExperience() {
  const ref = useRef(null)
  
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  // Generate floating particles
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
    <section className="min-h-screen py-16 relative flex items-center justify-center" id="work" ref={ref}>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
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

          {/* Animated orbital path */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-800 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-gray-700 rounded-full opacity-15"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gray-600 rounded-full opacity-10"></div>

          {/* Orbital planet */}
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
              top: "calc(50% - 250px)",
              left: "50%",
              transformOrigin: "0 250px",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-300 to-white opacity-50 blur-sm"></div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-4 mb-16 justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-10 bg-gradient-to-b from-gray-300 to-white rounded-full"></div>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            WORK EXPERIENCE
          </h2>
        </motion.div>

        <motion.div
          className="space-y-12 max-w-4xl mx-auto w-full"
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Zinq Technologies */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            variants={item}
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

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-gray-300 to-white rounded-2xl p-1"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.3)",
                      "0 0 20px rgba(255, 255, 255, 0.5)",
                      "0 0 10px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                      Z
                    </span>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    Zinq Technologies
                  </h3>
                  <span className="text-sm bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                    <Calendar size={14} />
                    <span>Apr 2024</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Building size={16} />
                  <span>CORPORATE TRAINER</span>
                </div>
                <p className="text-gray-300 relative z-10 text-sm md:text-base">
                  Generative AI Enablement: Delivered hands-on guidance to employees on effectively leveraging
                  Generative AI tools, with a focus on enhancing creativity and productivity in tasks such as PowerPoint
                  presentation design.
                </p>

                {/* Added achievements section */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    <li>Trained 30+ employees on AI tools implementation</li>
                    <li>Improved team productivity by 25% through AI integration</li>
                    <li>Developed custom AI workflows for design teams</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Letsupgrade */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            variants={item}
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

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0">
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-gray-300 to-white rounded-2xl p-1"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.3)",
                      "0 0 20px rgba(255, 255, 255, 0.5)",
                      "0 0 10px rgba(255, 255, 255, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                      L
                    </span>
                  </div>
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    Letsupgrade
                  </h3>
                  <span className="text-sm bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                    <Calendar size={14} />
                    <span>DEC 2023 - JAN 2024</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <Building size={16} />
                  <span>SOFTWARE DEVELOPMENT & ENGINEERING, INTERN</span>
                </div>
                <p className="text-gray-300 mb-4 relative z-10 text-sm md:text-base">
                  Website Revamp and User Experience Optimization: Led the redesign of the official website with a focus
                  on intuitive Optimization: Led the redesign of the official website with a focus on intuitive
                  navigation, modern UI/UX elements, and enhanced user interaction.
                </p>
                <p className="text-gray-300 relative z-10 text-sm md:text-base">
                  Digital Outreach and Engagement Strategies: Developed and executed targeted promotional initiatives to
                  expand reach, improve audience engagement, and elevate the college's online presence.
                </p>

                {/* Added achievements section */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    <li>Increased website traffic by 40% through UI/UX improvements</li>
                    <li>Implemented responsive design principles across all pages</li>
                    <li>Created interactive elements that boosted user engagement metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
