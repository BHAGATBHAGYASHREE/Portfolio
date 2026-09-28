import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import EmailJSInitializer from "@/components/ui/emailjs-initializer"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-bhagyashree.vercel.app"),
  title: "Bhagyashree Bhagat | AI & Data Science Portfolio",
  description: "Portfolio of Bhagyashree Bhagat — Data Science, AI/ML models, Generative AI, and Full-Stack Engineering.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Bhagyashree Bhagat | AI & Data Science Portfolio",
    description: "Portfolio of Bhagyashree Bhagat — Data Science, AI/ML models, Generative AI, and Full-Stack Engineering.",
    url: "https://bhagyashreebhagat.com",
    siteName: "Bhagyashree Bhagat Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bhagyashree Bhagat — AI & Data Science Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagyashree Bhagat | AI & Data Science Portfolio",
    description: "AI/ML Engineer, Data Scientist, and Full-Stack Developer.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <EmailJSInitializer />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

