"use client"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Quote } from "lucide-react"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  // Generate space particles
  const generateParticles = (count: number) => {
    const particles = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 2 + 1
      particles.push({
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.1,
        animationDuration: `${Math.random() * 10 + 5}s`,
      })
    }
    return particles
  }

  const particles = generateParticles(20)

  return (
    <section className="min-h-screen py-16 relative flex items-center justify-center" id="testimonials" ref={ref}>
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        {/* Space background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Space particles */}
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
              }}
            />
          ))}

          {/* Floating quote marks */}
          <motion.div
            className="absolute top-[20%] right-[15%] text-4xl text-gray-600 font-serif"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <Quote size={40} className="text-gray-600" />
          </motion.div>

          <motion.div
            className="absolute bottom-[25%] left-[10%] text-4xl text-gray-600 font-serif"
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 1,
            }}
          >
            <Quote size={40} className="text-gray-600" />
          </motion.div>

          {/* Floating stars */}
          <motion.div
            className="absolute top-[40%] right-[30%] w-3 h-3 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                "0 0 5px 2px rgba(255, 255, 255, 0.3)",
                "0 0 10px 4px rgba(255, 255, 255, 0.5)",
                "0 0 5px 2px rgba(255, 255, 255, 0.3)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />

          <motion.div
            className="absolute bottom-[30%] right-[20%] w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                "0 0 5px 2px rgba(255, 255, 255, 0.3)",
                "0 0 10px 4px rgba(255, 255, 255, 0.5)",
                "0 0 5px 2px rgba(255, 255, 255, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 1,
            }}
          />

          {/* Orbital path */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-800 rounded-full opacity-20 rotate-12"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </div>

        <motion.div
          className="flex items-center gap-4 mb-10 justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-10 bg-gradient-to-b from-gray-300 to-white"></div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            TESTIMONIALS
          </h2>
        </motion.div>

        <motion.div
          className="space-y-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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

            <motion.div
              className="text-4xl text-gray-600 font-serif mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Quote size={40} className="text-gray-600" />
            </motion.div>

            <p className="text-gray-300 mb-6 relative z-10 text-sm">
              Arhaan possesses a remarkable ability to blend design and development, ensuring visually appealing and
              user-friendly interfaces while maintaining robust functionality. His adaptability and eagerness to learn
              allowed him to excel in both roles, contributing significantly to our projects. Beyond his technical
              skills, Arhaan exhibited outstanding problem-solving abilities, teamwork, and professionalism. He
              consistently approached challenges with a positive mindset and a willingness to go the extra mile, making
              him a valued member of our team.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-300 to-white p-0.5">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    A
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Arnav Madan</h4>
                <p className="text-xs text-gray-400">Co-Founder, Niramaya</p>
              </div>
            </div>
          </motion.div>

          {/* Additional testimonial for visual balance */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
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

            <motion.div
              className="text-4xl text-gray-600 font-serif mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              <Quote size={40} className="text-gray-600" />
            </motion.div>

            <p className="text-gray-300 mb-6 relative z-10 text-sm">
              Bhagyashree's eye for design and technical skills are truly impressive. Her ability to translate complex
              requirements into intuitive interfaces made our collaboration seamless. She consistently delivered
              high-quality work ahead of schedule and was always receptive to feedback. Her passion for frontend
              development and UI/UX design is evident in every project she touches.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-300 to-white p-0.5">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    R
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Rahul Sharma</h4>
                <p className="text-xs text-gray-400">Project Lead, CodeNex</p>
              </div>
            </div>
          </motion.div>

          {/* Add a third testimonial for more content */}
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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

            <motion.div
              className="text-4xl text-gray-600 font-serif mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 3, 0, -3, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            >
              <Quote size={40} className="text-gray-600" />
            </motion.div>

            <p className="text-gray-300 mb-6 relative z-10 text-sm">
              Working with Bhagyashree on our startup's website redesign was an absolute pleasure. Her creative approach
              to UI/UX challenges and deep understanding of frontend technologies resulted in a website that exceeded
              our expectations. She has a unique talent for balancing aesthetic appeal with functional design, creating
              interfaces that are both beautiful and intuitive to use. I highly recommend her for any frontend
              development or design project.
            </p>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-300 to-white p-0.5">
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                    P
                  </span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm">Priya Desai</h4>
                <p className="text-xs text-gray-400">Founder, TechStart Solutions</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
