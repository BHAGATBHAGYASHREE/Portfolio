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
import FooterSpace from "./footer-space"
import Navbar from "./navbar"
import { Cursor3D } from "./cursor-3d"
import { Section3DWrapper } from "./section-3d-wrapper"

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

  // Stagger children animations without sticky-breaking transforms
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="min-h-screen bg-transparent dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 relative">
      <Cursor3D />
      <Navbar />
      <motion.div className="w-full" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="min-h-screen w-full">
          <AboutSection />
        </motion.div>

        <Section3DWrapper>
          <AboutPhilosophy />
        </Section3DWrapper>

        <Section3DWrapper id="work">
          <WorkExperience />
        </Section3DWrapper>

        <Section3DWrapper id="education">
          <EducationJourney />
        </Section3DWrapper>

        <Section3DWrapper id="skills">
          <SkillsExpertise />
        </Section3DWrapper>

        <div id="projects" className="w-full relative">
          <PortfolioShowcase />
        </div>

        <Section3DWrapper id="contact">
          <ContactSection />
        </Section3DWrapper>

        {/* Aesthetic Space Theme Footer with Monumental BHAGYASHREE Typography */}
        <FooterSpace />
      </motion.div>
    </div>
  )
}

