"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Mail, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const [activeLink, setActiveLink] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 80)

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setScrollDirection("down")
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up")
      }

      lastScrollY = currentScrollY

      const sections = document.querySelectorAll("section[id]")
      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 140
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
          currentSection = sectionId
        }
      })

      setActiveLink(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const navLinks = [
    { id: "home", label: "About" },
    { id: "work", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
  ]

  // Show full menu when at top OR scrolling up OR hovered OR mobile menu open
  const showFullMenu = !scrolled || scrollDirection === "up" || isHovered || mobileMenuOpen

  return (
    <>
      {/* Top Left Fixed Location Text (Pure text) */}
      <motion.div
        className="fixed top-9 sm:top-10 left-6 sm:left-10 z-50 text-xs sm:text-sm font-medium tracking-widest text-gray-300 uppercase cursor-pointer pointer-events-auto select-none"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.05, color: "#ffffff" }}
        onClick={() => handleLinkClick("home")}
      >
        NAVI MUMBAI, IN
      </motion.div>

      {/* Dynamic Morphing Island / Notch Navbar */}
      <motion.header
        className="fixed top-5 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <motion.div
          layout
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 26,
            mass: 0.8,
          }}
          className={`rounded-full flex items-center justify-between pointer-events-auto shadow-2xl border overflow-hidden backdrop-blur-2xl transition-colors duration-500 ${
            scrolled
              ? "bg-black/90 border-white/20 shadow-black/90"
              : "bg-black/60 border-white/15"
          }`}
          style={{
            width: showFullMenu ? "100%" : "auto",
            maxWidth: showFullMenu ? "64rem" : "18rem",
            padding: "0.5rem 1rem",
          }}
        >
          {/* Left Profile Avatar & Status Pill */}
          <motion.div
            layout="position"
            className="flex items-center gap-2.5 cursor-pointer flex-shrink-0"
            onClick={() => handleLinkClick("home")}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-gray-700 via-gray-300 to-white p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-gray-950 rounded-full flex items-center justify-center text-xs font-bold text-white uppercase tracking-tighter">
                BB
              </div>
            </div>

            <motion.div
              layout
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-2 whitespace-nowrap overflow-hidden"
            >
              {!showFullMenu && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-xs font-semibold text-gray-200 tracking-wide">Available for work</span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#fbbf24]" />
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-0.5 opacity-70" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Desktop Navigation Links */}
          <motion.nav
            layout
            className="hidden md:flex items-center gap-1 sm:gap-1.5 whitespace-nowrap overflow-hidden"
            style={{ opacity: showFullMenu ? 1 : 0, display: showFullMenu ? "flex" : "none" }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.id
              return (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.id)
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border border-white/80 bg-white/10 rounded-full shadow-inner"
                      layoutId="navbarActivePillOutline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </motion.nav>

          {/* Right Action Button ("Work with me") */}
          <div
            className="hidden md:flex items-center flex-shrink-0"
            style={{ opacity: showFullMenu ? 1 : 0, display: showFullMenu ? "flex" : "none" }}
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("contact")
              }}
              className="px-5 py-2 rounded-full bg-white text-black text-xs font-bold tracking-tight flex items-center gap-2 hover:bg-gray-200 transition-all shadow-lg cursor-pointer whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>Work with me</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </motion.div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-16 left-4 right-4 bg-gray-950/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl md:hidden overflow-hidden pointer-events-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      activeLink === link.id ? "bg-white text-black" : "text-gray-300 hover:text-white"
                    }`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.id)
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick("contact")
                  }}
                  className="mt-2 py-3 rounded-xl bg-white text-black text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="w-4 h-4 fill-black stroke-black" />
                  <span>Work with me</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
