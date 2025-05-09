"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }

      // Update active link based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId
        }
      })

      setActiveLink(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const handleLinkClick = (sectionId: string) => {
    setActiveLink(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-4 shadow-lg" : "bg-transparent py-6"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white"
          whileHover={{ 
            scale: 1.05,
            y: -2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          BHAGYASHREE
        </motion.a>
        <nav className="hidden md:flex items-center space-x-10">
          {[
            { id: "home", label: "About" },
            { id: "work", label: "Experience" },
            { id: "education", label: "Education" },
            { id: "skills", label: "Skills" },
            { id: "projects", label: "Projects" },
            { id: "contact", label: "Contact" },
          ].map((link) => (
            <motion.a
              key={link.id}
              href={`#${link.id}`}
              className={`relative text-lg ${activeLink === link.id ? "text-white" : "text-gray-400"} hover:text-white transition-colors`}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(link.id)
              }}
              whileHover={{ 
                scale: 1.1,
                y: -2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {link.label}
              {activeLink === link.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-300 to-white"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="/Bhagyashree.pdf"
            target="_blank"
            className="relative bg-gradient-to-r from-gray-300 to-white text-black px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-300 text-lg font-medium group"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            rel="noreferrer"
          >
            <span className="relative z-10">Resume</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.a>
        </nav>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-md py-4 px-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {[
                { id: "home", label: "About" },
                { id: "work", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`${activeLink === link.id ? "text-white" : "text-gray-400"} hover:text-white transition-colors py-2 text-lg`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.id)
                  }}
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/Bhagyashree.pdf"
                target="_blank"
                className="relative bg-gradient-to-r from-gray-300 to-white text-black px-4 py-2.5 rounded-xl hover:opacity-90 transition-all duration-300 text-center text-lg font-medium w-full group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                rel="noreferrer"
              >
                <span className="relative z-10">Resume</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
