"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Maximize2, GraduationCap, Building, BookOpen, Calendar, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import { useTheme } from "next-themes"
import "leaflet/dist/leaflet.css"

export default function EducationJourney() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [activeEdu, setActiveEdu] = useState<any | null>(null)
  const [isMobileCardExpanded, setIsMobileCardExpanded] = useState(true)
  useEffect(() => {
    if (!activeEdu && educationPointers.length > 0) {
      setActiveEdu(educationPointers[0])
    }
  }, [])
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && (theme === "light" || resolvedTheme === "light")

  // Education locations spaced well across Kharghar so hover popups never overlap
  const educationPointers = [
    {
      id: "itm",
      name: "ITM Group of Institutions",
      shortName: "ITM GROUP OF INSTITUTIONS",
      degree: "BACHELOR OF TECHNOLOGY, COMPUTER SCIENCE ENGINEERING",
      period: "Aug 2023 - Present (2027)",
      sector: "Sector 4, Kharghar",
      coords: [19.0270, 73.0620] as [number, number],
      badge: "B.Tech Degree",
      icon: GraduationCap,
      description:
        "Pursuing comprehensive B.Tech curriculum in Computer Science Engineering with a specialization in Data Science, AI/ML models, system design, and scalable full-stack applications.",
      highlights: [
        "Data Science, Machine Learning & Neural Networks",
        "Data Structures, Algorithms (C++) & System Design",
        "Technical Lead at CodeNex SRM & Shark Tank Winner",
      ],
    },
    {
      id: "ramseth",
      name: "Ramsheth Thakur Higher Secondary Vidyalaya",
      shortName: "RAMSETH THAKUR VIDYALAYA",
      degree: "HIGHER SECONDARY — PCMB (IT), 12TH STANDARD",
      period: "2020 - 2022",
      sector: "Sector 35, Kharghar",
      coords: [19.0760, 73.0810] as [number, number],
      badge: "12th Standard",
      icon: Building,
      description:
        "Completed Higher Secondary Certificate in PCMB (Physics, Chemistry, Mathematics, Biology) with Information Technology, building rigorous mathematical acumen and analytical logic.",
      highlights: [
        "Major in PCMB with Information Technology (IT)",
        "Advanced Mathematics, Probability & Logic",
        "Distinction in Science & Technical Exhibitions",
      ],
    },
    {
      id: "harmony",
      name: "Harmony Public School, Kharghar",
      shortName: "HARMONY PUBLIC SCHOOL",
      degree: "SECONDARY EDUCATION — 10TH STANDARD (CBSE)",
      period: "Completed 2020",
      sector: "Sector 5 / 12, Kharghar",
      coords: [19.0490, 73.0670] as [number, number],
      badge: "10th Standard",
      icon: BookOpen,
      description:
        "Formative secondary schooling completed with distinction in Kharghar under CBSE curriculum. Built foundational excellence in computer science and quantitative mathematics.",
      highlights: [
        "Completed 10th Standard CBSE with High Distinction",
        "Active in Creative Innovation Competitions",
        "Early Leadership in School Cultural & Tech Activities",
      ],
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return
    let isMounted = true

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return

      // Clean up previous instance if exists (prevent Next.js fast-refresh container already initialized error)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }

      // Kharghar Node Center - dynamically adjusted for mobile viewport framing
      // On mobile, the bottom card takes ~220px, so shifting the geographic center south brings all pins into the visible upper window
      const isMobile = window.innerWidth < 768
      const khargharCenter: [number, number] = isMobile ? [19.038, 73.071] : [19.0515, 73.0715]

      const map = L.map(mapContainerRef.current, {
        center: khargharCenter,
        zoom: isMobile ? 11.8 : 13,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      })

      mapInstanceRef.current = map

      if (isLight) {
        // Light Mode: Official ESRI Canvas Light Gray Map (Snowy alpine terrain, soft glacial waters, clean street lines, NO API KEY REQUIRED)
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 16,
          attribution: "Esri Light Gray",
        }).addTo(map)

        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 16,
          opacity: 0.95,
        }).addTo(map)
      } else {
        // Dark Mode: Exact Original ESRI High-Resolution Satellite Map + Reference Overlay (100% UNTOUCHED)
        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 19,
          attribution: "Esri Satellite",
        }).addTo(map)

        L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", {
          maxZoom: 19,
          opacity: 0.95,
        }).addTo(map)
      }

      // Zoom Control positioned - topright on mobile so it is not covered by bottom card
      L.control.zoom({ position: isMobile ? "topright" : "bottomright" }).addTo(map)

      // Add Custom Location Markers
      educationPointers.forEach((edu) => {
        const pinBadgeBg = isLight
          ? "bg-white/95 text-slate-900 border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.18)] group-hover:border-slate-400 group-hover:bg-slate-50"
          : "bg-black/95 text-white border-white/40 shadow-2xl group-hover:border-white group-hover:bg-white/20"
        const pinCircleBg = isLight
          ? "bg-slate-900 text-white border-2 border-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] group-hover:scale-120 group-hover:bg-slate-800"
          : "bg-slate-800 text-white border-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.45)] group-hover:scale-120 group-hover:bg-slate-700"

        const customIcon = L.divIcon({
          className: "custom-satellite-pin",
          html: `
            <div class="relative flex flex-col items-center cursor-pointer group" style="transform: translate(-50%, -50%);">
              <!-- Pulsing Radar Glow -->
              <div class="absolute -inset-3 rounded-full ${isLight ? "bg-slate-400/30" : "bg-white/25"} animate-ping pointer-events-none"></div>
              
              <!-- Sleek Location Sign Pin -->
              <div class="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full ${pinCircleBg} flex items-center justify-center transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3" fill="currentColor"/>
                </svg>
              </div>

              <!-- Institution Name Badge Below Pin -->
              <div class="mt-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full ${pinBadgeBg} backdrop-blur-md border text-[10px] sm:text-xs md:text-sm font-mono font-bold uppercase whitespace-nowrap tracking-wider transition-colors">
                ${edu.shortName}
              </div>
            </div>
          `,
          iconSize: [48, 48],
          iconAnchor: [24, 24],
          popupAnchor: [0, -30],
        })

        const marker = L.marker(edu.coords, { icon: customIcon }).addTo(map)

        // On desktop, show rich hover popup; on mobile, the bottom floating card displays the institution details
        const isMobileScreen = window.innerWidth < 768
        if (!isMobileScreen) {
          const popupBg = isLight ? "rgba(255, 255, 255, 0.98)" : "rgba(10, 12, 18, 0.96)"
          const popupColor = isLight ? "#0f172a" : "#ffffff"
          const popupBorder = isLight ? "2px solid #cbd5e1" : "2px solid #ffffff"
          const popupShadow = isLight
            ? "0 20px 45px rgba(0,0,0,0.18)"
            : "0 25px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255,255,255,0.3)"
          const badgeBg = isLight ? "#f1f5f9" : "#334155"
          const badgeColor = isLight ? "#0f172a" : "#ffffff"
          const periodColor = isLight ? "#64748b" : "#cbd5e1"
          const degreeColor = isLight ? "#334155" : "#f1f5f9"
          const sectorColor = isLight ? "#475569" : "#e2e8f0"
          const dividerColor = isLight ? "#e2e8f0" : "#334155"

          const popupContent = `
            <div style="font-family: system-ui, sans-serif; background: ${popupBg}; backdrop-filter: blur(20px); color: ${popupColor}; border: ${popupBorder}; border-radius: 18px; padding: 14px 16px; min-width: 230px; max-width: 320px; box-shadow: ${popupShadow};">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-size: 11.5px; font-weight: 800; font-family: monospace; background: ${badgeBg}; color: ${badgeColor}; padding: 4px 12px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 1px;">
                  ${edu.badge}
                </span>
                <span style="font-size: 12px; font-weight: 600; color: ${periodColor}; font-family: monospace;">${edu.period}</span>
              </div>
              <h4 style="font-size: 17px; font-weight: 900; margin: 6px 0 3px 0; text-transform: uppercase; color: ${popupColor}; letter-spacing: 0.5px;">
                ${edu.name}
              </h4>
              <p style="font-size: 13px; color: ${degreeColor}; font-weight: 600; font-family: monospace; margin: 0 0 10px 0; line-height: 1.4;">
                ${edu.degree}
              </p>
              <div style="display: flex; align-items: center; gap: 5px; font-size: 13px; color: ${sectorColor}; border-top: 1px solid ${dividerColor}; padding-top: 10px; font-weight: 500;">
                <span>📍 ${edu.sector}</span>
              </div>
            </div>
          `

          const popup = L.popup({
            closeButton: false,
            className: "custom-leaflet-satellite-popup",
            offset: [0, -14],
          }).setContent(popupContent)

          marker.bindPopup(popup)

          marker.on("mouseover", () => {
            marker.openPopup()
            setActiveEdu(edu)
          })
        }

        marker.on("click", () => {
          setActiveEdu(edu)
          const isMobileNow = window.innerWidth < 768
          const targetLat = isMobileNow ? edu.coords[0] - 0.008 : edu.coords[0]
          map.flyTo([targetLat, edu.coords[1]], isMobileNow ? 13.5 : 15, { duration: 1.2 })
        })
      })

      // Invalidate map size after animation frames to ensure sharp rendering
      setTimeout(() => {
        map.invalidateSize()
      }, 400)
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isLight])

  const handleResetKhargharView = () => {
    if (mapInstanceRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768
      const khargharCenter: [number, number] = isMobile ? [19.038, 73.071] : [19.0515, 73.0715]
      mapInstanceRef.current.flyTo(khargharCenter, isMobile ? 11.8 : 13, { duration: 1.2 })
    }
  }

  const handleFocusEdu = (edu: typeof educationPointers[0]) => {
    setActiveEdu(edu)
    if (mapInstanceRef.current) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768
      const targetLat = isMobile ? edu.coords[0] - 0.008 : edu.coords[0]
      mapInstanceRef.current.flyTo([targetLat, edu.coords[1]], isMobile ? 13.5 : 14.5, { duration: 1.2 })
    }
  }

  return (
    <section
      id="education"
      className="relative w-full h-[680px] xs:h-[740px] sm:h-[840px] md:h-[900px] bg-black overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-SCREEN EDGE-TO-EDGE SATELLITE MAP (NO CONTAINER BOX, 100% WIDTH)  */}
      {/* ========================================================================= */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />

      {/* Top & Bottom Cinematic Shadow Vignettes */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#e8f2fc]/80 dark:from-black via-[#e8f2fc]/20 dark:via-black/60 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#e8f2fc]/80 dark:from-black via-[#e8f2fc]/20 dark:via-black/60 to-transparent pointer-events-none z-20" />

      {/* ========================================================================= */}
      {/* 2. HORIZON HEADER (MATCHING WORK EXPERIENCE EXACTLY)                      */}
      {/* ========================================================================= */}
      <div className="absolute top-4 sm:top-8 inset-x-0 w-full px-3 sm:px-8 lg:px-12 xl:px-14 z-30 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-300/40 dark:border-white/15 w-full text-left">
          <div className="pointer-events-auto">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif uppercase drop-shadow-sm dark:drop-shadow-md">
              EDUCATION JOURNEY
            </h2>
          </div>

          {/* Quick Focus Pills & Reset View Button */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="p-1 sm:p-1.5 rounded-xl bg-white/90 dark:bg-neutral-950/90 backdrop-blur-xl border border-slate-300 dark:border-white/15 flex items-center gap-1 sm:gap-1.5 shadow-sm overflow-x-auto scrollbar-none max-w-full">
              {educationPointers.map((edu) => (
                <button
                  key={edu.id}
                  onClick={() => handleFocusEdu(edu)}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    activeEdu?.id === edu.id
                      ? "bg-slate-900 text-white dark:bg-white dark:text-black font-bold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                      : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{edu.shortName.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleResetKhargharView}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-white/15 dark:hover:bg-white/25 border border-slate-700 dark:border-white/25 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Maximize2 className="w-4 h-4" />
              <span>RESET VIEW</span>
            </button>
          </div>
        </div>
      </div>


      {/* ========================================================================= */}
      {/* 3. MOBILE FLOATING EDUCATION CARD (< md screens)                          */}
      {/* ========================================================================= */}
      <div className="absolute bottom-3 inset-x-3 z-30 md:hidden pointer-events-auto">
        <AnimatePresence mode="wait">
          {isMobileCardExpanded ? (
            <motion.div
              key="expanded-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl p-4 border shadow-2xl backdrop-blur-2xl transition-colors ${
                isLight
                  ? "bg-white/95 border-slate-300 text-slate-900 shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
                  : "bg-[#0a0c12]/95 border-white/20 text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              }`}
            >
              {/* Top row: Badge + Period + Minimize Button */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isLight
                        ? "bg-slate-100 text-slate-800 border border-slate-200"
                        : "bg-white/10 text-white border border-white/15"
                    }`}
                  >
                    {activeEdu?.badge}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-600 dark:text-neutral-300">
                    {activeEdu?.period}
                  </span>
                </div>

                <button
                  onClick={() => setIsMobileCardExpanded(false)}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-neutral-400 transition-colors cursor-pointer"
                  aria-label="Minimize card"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Institution Name & Degree */}
              <h3 className="text-sm font-bold font-sans text-slate-900 dark:text-white uppercase tracking-tight line-clamp-1">
                {activeEdu?.name}
              </h3>
              <p className="text-xs font-mono font-medium text-slate-600 dark:text-neutral-300 mt-0.5 line-clamp-1">
                {activeEdu?.degree}
              </p>

              {/* Sector / Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 mt-2 font-mono">
                <MapPin className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                <span>{activeEdu?.sector}</span>
              </div>

              {/* Highlights */}
              <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/10 space-y-1">
                {activeEdu?.highlights.slice(0, 2).map((h: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>

              {/* Navigation dots + Center Campus button */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-1.5">
                  {educationPointers.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleFocusEdu(p)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeEdu?.id === p.id
                          ? "bg-slate-900 dark:bg-white w-6"
                          : "bg-slate-300 dark:bg-white/30 w-2"
                      }`}
                      aria-label={`Select ${p.name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => activeEdu && handleFocusEdu(activeEdu)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isLight
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  <span>Center Campus</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="minimized-pill"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileCardExpanded(true)}
              className={`rounded-xl px-3.5 py-2.5 border shadow-xl backdrop-blur-2xl flex items-center justify-between cursor-pointer ${
                isLight
                  ? "bg-white/95 border-slate-300 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
                  : "bg-[#0a0c12]/95 border-white/20 text-white shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isLight ? "bg-slate-100 text-slate-800" : "bg-white/10 text-white"
                  }`}
                >
                  {activeEdu?.badge}
                </span>
                <span className="text-xs font-sans font-bold uppercase truncate">
                  {activeEdu?.name}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {educationPointers.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleFocusEdu(p)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        activeEdu?.id === p.id
                          ? "bg-slate-900 dark:bg-white w-4"
                          : "bg-slate-300 dark:bg-white/30 w-1.5"
                      }`}
                      aria-label={`Select ${p.name}`}
                    />
                  ))}
                </div>
                <button
                  className="p-1 rounded-md text-slate-500 dark:text-neutral-400"
                  aria-label="Expand card"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global CSS for Leaflet Satellite Custom Popup & Satellite Tiles */}
      <style jsx global>{`
        /* Dark mode (default): Lighter Monotone Gray Tone (smooth slate, graphite & silver-gray, perfectly balanced) */
        .leaflet-tile-pane,
        .leaflet-tile,
        html.dark .leaflet-tile-pane,
        html.dark .leaflet-tile {
          filter: grayscale(100%) brightness(100%) contrast(108%) !important;
        }

        /* Light theme ONLY: Crisp native snowy alpine Positron map */
        html:not(.dark) .leaflet-tile-pane,
        html:not(.dark) .leaflet-tile {
          filter: contrast(1.02) brightness(1.01) !important;
        }

        .custom-leaflet-satellite-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
        .custom-leaflet-satellite-popup .leaflet-popup-tip {
          background: #0f121a !important;
          border: 2px solid #ffffff !important;
        }
        html:not(.dark) .custom-leaflet-satellite-popup .leaflet-popup-tip {
          background: #ffffff !important;
          border: 2px solid #cbd5e1 !important;
        }
        .custom-leaflet-satellite-popup .leaflet-popup-content {
          margin: 0 !important;
          line-height: inherit !important;
        }
        .leaflet-container {
          background-color: #111318 !important;
          font-family: inherit;
        }
        html:not(.dark) .leaflet-container {
          background-color: #eaf1f8 !important;
        }
        .leaflet-control-zoom {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8) !important;
          margin-right: 24px !important;
          margin-bottom: 24px !important;
        }
        .leaflet-control-zoom a {
          background: rgba(15, 18, 26, 0.9) !important;
          color: #ffffff !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #334155 !important;
          color: #ffffff !important;
        }
        html:not(.dark) .leaflet-control-zoom {
          border: 1px solid rgba(0, 0, 0, 0.15) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
        }
        html:not(.dark) .leaflet-control-zoom a {
          background: rgba(255, 255, 255, 0.95) !important;
          color: #0f172a !important;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
        }
        html:not(.dark) .leaflet-control-zoom a:hover {
          background: #e2e8f0 !important;
          color: #000000 !important;
        }
      `}</style>
    </section>
  )
}
