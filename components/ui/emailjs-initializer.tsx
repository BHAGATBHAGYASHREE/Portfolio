"use client"

import { useEffect } from "react"
import { initEmailJS } from "@/lib/emailjs"

export default function EmailJSInitializer() {
  useEffect(() => {
    // Initialize EmailJS when the app loads
    initEmailJS()
  }, [])
  
  return null
}