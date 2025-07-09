"use client"
import type { AnimationGeneratorType } from "framer-motion";
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import PortfolioShowcase from "./portfolio-showcase"
import AboutSection from "./about-section"
import EducationJourney from "./education-journey"
import WorkExperience from "./work-experience"
import SkillsExpertise from "./skills-expertise"
import ContactSection from "./contact-section"
import Navbar from "./navbar"
import CollegeClubs from "./college-clubs"
// import Testimonials from "./testimonials"

export default function MainContent() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Determine active section based on scroll position
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

  // Stagger children animations
const container = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const, // <-- Fix
      stiffness: 100,
      damping: 20,
    },
  },
};

  const item = {
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
        <motion.div variants={item} id="home" className="min-h-screen flex items-center justify-center">
          <AboutSection />
        </motion.div>

        <motion.div variants={item} id="work" className="min-h-screen flex items-center justify-center">
          <WorkExperience />
        </motion.div>

        <motion.div variants={item} id="education" className="min-h-screen flex items-center justify-center">
          <EducationJourney />
        </motion.div>
{/* 
        <motion.div variants={item} id="college-clubs" className="min-h-screen flex items-center justify-center">
          <CollegeClubs />
        </motion.div> */}

        <motion.div variants={item} id="skills" className="min-h-screen flex items-center justify-center">
          <SkillsExpertise />
        </motion.div>

        <motion.div variants={item} id="projects" className="min-h-screen flex items-center justify-center">
          <PortfolioShowcase />
        </motion.div>
{/* 
        <motion.div variants={item} id="testimonials" className="min-h-screen flex items-center justify-center">
          <Testimonials />
        </motion.div> */}

        <motion.div variants={item} id="contact" className="min-h-screen flex items-center justify-center">
          <ContactSection />
        </motion.div>
      </motion.div>
    </div>
  )
}
