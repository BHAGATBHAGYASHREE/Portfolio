"use client"

import type React from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Send, MessageSquare, Check } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import SocialDock from "./social-dock"

export default function ContactSection() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.15 })

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

  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const serviceId = "service_0rr543j"
    const templateId = "template_rrsso5i"
    const publicKey = "IcKtP3x9fclqFLQDM"

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toLocaleString(),
    }

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully! I will reply as soon as possible.",
        })
        setFormData({ name: "", email: "", message: "" })
      })
      .catch((error) => {
        console.error("Email sending failed:", error)
        setSubmitStatus({
          success: false,
          message: "Failed to send message. Please reach out directly via email.",
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section className="min-h-screen py-24 relative flex items-center justify-center overflow-hidden" id="contact" ref={ref}>
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Heading */}
        <motion.div
          className="flex flex-col items-center mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>Let's Connect</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif tracking-tight text-white mb-2 italic">
            Let's build something <span className="not-italic font-sans font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">phenomenal, together!</span>
          </h2>
        </motion.div>

        {/* 3D Social Dock Widget (Exact Match to User Video) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SocialDock />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Card */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-xl border border-white/15 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Let's build something awesome together</h3>
              <p className="text-gray-300 text-sm font-light leading-relaxed mb-8">
                Feel free to reach out for project inquiries, UI/UX design consultations, or potential opportunities!
              </p>

              <div className="space-y-4 mb-8">
                {/* Email Item */}
                <div
                  onClick={() => handleCopy("bhagyashreebhaagat8@gmail.com", "email")}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Email</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-200">bhagyashreebhaagat8@gmail.com</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                    {copiedField === "email" ? "Copied!" : "Click to Copy"}
                  </span>
                </div>

                {/* Phone Item */}
                <div
                  onClick={() => handleCopy("9167177647", "phone")}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-semibold uppercase">Phone</p>
                      <p className="text-xs sm:text-sm font-medium text-gray-200">9167177647</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
                    {copiedField === "phone" ? "Copied!" : "Click to Copy"}
                  </span>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase">Location</p>
                    <p className="text-xs sm:text-sm font-medium text-gray-200">Navi Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Badges */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/10">
              <motion.a
                href="https://github.com/BHAGATBHAGYASHREE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/bhagyashree-bhagat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-xl border border-white/15 rounded-3xl p-8 hover:border-white/30 transition-all duration-300 shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-950/80 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-950/80 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-950/80 border border-white/15 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all resize-none"
                  placeholder="Hello, I'd like to discuss a project..."
                  required
                />
              </div>

              {submitStatus && (
                <div
                  className={`text-xs p-3 rounded-xl border ${
                    submitStatus.success
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <motion.button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shadow-lg cursor-pointer disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
