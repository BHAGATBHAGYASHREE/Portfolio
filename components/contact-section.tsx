"use client"

import type React from "react"

import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import emailjs from '@emailjs/browser'

export default function ContactSection() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    // EmailJS configuration
    // You'll need to replace these with your actual EmailJS service, template, and user IDs
    const serviceId = 'service_0rr543j' // Replace with your EmailJS service ID
    const templateId = 'template_rrsso5i' // Replace with your EmailJS template ID
    const publicKey = 'IcKtP3x9fclqFLQDM' // Replace with your EmailJS public key
    
    // Prepare template parameters
    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      date: new Date().toLocaleString()
    }
    
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully:', response)
        setSubmitStatus({
          success: true,
          message: 'Your message has been sent successfully!'
        })
        // Reset form
        setFormData({ name: "", email: "", message: "" })
      })
      .catch((error) => {
        console.error('Email sending failed:', error)
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again later.'
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  // Generate space particles
  const generateParticles = (count: number) => {
    const particles = []
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1
      particles.push({
        id: i,
        size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    return particles
  }

  const particles = generateParticles(30)

  return (
    <section className="min-h-screen py-16 relative flex items-center justify-center" id="contact" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Space background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          {/* Floating particles */}
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
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          {/* Floating envelope */}
          <motion.div
            className="absolute top-[20%] right-[15%] w-16 h-12"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <div className="w-full h-full bg-gray-800 rounded-lg relative">
              <div className="absolute inset-0 border-2 border-gray-700 rounded-lg"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="w-full h-full overflow-hidden">
                  <div className="w-full h-full bg-gray-700 transform rotate-45 origin-bottom-left translate-y-6"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating phone */}
          <motion.div
            className="absolute bottom-[25%] left-[10%] w-8 h-14 bg-gray-800 rounded-lg border border-gray-700"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -3, 0, 3, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: 1,
            }}
          >
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gray-700 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full"></div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center gap-4 mb-12 justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-10 bg-gradient-to-b from-gray-300 to-white rounded-full"></div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
            GET IN TOUCH
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:shadow-white/5 transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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

            <h3 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
              Contact Information
            </h3>

            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4 group/item"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-gray-300 to-white rounded-lg p-0.5"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <Mail size={16} className="text-gray-300" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-gray-400 mb-1 text-xs">Email</p>
                  <p className="group-hover/item:text-gray-300 transition-colors text-sm">
                    bhagyashreebhaagat8@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 group/item"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-gray-300 to-white rounded-lg p-0.5"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <Phone size={16} className="text-gray-300" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-gray-400 mb-1 text-xs">Phone</p>
                  <p className="group-hover/item:text-gray-300 transition-colors text-sm">9167177647</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4 group/item"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-gray-300 to-white rounded-lg p-0.5"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                    <MapPin size={16} className="text-gray-300" />
                  </div>
                </motion.div>
                <div>
                  <p className="text-gray-400 mb-1 text-xs">Location</p>
                  <p className="group-hover/item:text-gray-300 transition-colors text-sm">Navi Mumbai, Maharashtra</p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <motion.a
                href="https://github.com/BHAGATBHAGYASHREE"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={14} />
                GitHub Profile
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/bhagyashree-bhagat"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={14} />
                LinkedIn Profile
              </motion.a>
            </div>
          </motion.div>

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

            <h3 className="text-xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
              Send Me a Message
            </h3>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-400 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 text-white text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 text-white text-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-gray-400 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/20 text-white text-sm resize-none"
                  placeholder="Hello, I'd like to discuss a project..."
                  required
                ></textarea>
              </div>

              {submitStatus && (
                <div className={`text-sm ${submitStatus.success ? 'text-green-400' : 'text-red-400'} bg-gray-800/50 p-2 rounded-lg`}>
                  {submitStatus.message}
                </div>
              )}

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-300 to-white text-black font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
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
