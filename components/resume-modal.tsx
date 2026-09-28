"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  X,
  Download,
  Printer,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Code2,
  Database,
  Cpu,
  Terminal,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  Layers,
  FileText,
  Globe,
  Languages,
  Sparkles,
  BookOpen,
} from "lucide-react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive")

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none print:p-0">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-2xl cursor-pointer print:hidden"
        />

        {/* Resume Sheet Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-5xl bg-white dark:bg-[#0b0d14] border border-slate-300 dark:border-white/20 rounded-3xl p-5 sm:p-9 shadow-2xl dark:shadow-[0_0_100px_rgba(255,255,255,0.15)] z-10 overflow-hidden max-h-[92vh] flex flex-col print:max-h-none print:border-none print:bg-white print:text-black print:rounded-none print:shadow-none"
        >
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-white/10 mb-6 print:hidden flex-shrink-0">
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10">
              <button
                onClick={() => setViewMode("interactive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "interactive"
                    ? "bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Interactive Sheet</span>
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "pdf"
                    ? "bg-white dark:bg-neutral-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Original PDF (2 Pages)</span>
              </button>
            </div>

            {/* Actions: Print, Download, Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-xs font-mono text-slate-900 dark:text-white flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <a
                href="/Bhagyashree.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-xs font-mono text-slate-900 dark:text-white flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Tab</span>
              </a>

              <a
                href="/Bhagyashree.pdf"
                download="Bhagyashree_Bhagat_Resume.pdf"
                className="px-4 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 hover:bg-slate-800 dark:hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content Area */}
          <div className="flex-1 overflow-y-auto pr-1">
            {viewMode === "pdf" ? (
              /* PDF Embed View */
              <div className="w-full h-[70vh] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-950 flex flex-col">
                <iframe
                  src="/Bhagyashree.pdf#toolbar=1"
                  className="w-full h-full border-none"
                  title="Bhagyashree Bhagat Resume PDF"
                />
              </div>
            ) : (
              /* Rich Interactive Resume Sheet (Verbatim Match to Scanned 2-Page Resume) */
              <div className="space-y-7 text-slate-800 dark:text-gray-200 font-sans print:text-black">
                {/* 1. Candidate Identity Header */}
                <div className="border-b border-slate-200 dark:border-white/10 pb-6 print:border-black">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-wide font-sans mb-1.5 print:text-black">
                        BHAGYASHREE BHAGAT
                      </h1>
                      <p className="text-xs sm:text-sm font-mono font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider print:text-gray-800">
                        AI/ML & Data Science Enthusiast • Generative AI • Software Developer
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 text-xs font-mono text-slate-700 dark:text-gray-300 print:text-black">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
                        Navi Mumbai, Maharashtra, India
                      </span>
                      <a href="mailto:bhagyashreebhagat8@gmail.com" className="flex items-center gap-2 hover:underline">
                        <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
                        bhagyashreebhagat8@gmail.com
                      </a>
                      <span className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
                        +91 9167177647
                      </span>
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href="https://linkedin.com/in/bhagatbhagyashree"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                        >
                          linkedin.com/in/bhagatbhagyashree
                        </a>
                        <span>•</span>
                        <a
                          href="https://github.com/BHAGATBHAGYASHREE"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                        >
                          github.com/BHAGATBHAGYASHREE
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Professional Summary */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-2.5 flex items-center gap-2 print:text-black">
                    <Sparkles className="w-4 h-4 text-slate-900 dark:text-white" />
                    <span>Professional Summary</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-neutral-200 leading-relaxed font-normal">
                    AI/ML Engineer and Data Scientist with hands-on experience in Machine Learning, Deep Learning, Generative AI, Data Analysis, and Full-Stack (MERN) Development. Delivered 4+ end-to-end projects — Maternal Health Risk Predictor, Spendora (React.js application tracking 50+ orders via cloud-based storage), Pronto, and RentEase — using Python, Machine Learning, MongoDB, Express.js, React.js, and Node.js. Skilled in Data Structures & Algorithms, Statistical Modeling, Predictive Analytics, Data Visualization, and Software Development. Seeking roles as Data Scientist, Machine Learning Engineer, or Software Developer.
                  </p>
                </div>

                {/* 3. Work Experience */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-3.5 flex items-center gap-2 print:text-black">
                    <Briefcase className="w-4 h-4 text-slate-900 dark:text-white print:text-black" />
                    <span>Work Experience</span>
                  </h2>

                  <div className="space-y-3.5">
                    {/* HDFC Bank */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 print:bg-gray-100 print:border-gray-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white print:text-black">
                            Datacenter Operator — HDFC Bank
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800/40 w-fit">
                          Jul 2025 – Dec 2025
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-gray-300 print:text-black">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Maintained data center infrastructure supporting enterprise data pipelines, ensuring 99%+ uptime and operational efficiency.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Managed asset tracking, incident response, and SLA compliance across banking IT operations, applying data monitoring best practices.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Zinq Technologies */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 print:bg-gray-100 print:border-gray-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white print:text-black">
                            Corporate Trainer, Generative AI — Zinq Technologies
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800/40 w-fit">
                          Apr 2024
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-gray-300 print:text-black">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Trained 20+ employees on Generative AI and LLM-based tools (ChatGPT, DALL-E) to improve productivity and data-driven workflows.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Conducted hands-on workshops on AI-assisted content creation using prompt engineering techniques.</span>
                        </li>
                      </ul>
                    </div>

                    {/* LetsUpgrade */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 print:bg-gray-100 print:border-gray-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white print:text-black">
                            Software Development & Engineering Intern — LetsUpgrade
                          </h3>
                        </div>
                        <span className="text-xs font-mono font-bold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800/40 w-fit">
                          Dec 2023 – Jan 2024
                        </span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-gray-300 print:text-black">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Redesigned website UI/UX using data-driven, user-behavior insights, improving user engagement.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>Collaborated in Agile sprints with cross-functional teams to deliver product milestones on schedule.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 4. Projects (All 4 Resume Projects + ScamShield AI) */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-3.5 flex items-center gap-2 print:text-black">
                    <Layers className="w-4 h-4 text-slate-900 dark:text-white print:text-black" />
                    <span>Key Projects</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Project 1: Maternal Health Risk Predictor */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Maternal Health Risk Predictor
                        </h3>
                        <a
                          href="https://maternal-risk-ai.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed mb-2">
                        Built an AI-powered maternal health risk prediction system using Python, Machine Learning, and healthcare IoT data. Engineered and trained predictive models to classify maternal health risk levels, improving early risk detection accuracy.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Python", "Machine Learning", "Healthcare IoT", "Predictive Modeling"].map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-gray-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project 2: Spendora */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Spendora — Personal Finance & Order Tracking
                        </h3>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed mb-2">
                        Developed Spendora, a full-stack ReactJS application unifying Personal Finance Management and Business Order Tracking through a responsive, scalable user interface. Architected cloud-based data storage and database design to track and synchronize 50+ orders in real-time, improving data reliability and system scalability.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["React.js", "Full-Stack", "Cloud Storage", "Order Tracking"].map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-gray-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project 3: Pronto */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Pronto — Real-Time Grocery Delivery
                        </h3>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed mb-2">
                        Developed a full-stack, real-time grocery delivery platform using React.js, Node.js, Express.js, and MongoDB with live order tracking. Implemented REST APIs for order management and designed a responsive UI to reduce cart abandonment.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"].map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-gray-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project 4: RentEase */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          RentEase — Car Rental Platform
                        </h3>
                        <a
                          href="https://rent-ease-navy.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed mb-2">
                        Built a full-stack car rental web application using the MERN stack, supporting real-time booking and availability management. Designed and implemented user authentication, booking workflows, and database schema in MongoDB.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["MERN Stack", "MongoDB", "User Auth", "Booking Flow"].map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-gray-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Flagship: ScamShield AI */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 md:col-span-2">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>🛡️ ScamShield AI (FAARZI AI) — Fraud Risk & Cyber Intelligence</span>
                        </h3>
                        <a
                          href="https://faarzi-ai.onrender.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <span>faarzi-ai.onrender.com</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed mb-2">
                        Production-grade cybersecurity intelligence engine detecting smishing, banking fraud, and credential attacks with 95.11% accuracy, 0.9858 ROC-AUC, and 0.08ms CPU latency. Engineered with 18 cyber threat heuristics, Streamlit forensics dashboard, and FastAPI microservice.
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {["Python", "FastAPI", "Streamlit", "Scikit-Learn", "MLflow", "DVC", "Cybersecurity"].map((t, i) => (
                          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-gray-200">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Complete Technical Skills & Frameworks */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-3.5 flex items-center gap-2 print:text-black">
                    <Code2 className="w-4 h-4 text-slate-900 dark:text-white print:text-black" />
                    <span>Technical Skills & Frameworks</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* Machine Learning & Data Science */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>Machine Learning & Data Science</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        Machine Learning, Deep Learning, Artificial Intelligence, Predictive Modeling, Predictive Analytics, Data Analysis, Data Analytics, Data Visualization, Exploratory Data Analysis (EDA), Statistical Analysis, Statistics, Neural Networks, Natural Language Processing (NLP).
                      </p>
                    </div>

                    {/* ML/AI Frameworks & Libraries */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>ML/AI Frameworks & Libraries</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        TensorFlow, PyTorch, Scikit-Learn, Keras, Pandas, NumPy, Matplotlib.
                      </p>
                    </div>

                    {/* Programming Languages */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>Programming Languages</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        Python, C++, SQL, JavaScript, TypeScript, HTML, CSS.
                      </p>
                    </div>

                    {/* Full-Stack Web Development */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>Full-Stack Web Development</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        MERN Stack, MongoDB, Express.js, React.js, Node.js, REST API, RESTful Web Services, Web Development, Software Development.
                      </p>
                    </div>

                    {/* Data Structures & System Design */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>DSA & Software Engineering</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        Data Structures, Algorithms, Problem Solving, System Design, Object-Oriented Programming (OOP), Software Engineering.
                      </p>
                    </div>

                    {/* Cloud, Tools & Platforms */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                      <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                        <span>Cloud, Tools & Platforms</span>
                      </h4>
                      <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                        AWS (EC2, S3, IAM), Git, GitHub, Version Control, Jupyter Notebook, VS Code, Postman, Power BI, Agile Methodology, Scrum.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6. Certifications & Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Certifications */}
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-3 flex items-center gap-2 print:text-black">
                      <Award className="w-4 h-4 text-slate-900 dark:text-white print:text-black" />
                      <span>Certifications</span>
                    </h2>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2.5">
                      {[
                        "Prompt Design in Vertex AI — Google Skill Badge",
                        "Build Real World AI Applications with Gemini and Imagen — Google Skill Badge",
                        "Data Analytics Job Simulation — Deloitte Australia (Forage)",
                        "Data Science Job Simulation — British Airways (Forage)",
                      ].map((cert, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-3 flex items-center gap-2 print:text-black">
                      <Sparkles className="w-4 h-4 text-slate-900 dark:text-white print:text-black" />
                      <span>Achievements</span>
                    </h2>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 space-y-2.5">
                      {[
                        "1st Place, Inter-College Shark Tank Competition (2023)",
                        "2nd Place, Buildathon 3.0",
                      ].map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-200">
                          <Award className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 7. Education Journey */}
                <div>
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 dark:text-gray-300 mb-3.5 flex items-center gap-2 print:text-black">
                    <GraduationCap className="w-4 h-4 text-slate-900 dark:text-white print:text-black" />
                    <span>Education</span>
                  </h2>

                  <div className="space-y-3">
                    {/* B.Tech */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          ITM Group of Institutions
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono">
                          Bachelor of Technology, Computer Science Engineering
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300">
                        Aug 2023 – Present (2027)
                      </span>
                    </div>

                    {/* 12th */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          Ramsheth Thakur Higher Secondary Vidyalaya
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono">
                          PCMB (IT), 12th Standard
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300">
                        2020 – 2022
                      </span>
                    </div>

                    {/* 10th */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          Harmony Public School, Kharghar
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-neutral-400 font-mono">
                          10th Standard (CBSE)
                        </p>
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-700 dark:text-neutral-300">
                        2020
                      </span>
                    </div>
                  </div>
                </div>

                {/* 8. Interests & Languages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span>Interests</span>
                    </h3>
                    <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">
                      Machine Learning, Data Analytics, Statistical Analysis, Data Visualization, Predictive Modeling, Research & Problem Solving.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Languages className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                      <span>Languages</span>
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                      {["English", "Hindi", "Marathi", "German (Intermediate)"].map((lang, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-neutral-200 font-medium">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
