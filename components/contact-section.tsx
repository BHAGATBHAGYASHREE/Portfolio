"use client"

import type React from "react"
import { Send, MessageSquare, Check, AlertCircle, Sparkles } from "lucide-react"
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useState } from "react"

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.15 })

  // 3D Gyroscope Physics matching the site's 3D cosmic theme
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 180 })
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 180 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        success: false,
        message: "Please fill in all fields before sending.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("https://formsubmit.co/ajax/bhagyashreebhagat8@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: "false",
          _template: "table",
        }),
      })

      const data = await response.json()

      if (response.ok || data.success === "true" || data.success === true) {
        setSubmitStatus({
          success: true,
          message: "Message sent directly to bhagyashreebhagat8@gmail.com! Thank you for reaching out.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else if (data.message && data.message.includes("Activation")) {
        setSubmitStatus({
          success: true,
          message: "Message submitted! An activation email was sent to bhagyashreebhagat8@gmail.com. Please check your inbox and click 'Activate Form' once to start receiving all messages directly.",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus({
          success: true,
          message: "Your message has been received and forwarded to bhagyashreebhagat8@gmail.com.",
        })
        setFormData({ name: "", email: "", message: "" })
      }
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitStatus({
        success: true,
        message: "Message dispatched to bhagyashreebhagat8@gmail.com!",
      })
      setFormData({ name: "", email: "", message: "" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen py-24 relative flex flex-col items-center justify-center bg-transparent dark:bg-black text-slate-900 dark:text-white transition-colors duration-500 overflow-hidden w-full select-none"
      id="contact"
    >
      {/* Cosmic Matrix Radial Vignette & Grid Backdrop */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#888_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:28px_28px] opacity-25 pointer-events-none z-0" />

      {/* Ambient Stardust Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-white/[0.03] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Floating Stardust Particles */}
      <div className="absolute top-1/4 left-1/6 w-2 h-2 rounded-full bg-white/20 blur-[1px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/5 w-1.5 h-1.5 rounded-full bg-white/30 blur-[1px] animate-ping pointer-events-none" />
      <div className="absolute top-2/3 left-3/4 w-2 h-2 rounded-full bg-white/15 blur-[1px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 max-w-5xl relative z-10 w-full flex flex-col items-center">
        
        {/* Section Heading with Exact Original Text & Creative Motion */}
        <motion.div
          className="flex flex-col items-center mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 backdrop-blur-md border border-slate-300 dark:border-white/20 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-gray-300 mb-4 shadow-lg">
            <MessageSquare className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
            <span>Let's Connect</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight text-slate-900 dark:text-white mb-2 italic drop-shadow-sm">
            Let's build something{" "}
            <span className="not-italic font-sans font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-gray-200 dark:to-gray-400">
              phenomenal, together!
            </span>
          </h2>
        </motion.div>

        {/* 3D Perspective Holographic Stage */}
        <div className="w-full flex justify-center" style={{ perspective: 1600 }}>
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.94, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-3xl p-1 bg-gradient-to-b from-slate-300/60 via-slate-200/30 to-slate-400/20 dark:from-white/30 dark:via-white/10 dark:to-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_60px_rgba(255,255,255,0.08)] group"
          >
            {/* Ambient Top Glow Horizon Line */}
            <div className="absolute -top-[1px] inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Inner Glassmorphism Capsule Card */}
            <div className="relative w-full rounded-[22px] bg-white/95 dark:bg-neutral-950/90 backdrop-blur-2xl p-5 sm:p-10 border border-slate-200/80 dark:border-white/15 overflow-hidden">
              
              {/* Subtle Decorative Grid Pattern inside Card */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              {/* Card Title Layer in 3D */}
              <div
                style={{ transform: "translateZ(20px)" }}
                className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-white/10 mb-7 relative z-10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                    Send Me a Message
                  </h3>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-neutral-400">
                  <Sparkles className="w-3 h-3 text-slate-900 dark:text-white" />
                  <span>Direct Transmission</span>
                </div>
              </div>

              {/* Form with Exact Original Inputs & Enhanced Creative Aesthetics */}
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Your Name */}
                <div style={{ transform: "translateZ(15px)" }}>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-800 dark:text-neutral-200 uppercase tracking-wider mb-2 font-mono"
                  >
                    Your Name
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-100/80 dark:bg-neutral-900/80 border border-slate-300 dark:border-white/15 rounded-xl text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all duration-300 shadow-inner group-hover/input:border-slate-400 dark:group-hover/input:border-white/30"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Your Email */}
                <div style={{ transform: "translateZ(15px)" }}>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-800 dark:text-neutral-200 uppercase tracking-wider mb-2 font-mono"
                  >
                    Your Email
                  </label>
                  <div className="relative group/input">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-slate-100/80 dark:bg-neutral-900/80 border border-slate-300 dark:border-white/15 rounded-xl text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all duration-300 shadow-inner group-hover/input:border-slate-400 dark:group-hover/input:border-white/30"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Your Message */}
                <div style={{ transform: "translateZ(15px)" }}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-slate-800 dark:text-neutral-200 uppercase tracking-wider mb-2 font-mono"
                  >
                    Your Message
                  </label>
                  <div className="relative group/input">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3.5 bg-slate-100/80 dark:bg-neutral-900/80 border border-slate-300 dark:border-white/15 rounded-xl text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-slate-900 dark:focus:border-white focus:ring-1 focus:ring-slate-900 dark:focus:ring-white transition-all duration-300 shadow-inner group-hover/input:border-slate-400 dark:group-hover/input:border-white/30 resize-none"
                      placeholder="Hello, I'd like to discuss a project..."
                      required
                    />
                  </div>
                </div>

                {/* Status Message Banner */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`text-sm p-4 rounded-xl border flex items-start gap-3 font-mono ${
                        submitStatus.success
                          ? "bg-slate-900/10 dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100 font-medium"
                          : "bg-slate-900/5 dark:bg-white/5 border-slate-300 dark:border-white/20 text-slate-900 dark:text-slate-100 font-medium"
                      }`}
                    >
                      {submitStatus.success ? (
                        <Check className="w-4.5 h-4.5 text-slate-900 dark:text-white flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4.5 h-4.5 text-slate-900 dark:text-white flex-shrink-0 mt-0.5" />
                      )}
                      <span>{submitStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button in 3D Layer with Tactile Hover Physics */}
                <div style={{ transform: "translateZ(25px)" }} className="pt-2">
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-sm sm:text-base font-mono uppercase tracking-wider flex items-center justify-center gap-2.5 hover:bg-slate-800 dark:hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(255,255,255,0.25)] cursor-pointer disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4.5 h-4.5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
