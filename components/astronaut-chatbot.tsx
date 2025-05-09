"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function AstronautChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Savy, BB's bestie. Ask me anything about Bhagyashree!",
      sender: "bot",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [astronautState, setAstronautState] = useState<"idle" | "talking" | "waving">("idle")

  // Predefined QA pairs
  const qaPairs = [
    {
      keywords: ["education", "study", "college", "university", "school", "degree", "bachelor"],
      answer:
        "Bhagyashree is pursuing a Bachelor of Technology in Computer Science at ITM Skills University (2023-2027). She also studied at Ramseth Thakur College and Harmony Public School.",
    },
    {
      keywords: ["experience", "work", "job", "intern", "internship", "company"],
      answer:
        "Bhagyashree worked as a Corporate Trainer at Zinq Technologies (Apr 2024) and as a Software Development & Engineering Intern at Letsupgrade (Dec 2023 - Jan 2024).",
    },
    {
      keywords: ["skill", "technology", "tech", "programming", "language", "framework"],
      answer:
        "Bhagyashree is skilled in HTML/HTML5 (95%), React.js (90%), JavaScript (85%), CSS/Sass (88%), Next.js (80%), and TypeScript (75%). She also has design skills, knowledge of various tools, cloud & DevOps experience, and strong soft skills.",
    },
    {
      keywords: ["project", "portfolio", "work", "application", "app", "website"],
      answer:
        "Bhagyashree has worked on several projects including Pronto (a MERN stack grocery delivery platform), RentEase (a car rental platform), and Disney Hotstar (a UI/UX design project).",
    },
    {
      keywords: ["contact", "email", "phone", "reach", "hire", "location"],
      answer:
        "You can contact Bhagyashree via email at bhagyashreebhaagat8@gmail.com or by phone at 9167177647. She is located in Navi Mumbai, Maharashtra.",
    },
    {
      keywords: ["club", "college", "organization", "extracurricular"],
      answer:
        "Bhagyashree is a Technical Team Member at CodeNex Club SRM (Sep 2024 - Present) and a Creative Associate Lead at Founders Club (Oct 2023 - Present).",
    },
    {
      keywords: ["award", "achievement", "recognition", "win", "prize", "hackathon"],
      answer: "Bhagyashree was a Hackathon Runner Up and won 1st Place in an Internal Shark Tank competition.",
    },
    {
      keywords: ["hello", "hi", "hey", "greetings", "howdy"],
      answer: "Hello! I'm Savy, BB's bestie. How can I help you learn more about Bhagyashree today?",
    },
  ]

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Function to handle user input
  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user" as const,
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setAstronautState("talking")

    // Find matching answer or use default
    setTimeout(() => {
      let botResponse =
        "I'm not sure about that. Try asking about Bhagyashree's education, work experience, skills, projects, or contact information!"

      // Check for matches in predefined QA pairs
      for (const pair of qaPairs) {
        if (pair.keywords.some((keyword) => inputValue.toLowerCase().includes(keyword))) {
          botResponse = pair.answer
          break
        }
      }

      const botMessage: Message = { id: messages.length + 2, text: botResponse, sender: "bot" as const }
    setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Return to idle state after talking
      setTimeout(() => {
        setAstronautState("idle")
      }, 1000)
    }, 1500)
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Astronaut button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-white p-1 shadow-lg relative"
          onClick={() => {
            setIsOpen(!isOpen)
            setAstronautState(isOpen ? "idle" : "waving")
            setTimeout(() => {
              setAstronautState("idle")
            }, 2000)
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              animate={
                astronautState === "idle"
                  ? { y: [0, -3, 0], rotate: [0, 2, 0] }
                  : astronautState === "talking"
                    ? { y: [0, -2, 0], rotate: [0, 1, 0, -1, 0] }
                    : { y: [0, -5, 0], rotate: [0, 5, 0, -5, 0] }
              }
              transition={
                astronautState === "idle"
                  ? { repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }
                  : astronautState === "talking"
                    ? { repeat: Number.POSITIVE_INFINITY, duration: 0.5, ease: "easeInOut" }
                    : { repeat: 2, duration: 0.5, ease: "easeInOut" }
              }
            >
              {/* Astronaut SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Astronaut helmet */}
                <circle cx="50" cy="45" r="25" fill="#111" stroke="white" strokeWidth="2" />
                <circle cx="50" cy="45" r="22" fill="#222" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                {/* Visor */}
                <path d="M35 45 Q50 25 65 45" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />

                {/* Face */}
                <circle cx="43" cy="45" r="3" fill="white" />
                <circle cx="57" cy="45" r="3" fill="white" />
                <path
                  d={astronautState === "talking" ? "M43 55 Q50 60 57 55" : "M43 55 Q50 58 57 55"}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Body */}
                <path d="M35 70 Q50 80 65 70" fill="#333" />
                <rect x="40" y="65" width="20" height="15" rx="5" fill="#333" />

                {/* Oxygen tank */}
                <rect x="45" y="70" width="10" height="15" rx="2" fill="#444" />

                {/* Stars in helmet */}
                <circle cx="40" cy="35" r="0.5" fill="white" />
                <circle cx="60" cy="38" r="0.5" fill="white" />
                <circle cx="55" cy="30" r="0.5" fill="white" />
                <circle cx="45" cy="32" r="0.5" fill="white" />
              </svg>
            </motion.div>
          </div>

          {!isOpen && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: "spring" }}
            >
              1
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-gray-900/90 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl overflow-hidden z-50 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Chat header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-white p-0.5">
                  <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-white">
                      A
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-white">Savy</h3>
                  <p className="text-xs text-gray-400">BB's Bestie</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-gray-300 to-white text-black"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-gray-800 rounded-2xl px-4 py-2 text-white">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-gray-700 bg-gray-800/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Bhagyashree's resume..."
                  className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-300 to-white flex items-center justify-center text-black"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={inputValue.trim() === ""}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
