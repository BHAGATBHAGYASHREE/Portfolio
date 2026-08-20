"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Rocket, Users, Award, Sparkles } from "lucide-react"

export default function CollegeClubs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.15 })

  const clubs = [
    {
      name: "CodeNex Club SRM",
      role: "Technical Team Member",
      period: "Sep 2024 - Present",
      icon: Code,
      iconLetter: "C",
      description:
        "Contributed to multiple club projects as a Web Developer and UI/UX designer by building responsive frontends and crafting clean, user-friendly interfaces.",
      keyProject: "Club website redesign with React and Tailwind CSS",
      achievement: "Led UI/UX workshop for 30+ club members",
      skills: ["React", "Tailwind CSS", "Figma", "UI/UX", "JavaScript"],
    },
    {
      name: "Founders Club",
      role: "Creative Associate Lead",
      period: "Oct 2023 - Present",
      icon: Rocket,
      iconLetter: "F",
      description:
        "Spearheaded creative initiatives and design projects for the entrepreneurship club, focusing on branding, marketing materials, and digital presence to promote startup culture on campus.",
      keyProject: "Startup Showcase Event branding and marketing collateral",
      achievement: "Increased event participation by 40% through creative marketing",
      skills: ["Branding", "Marketing", "Event Design", "Graphic Design", "Social Media"],
    },
  ]

  return (
    <section className="min-h-screen py-24 relative flex items-center justify-center overflow-hidden" id="college-clubs" ref={ref}>
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Heading */}
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
            <Users className="w-3.5 h-3.5 text-white" />
            <span>Leadership & Leadership</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            COLLEGE CLUBS & ORGANIZATIONS
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto w-full">
          {clubs.map((club, index) => {
            const IconComp = club.icon
            return (
              <motion.div
                key={club.name}
                className="bg-gray-900/40 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 hover:border-white/30 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-400 to-gray-800 p-0.5 shadow-md">
                      <div className="w-full h-full bg-gray-950 rounded-xl flex items-center justify-center">
                        <IconComp className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-white tracking-wide">{club.name}</h3>
                        <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-0.5">{club.role}</p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-gray-300 w-fit">
                        {club.period}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed mb-5 font-light">
                      {club.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs">
                        <span className="block text-gray-400 font-semibold uppercase text-[10px] mb-1">Key Project</span>
                        <span className="text-gray-200 font-medium">{club.keyProject}</span>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs">
                        <span className="block text-gray-400 font-semibold uppercase text-[10px] mb-1">Achievement</span>
                        <span className="text-gray-200 font-medium">{club.achievement}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {club.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
