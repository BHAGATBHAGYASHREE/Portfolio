"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Snowflake, Sparkles, RotateCcw, ExternalLink, MessageSquare, Bot, ChevronRight, User } from "lucide-react"
import { useTheme } from "next-themes"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp?: string
  link?: {
    text: string
    url: string
  }
}

interface QAPair {
  keywords: string[]
  question: string
  category: "Flagship" | "Experience" | "Skills" | "Education" | "Projects" | "Contact"
  answer: string
  link?: {
    text: string
    url: string
  }
}

export default function AstronautChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && (theme === "light" || resolvedTheme === "light")

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm Savvy, Bhagyashree's AI assistant. Ask me anything about her projects, experience, skills, or click any suggested topic below!",
      sender: "bot",
      timestamp: "Just now",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [astronautState, setAstronautState] = useState<"idle" | "talking" | "waving">("idle")
  const [activeChipCategory, setActiveChipCategory] = useState<string>("All")
  const fallbackIndexRef = useRef(0)

  // Dynamic varied fallback responses guiding the user to contact Bhagyashree
  const fallbackResponses = [
    {
      text: "I don't have the exact details on that in my knowledge base yet! For direct inquiries, custom questions, or collaborations, please feel free to fill out the contact form below or email Bhagyashree directly.",
      link: {
        text: "📝 Fill Out Contact Form",
        url: "#contact",
      },
    },
    {
      text: "That specific question goes beyond what I've currently indexed. You can get in touch with Bhagyashree directly by sending a note through her contact form or by emailing her at bhagyashreebhagat8@gmail.com!",
      link: {
        text: "✉️ Email Bhagyashree Directly",
        url: "mailto:bhagyashreebhagat8@gmail.com",
      },
    },
    {
      text: "I might not have that specific information handy, but Bhagyashree would love to discuss it with you! Please reach out to her via the contact form on this page or drop her an email.",
      link: {
        text: "📝 Open Contact Form",
        url: "#contact",
      },
    },
    {
      text: "I couldn't find a direct match for that in her portfolio highlights. For any inquiries, project proposals, or full-time opportunities, please submit a quick message through the form or email her directly.",
      link: {
        text: "✉️ Send Email to Bhagyashree",
        url: "mailto:bhagyashreebhagat8@gmail.com",
      },
    },
    {
      text: "Hmm, that's not something I have in my records! You can connect with Bhagyashree directly by filling out the message form in the contact section or emailing bhagyashreebhagat8@gmail.com.",
      link: {
        text: "📝 Go to Contact Form",
        url: "#contact",
      },
    },
  ]

  // Rich, dynamic Question-Answer Knowledge Database
  const qaPairs: QAPair[] = [
    {
      keywords: ["scamshield", "faarzi", "fraud", "cybersecurity", "mlops", "detection", "security", "phishing", "smishing"],
      question: "🛡️ What is ScamShield AI (FAARZI AI)?",
      category: "Flagship",
      answer:
        "ScamShield AI (FAARZI AI) is Bhagyashree's flagship fraud risk & cybersecurity intelligence engine! It detects smishing, fake delivery traps, and financial credential attacks with 95.11% accuracy, 0.9858 ROC-AUC, and 0.08ms CPU latency using 18 cyber threat heuristics, an interactive Streamlit dashboard, DVC, MLflow, and a production FastAPI microservice.",
      link: {
        text: "Launch Live App (faarzi-ai.onrender.com)",
        url: "https://faarzi-ai.onrender.com/",
      },
    },
    {
      keywords: ["project", "portfolio", "built", "apps", "work done", "showcase"],
      question: "🚀 What are her top projects?",
      category: "Projects",
      answer:
        "Bhagyashree has delivered high-impact AI/ML and full-stack software applications:\n• ScamShield AI — Production fraud & smishing intelligence engine (FastAPI, Streamlit, MLOps)\n• Maternal Health Risk Predictor — Clinical AI risk classification with healthcare IoT data\n• Spendora — Personal finance & real-time business order tracking platform (React.js)\n• Pronto — Real-time MERN grocery delivery & cab booking application\n• RentEase — Full-stack MERN car rental ecosystem",
      link: {
        text: "Explore GitHub Repositories",
        url: "https://github.com/BHAGATBHAGYASHREE",
      },
    },
    {
      keywords: ["maternal", "health", "risk", "medical", "iot", "clinical"],
      question: "🩺 Tell me about the Maternal Health Risk Predictor",
      category: "Projects",
      answer:
        "The Maternal Health Risk Predictor is an AI-powered system engineered in Python using Machine Learning and healthcare IoT data. It trains calibrated predictive models to classify maternal risk levels, enabling critical early clinical intervention.",
      link: {
        text: "Launch Maternal Health AI (maternal-risk-ai.vercel.app)",
        url: "https://maternal-risk-ai.vercel.app",
      },
    },
    {
      keywords: ["spendora", "finance", "order", "tracking", "business"],
      question: "💰 Tell me about Spendora",
      category: "Projects",
      answer:
        "Spendora is a full-stack React.js application unifying personal finance management and business order tracking. It features cloud-based database synchronization tracking 50+ real-time orders with scalable UI architecture.",
    },
    {
      keywords: ["skill", "technology", "tech", "stack", "programming", "language", "framework", "tools"],
      question: "⚡ What is her technical stack?",
      category: "Skills",
      answer:
        "Bhagyashree's technical expertise spans 6 key domains:\n1. Data Science & AI/ML: Scikit-Learn, Pandas, NumPy, MLOps, Data Forensics\n2. Full-Stack: MERN Stack (MongoDB, Express, React, Node.js), REST APIs, JWT\n3. Languages: Python, C++, JavaScript, SQL\n4. Cloud & DevOps: AWS (EC2, S3), Docker, Git, CI/CD, Postman\n5. Infrastructure: ServiceNow, IT Service Management, SLA Uptime\n6. Product & UI/UX: Figma, Interactive Prototyping, Wireframing",
    },
    {
      keywords: ["experience", "work", "job", "intern", "internship", "hdfc", "zinq", "letsupgrade", "company"],
      question: "💼 Tell me about her work experience",
      category: "Experience",
      answer:
        "Bhagyashree brings industry-proven operational & technical experience:\n• HDFC Bank Data Center (2025): Data Center Operations Specialist — Maintained 99.9% uptime SLA for India's leading private bank and executed ServiceNow ITSM triage workflows.\n• Zinq Technologies (2024): Corporate Trainer — Upskilled professionals in web & software development.\n• LetsUpgrade (2023-2024): Software Development & Engineering Intern.",
    },
    {
      keywords: ["education", "study", "college", "university", "school", "degree", "bachelor", "btech", "itm"],
      question: "🎓 Where did she study?",
      category: "Education",
      answer:
        "Bhagyashree is pursuing her Bachelor of Technology (B.Tech) in Computer Science at ITM Skills University (2023–2027) in Navi Mumbai. She completed her Junior College at Ramseth Thakur College (HSC) and secondary schooling at Harmony Public School (CBSE).",
    },
    {
      keywords: ["contact", "email", "phone", "reach", "hire", "interview", "call", "location"],
      question: "📬 How can I contact or hire her?",
      category: "Contact",
      answer:
        "Bhagyashree is currently OPEN for Full-Time Roles & Internships!\n• Email: bhagyashreebhagat8@gmail.com\n• Phone: +91 9167177647\n• Location: Kharghar, Navi Mumbai, Maharashtra\n• LinkedIn: linkedin.com/in/bhagatbhagyashree",
      link: {
        text: "Send Direct Email",
        url: "mailto:bhagyashreebhagat8@gmail.com",
      },
    },
    {
      keywords: ["resume", "cv", "download", "pdf", "profile sheet"],
      question: "📄 Can I download her resume?",
      category: "Contact",
      answer:
        "Yes! You can download Bhagyashree's complete verified resume PDF with details on all projects, degrees, certifications, and technical proficiencies.",
      link: {
        text: "Download Bhagyashree Resume (PDF)",
        url: "/Bhagyashree.pdf",
      },
    },
    {
      keywords: ["award", "achievement", "recognition", "win", "prize", "hackathon", "shark tank"],
      question: "🏆 What are her awards & wins?",
      category: "Flagship",
      answer:
        "Bhagyashree's competitive achievements include:\n• Hackathon Runner-Up in high-intensity software innovation competitions.\n• 1st Place Winner in an Internal Shark Tank venture pitch competition.\n• Technical Core Member at CodeNex SRM Club & Creative Associate Lead at Founders Club.",
    },
    {
      keywords: ["certificate", "certification", "certified", "license", "course", "training"],
      question: "📜 What certifications does she hold?",
      category: "Skills",
      answer:
        "Bhagyashree holds multiple recognized technical credentials:\n• Data Science & Machine Learning Foundations\n• Python for Data Analysis & AI / ML\n• Full-Stack Web Development\n• ServiceNow ITSM Fundamentals & Cloud Infrastructure",
    },
    {
      keywords: ["about", "bio", "who is bhagyashree", "summary", "background", "intro", "tell me about yourself"],
      question: "🌟 Who is Bhagyashree?",
      category: "Flagship",
      answer:
        "Bhagyashree Bhagat is an innovative technologist specializing in Data Science, AI/ML, and Full-Stack Engineering based in Navi Mumbai. From building high-precision fraud detection systems (ScamShield AI) to managing mission-critical enterprise operations at HDFC Bank, she bridges intelligent AI models with reliable production systems.",
    },
    {
      keywords: ["hello", "hi", "hey", "greetings", "who are you", "savvy", "savy"],
      question: "🤖 Who is Savvy?",
      category: "Flagship",
      answer:
        "I'm Savvy! I'm Bhagyashree's custom AI assistant. I know everything about her background, codebases, engineering skills, and career milestones. Ask me anything or click any of the question chips below!",
    },
  ]

  // Dynamic quick-prompt suggestion chips
  const dynamicChips = [
    "🛡️ Tell me about ScamShield AI",
    "⚡ What is her tech stack?",
    "💼 Work Experience & Roles",
    "🚀 Top Projects Overview",
    "📜 Certifications & Credentials",
    "🌟 About Bhagyashree",
    "🎓 Education Journey",
    "🏆 Hackathons & Awards",
    "📄 Download Resume PDF",
    "📬 How to Contact & Hire",
  ]

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle message sending (typed or from chip)
  const executeSendMessage = (textToSend: string) => {
    const query = textToSend.trim()
    if (query === "") return

    const now = new Date()
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: query,
      sender: "user",
      timestamp: timeStr,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setAstronautState("talking")

    // Match answer with intelligent keyword scoring
    setTimeout(() => {
      const lowerQuery = query.toLowerCase()
      let bestMatch: QAPair | null = null
      let highestScore = 0

      for (const pair of qaPairs) {
        let score = 0
        for (const kw of pair.keywords) {
          if (lowerQuery.includes(kw)) {
            score += 1
          }
        }
        if (score > highestScore) {
          highestScore = score
          bestMatch = pair
        }
      }

      let botResponse = ""
      let botLink: { text: string; url: string } | undefined

      if (bestMatch && highestScore > 0) {
        botResponse = bestMatch.answer
        botLink = bestMatch.link
      } else {
        // Dynamic, non-constant fallback guiding the user to contact Bhagyashree / fill form / email directly
        const fallback = fallbackResponses[fallbackIndexRef.current % fallbackResponses.length]
        fallbackIndexRef.current += 1
        botResponse = fallback.text
        botLink = fallback.link
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: timeStr,
        link: botLink,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      setTimeout(() => {
        setAstronautState("idle")
      }, 1000)
    }, 700)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeSendMessage(inputValue)
    }
  }

  const handleResetChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Hi! I'm Savvy, Bhagyashree's AI assistant. How can I help you discover her portfolio today?",
        sender: "bot",
        timestamp: "Just now",
      },
    ])
  }

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING COPILOT LAUNCHER BUTTON                                      */}
      {/* ========================================================================= */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1 shadow-2xl relative transition-all duration-300 cursor-pointer ${
            isLight
              ? "bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 shadow-[0_10px_30px_rgba(14,165,233,0.45)] hover:shadow-[0_12px_36px_rgba(14,165,233,0.6)]"
              : "bg-gradient-to-tr from-white/80 via-slate-200 to-neutral-400 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.2)]"
          }`}
          onClick={() => {
            setIsOpen(!isOpen)
            setAstronautState(isOpen ? "idle" : "waving")
            setTimeout(() => {
              setAstronautState("idle")
            }, 2000)
          }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
          title="Chat with Savvy"
        >
          {/* Outer Breathing Glow Ring */}
          <span
            className={`absolute inset-0 rounded-full animate-ping opacity-25 pointer-events-none ${
              isLight ? "bg-sky-400" : "bg-white"
            }`}
          />

          <div
            className={`w-full h-full rounded-full flex items-center justify-center overflow-hidden border ${
              isLight
                ? "bg-gradient-to-b from-sky-900 to-slate-950 border-sky-200/60"
                : "bg-gradient-to-b from-slate-900 to-black border-white/40"
            }`}
          >
            <motion.div
              className="relative w-full h-full"
              animate={
                astronautState === "idle"
                  ? { y: [0, -4, 0], rotate: [0, 2, 0] }
                  : astronautState === "talking"
                    ? { y: [0, -2, 0], rotate: [0, 2, 0, -2, 0] }
                    : { y: [0, -6, 0], rotate: [0, 6, 0, -6, 0] }
              }
              transition={
                astronautState === "idle"
                  ? { repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut" }
                  : astronautState === "talking"
                    ? { repeat: Number.POSITIVE_INFINITY, duration: 0.5, ease: "easeInOut" }
                    : { repeat: 2, duration: 0.5, ease: "easeInOut" }
              }
            >
              {isLight ? (
                /* Light Mode: Alpine Snow Guide Avatar */
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="20" cy="25" r="1.5" fill="#ffffff" opacity="0.8" />
                  <circle cx="80" cy="30" r="1.2" fill="#ffffff" opacity="0.7" />
                  <circle cx="75" cy="65" r="1.5" fill="#ffffff" opacity="0.8" />
                  <circle cx="22" cy="70" r="1.2" fill="#ffffff" opacity="0.7" />
                  <circle cx="50" cy="18" r="6.5" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.2" />
                  <path d="M30 40 C30 20, 70 20, 70 40 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                  <rect x="28" y="36" width="44" height="8" rx="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
                  <circle cx="50" cy="53" r="19" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
                  <rect x="34" y="46" width="14" height="8.5" rx="3" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="52" y="46" width="14" height="8.5" rx="3" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="48" y1="50" x2="52" y2="50" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="36" y1="48" x2="41" y2="48" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                  <line x1="54" y1="48" x2="59" y2="48" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="36" cy="58" r="2.5" fill="#f87171" opacity="0.7" />
                  <circle cx="64" cy="58" r="2.5" fill="#f87171" opacity="0.7" />
                  <path
                    d={astronautState === "talking" ? "M44 62 Q50 67 56 62" : "M44 62 Q50 65 56 62"}
                    fill="none"
                    stroke="#92400e"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M30 73 Q50 82 70 73 L76 96 L24 96 Z" fill="#0369a1" />
                  <ellipse cx="50" cy="73" rx="18" ry="5.5" fill="#ffffff" />
                  <circle cx="50" cy="85" r="3" fill="#38bdf8" />
                </svg>
              ) : (
                /* Dark Mode: Cosmic Space Astronaut Avatar */
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="45" r="25" fill="#111" stroke="white" strokeWidth="2" />
                  <circle cx="50" cy="45" r="22" fill="#222" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <path d="M35 45 Q50 25 65 45" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                  <circle cx="43" cy="45" r="3" fill="white" />
                  <circle cx="57" cy="45" r="3" fill="white" />
                  <path
                    d={astronautState === "talking" ? "M43 55 Q50 60 57 55" : "M43 55 Q50 58 57 55"}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M35 70 Q50 80 65 70" fill="#333" />
                  <rect x="40" y="65" width="20" height="15" rx="5" fill="#333" />
                  <rect x="45" y="70" width="10" height="15" rx="2" fill="#444" />
                  <circle cx="40" cy="35" r="0.5" fill="white" />
                  <circle cx="60" cy="38" r="0.5" fill="white" />
                  <circle cx="55" cy="30" r="0.5" fill="white" />
                  <circle cx="45" cy="32" r="0.5" fill="white" />
                </svg>
              )}
            </motion.div>
          </div>

          {/* AI Badge Pulse */}
          {!isOpen && (
            <motion.div
              className={`absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 text-[9px] font-mono font-bold shadow-md border ${
                isLight ? "bg-sky-500 text-white border-white" : "bg-white text-black border-slate-300"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI</span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. EXPANDED MODERN CHATBOT WINDOW                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-[420px] h-[520px] sm:h-[580px] max-h-[82vh] backdrop-blur-2xl rounded-3xl border shadow-2xl overflow-hidden z-50 flex flex-col pointer-events-auto transition-colors duration-500 ${
              isLight
                ? "bg-white/95 border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(14,165,233,0.3)] text-slate-900"
                : "bg-[#090b11]/95 border-white/15 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,255,255,0.06)] text-white"
            }`}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            {/* Header Bar */}
            <div
              className={`px-5 py-4 flex items-center justify-between border-b ${
                isLight
                  ? "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white border-sky-400/30"
                  : "bg-gradient-to-r from-slate-900 via-neutral-900 to-black text-white border-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-inner">
                    {isLight ? (
                      <Snowflake className="w-4 h-4 animate-spin-slow" />
                    ) : (
                      <Bot className="w-4.5 h-4.5 text-white" />
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-black animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base tracking-tight leading-none">Savvy</h3>
                  </div>
                  <p className="text-[11px] font-mono opacity-85 mt-1">
                    Bhagyashree's AI Assistant • Online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetChat}
                  title="Clear conversation"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Flow */}
            <div
              className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 ${
                isLight ? "bg-slate-50/70" : "bg-[#090b11]/80"
              }`}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex gap-2.5 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {message.sender === "bot" && (
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                        isLight ? "bg-sky-600 text-white" : "bg-white/15 text-white border border-white/20"
                      }`}
                    >
                      S
                    </div>
                  )}

                  <div className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"} max-w-[82%]`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                        message.sender === "user"
                          ? isLight
                            ? "bg-slate-900 text-white font-medium rounded-br-sm"
                            : "bg-white text-black font-semibold rounded-br-sm"
                          : isLight
                            ? "bg-white text-slate-800 border border-slate-200/90 rounded-bl-sm font-normal shadow-sm"
                            : "bg-white/[0.08] text-neutral-100 border border-white/10 rounded-bl-sm font-normal"
                      }`}
                    >
                      <div className="whitespace-pre-line">{message.text}</div>

                      {/* Interactive Link Action if available */}
                      {message.link && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-white/10">
                          <a
                            href={message.link.url}
                            target={message.link.url.startsWith("#") || message.link.url.startsWith("mailto:") ? undefined : "_blank"}
                            rel={message.link.url.startsWith("#") || message.link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                            onClick={(e) => {
                              if (message.link?.url.startsWith("#")) {
                                e.preventDefault()
                                const targetEl = document.querySelector(message.link.url)
                                if (targetEl) {
                                  targetEl.scrollIntoView({ behavior: "smooth" })
                                }
                              }
                            }}
                            className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wide transition-colors ${
                              isLight
                                ? "text-sky-600 hover:text-sky-800"
                                : "text-sky-400 hover:text-sky-200"
                            }`}
                          >
                            <span>{message.link.text}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {message.timestamp && (
                      <span className="text-[10px] font-mono text-slate-600 dark:text-neutral-400 mt-1 px-1">
                        {message.timestamp}
                      </span>
                    )}
                  </div>

                  {message.sender === "user" && (
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                        isLight ? "bg-slate-300 text-slate-800" : "bg-neutral-800 text-white"
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isLight ? "bg-sky-600 text-white" : "bg-white/15 text-white"
                    }`}
                  >
                    S
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 border flex items-center gap-1.5 ${
                      isLight ? "bg-white border-slate-200" : "bg-white/10 border-white/10"
                    }`}
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full ${isLight ? "bg-sky-500" : "bg-white"}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0 }}
                    />
                    <motion.div
                      className={`w-2 h-2 rounded-full ${isLight ? "bg-sky-500" : "bg-white"}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.2 }}
                    />
                    <motion.div
                      className={`w-2 h-2 rounded-full ${isLight ? "bg-sky-500" : "bg-white"}`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8, delay: 0.4 }}
                    />
                    <span className="text-[11px] font-mono text-slate-600 dark:text-neutral-400 ml-1">
                      Savvy is analyzing...
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Dynamic Interactive Suggested Questions (Chips) */}
            <div
              className={`p-3 border-t overflow-x-auto select-none ${
                isLight ? "bg-slate-100/90 border-slate-200" : "bg-[#0c0e17] border-white/10"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className={`w-3.5 h-3.5 ${isLight ? "text-sky-600" : "text-sky-400"}`} />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-neutral-400">
                  Quick Questions
                </span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {dynamicChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => executeSendMessage(chip.replace(/^[^\w]+/, ""))}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-mono font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 border flex-shrink-0 ${
                      isLight
                        ? "bg-white text-slate-800 border-slate-300 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-900 shadow-sm"
                        : "bg-white/5 text-neutral-300 border-white/10 hover:border-white/40 hover:bg-white/15 hover:text-white"
                    }`}
                  >
                    <span>{chip}</span>
                    <ChevronRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Input Field */}
            <div
              className={`p-3 sm:p-4 border-t ${
                isLight ? "bg-white border-slate-200" : "bg-[#090b11] border-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Savvy about Bhagyashree..."
                  className={`flex-1 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none transition-all ${
                    isLight
                      ? "bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-300/80 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-200"
                      : "bg-white/10 text-white placeholder-neutral-500 border border-white/15 focus:border-white focus:bg-white/15 focus:ring-2 focus:ring-white/20"
                  }`}
                />
                <motion.button
                  onClick={() => executeSendMessage(inputValue)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md disabled:opacity-40 cursor-pointer transition-all flex-shrink-0 ${
                    isLight
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-white text-black hover:bg-neutral-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={inputValue.trim() === ""}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
