"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Download, Printer, CheckCircle2, Briefcase, GraduationCap, Code2, Database, Server, Cpu, Terminal, Palette, Mail, Phone, MapPin } from "lucide-react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none print:p-0">
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
          className="relative w-full max-w-4xl bg-gray-950 border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_0_100px_rgba(255,255,255,0.15)] z-10 overflow-hidden max-h-[90vh] overflow-y-auto print:max-h-none print:border-none print:bg-white print:text-black print:rounded-none print:shadow-none"
        >
          {/* Header Action Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 print:hidden">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-gray-400 ml-2">BHAGYASHREE_BHAGAT_RESUME.pdf</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white flex items-center gap-1.5 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <a
                href="/Bhagyashree.pdf"
                download
                className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 hover:bg-gray-200 transition-colors cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Resume Content */}
          <div className="space-y-8 text-gray-200 font-sans print:text-black">
            {/* Candidate Info Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 print:border-black">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide font-sans mb-1 print:text-black">
                  BHAGYASHREE BHAGAT
                </h1>
                <p className="text-xs sm:text-sm font-mono text-gray-400 uppercase tracking-wider print:text-gray-700">
                  Data Scientist • AI/ML Engineer • Full-Stack Developer
                </p>
              </div>

              <div className="flex flex-col gap-1 text-xs font-mono text-gray-300 print:text-black">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  Navi Mumbai, Maharashtra, India
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  bhagyashreebhaagat8@gmail.com
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  +91 9167177647
                </span>
              </div>
            </div>

            {/* Technical Skills & Expertise (100% Verbatim Resume Skills!) */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-2 print:text-black">
                <Code2 className="w-4 h-4 text-white print:text-black" />
                <span>Technical Skills & Expertise</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category 1: Data Science & AI/ML */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-white print:text-black" />
                    <h3 className="text-sm font-bold text-white print:text-black">Data Science & AI/ML</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Pandas", "NumPy", "Scikit-Learn", "Data Visualization", "Exploratory Data Analysis (EDA)", "Statistics Fundamentals", "Machine Learning Fundamentals"].map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-gray-200 print:bg-white print:text-black print:border-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 2: Full-Stack Development */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-4 h-4 text-white print:text-black" />
                    <h3 className="text-sm font-bold text-white print:text-black">Full-Stack Development</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["MERN Stack (MongoDB, Express, React, Node)", "REST APIs", "API Integration", "Authentication & Authorization (JWT)", "Next.js"].map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-gray-200 print:bg-white print:text-black print:border-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 3: Programming Languages */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-white print:text-black" />
                    <h3 className="text-sm font-bold text-white print:text-black">Programming Languages</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Python", "C++", "SQL", "JavaScript", "HTML5/CSS3"].map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-gray-200 print:bg-white print:text-black print:border-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 4: Infrastructure & Operations */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Server className="w-4 h-4 text-white print:text-black" />
                    <h3 className="text-sm font-bold text-white print:text-black">Infrastructure & Operations</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["ServiceNow", "Infrastructure Monitoring", "Asset & SLA Incident Management", "Data Center Governance"].map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-gray-200 print:bg-white print:text-black print:border-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 5: Cloud & Developer Tools */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-white print:text-black" />
                    <h3 className="text-sm font-bold text-white print:text-black">Cloud & Developer Tools</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["AWS (EC2, VPC, S3, IAM)", "Git", "GitHub", "Power BI", "Jupyter Notebook", "Postman", "VS Code"].map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-gray-200 print:bg-white print:text-black print:border-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Category 6: UI/UX & Design */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-4 h-4 text-white print:text-black" />
                    <h3 className="text-sm font-bold text-white print:text-black">UI/UX & Product Design</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["Figma", "Wireframing", "User Research", "Interactive Prototyping", "Design Systems"].map((s, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-gray-200 print:bg-white print:text-black print:border-gray-400">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Work Experience */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-2 print:text-black">
                <Briefcase className="w-4 h-4 text-white print:text-black" />
                <span>Professional Work Experience</span>
              </h2>

              <div className="space-y-4">
                {/* Exp 1 */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-white print:text-black">HDFC Bank Data Center Operations</h3>
                      <p className="text-xs font-mono text-gray-400 print:text-gray-700">Infrastructure & Operations Trainee • Navi Mumbai, India</p>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-gray-300 print:text-black">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5 print:text-emerald-700" />
                      <span>Supported high-availability enterprise data center infrastructure and IT service management (ITSM) using ServiceNow.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5 print:text-emerald-700" />
                      <span>Monitored server health, asset tracking, incident SLA compliance, and data center hardware ops.</span>
                    </li>
                  </ul>
                </div>

                {/* Exp 2 */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-white print:text-black">Zinq Technologies</h3>
                      <p className="text-xs font-mono text-gray-400 print:text-gray-700">Corporate Trainer • Apr 2024</p>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-gray-300 print:text-black">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5 print:text-emerald-700" />
                      <span>Delivered corporate technical training modules on web technologies, developer workflows, and software best practices.</span>
                    </li>
                  </ul>
                </div>

                {/* Exp 3 */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-bold text-white print:text-black">Letsupgrade</h3>
                      <p className="text-xs font-mono text-gray-400 print:text-gray-700">Software Development & Engineering Intern • Dec 2023 - Jan 2024</p>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-gray-300 print:text-black">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5 print:text-emerald-700" />
                      <span>Engineered responsive web components using React.js, optimized frontend performance, and collaborated on full-stack web applications.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Academic Background */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-300 mb-4 flex items-center gap-2 print:text-black">
                <GraduationCap className="w-4 h-4 text-white print:text-black" />
                <span>Academic Education</span>
              </h2>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 print:bg-gray-100 print:border-gray-300">
                <h3 className="text-base font-bold text-white print:text-black">Bachelor of Technology (B.Tech) in Computer Science</h3>
                <p className="text-xs font-mono text-gray-400 print:text-gray-700">ITM Skills University (2023 - 2027)</p>
                <p className="text-xs text-gray-300 mt-2 print:text-black">Coursework: Data Science, Machine Learning, Data Structures & Algorithms (C++), Operating Systems, Relational Database Management Systems (SQL), Web Architecture.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
