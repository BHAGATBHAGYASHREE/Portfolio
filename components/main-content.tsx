"use client"

import type { Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import PortfolioShowcase from "./portfolio-showcase"
import AboutSection from "./about-section"
import AboutPhilosophy from "./about-philosophy"
import EducationJourney from "./education-journey"
import WorkExperience from "./work-experience"
import SkillsExpertise from "./skills-expertise"
import ContactSection from "./contact-section"
import Navbar from "./navbar"

export default function MainContent() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  // Stagger children animations with strict type annotation
  const container: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <motion.div className="w-full" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="min-h-screen w-full">
          <AboutSection />
        </motion.div>

        <motion.div variants={item} className="w-full flex items-center justify-center">
          <AboutPhilosophy />
        </motion.div>

        <motion.div variants={item} id="work" className="min-h-screen flex items-center justify-center">
          <WorkExperience />
        </motion.div>

        <motion.div variants={item} id="education" className="min-h-screen flex items-center justify-center">
          <EducationJourney />
        </motion.div>

        <motion.div variants={item} id="skills" className="min-h-screen flex items-center justify-center">
          <SkillsExpertise />
        </motion.div>

        <motion.div variants={item} id="projects" className="min-h-screen flex items-center justify-center">
          <PortfolioShowcase />
        </motion.div>

        <motion.div variants={item} id="contact" className="min-h-screen flex items-center justify-center">
          <ContactSection />
        </motion.div>
      </motion.div>
    </div>
  )
}
