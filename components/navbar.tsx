"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    if (pathname !== "/") return

    const sections = ["home", "about", "skills", "services", "projects", "education", "blog", "contact"]
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [pathname])

  if (pathname?.startsWith("/rasel754")) {
    return null
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (pathname !== "/") {
      window.location.href = `/${href}`
      return
    }
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-glass-bg border-b border-border-subtle py-3"
            : "py-5 bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#home")
            }}
            className="group flex items-center gap-2"
          >
            <div className="relative font-mono text-xl font-bold text-accent px-3 py-1 rounded border border-border-subtle group-hover:border-accent group-hover:animate-pulse transition-all duration-300">
              RA
            </div>
            <span className="font-display font-bold text-[#f0f0ff] text-lg tracking-wide hidden sm:inline-block">
              Rasel Ahmed
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "")
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body font-medium text-sm transition-colors duration-300 relative py-1.5 ${
                    isActive ? "text-accent" : "text-[#8b8ba7] hover:text-[#f0f0ff]"
                  } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          {/* Theme Toggle & Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative h-9 w-9 rounded-full hover:bg-elevated text-[#8b8ba7] hover:text-[#f0f0ff]"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            )}

            {/* Hire Me CTA */}
            <button
              onClick={() => handleNavClick("#contact")}
              className="bg-accent hover:shadow-glow-md text-white rounded-full px-5 py-2 text-sm font-semibold transition-all hover:scale-105 duration-300 hidden md:block"
            >
              Hire Me
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#8b8ba7] hover:text-[#f0f0ff]"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace("#", "")
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-display font-bold text-3xl transition-colors ${
                      isActive ? "text-accent" : "text-[#8b8ba7] hover:text-[#f0f0ff]"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                onClick={() => handleNavClick("#contact")}
                className="mt-6 mx-auto bg-accent hover:shadow-glow-md text-white rounded-full px-8 py-3 text-lg font-semibold transition-all hover:scale-105 duration-300 w-48"
              >
                Hire Me
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
