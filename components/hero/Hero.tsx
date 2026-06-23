"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react"
import RoleSwitcher from "./RoleSwitcher"

// Custom SVGs for Tech Badges
const ReactIcon = () => (
  <svg className="w-4 h-4 text-[#61dafb] animate-[spin_10s_linear_infinite]" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
)

const NodeIcon = () => (
  <svg className="w-4 h-4 text-[#68a063]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 17.5L5.5 16V8L12 4.5l6.5 3.5v8l-6.5 3.5z"/>
  </svg>
)

const TypeScriptIcon = () => (
  <svg className="w-4 h-4 text-[#3178c6]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 13h-2v-6H9V7h6v2h-2v6zm5-1.5c0 .83-.67 1.5-1.5 1.5H16v-1.5h1.5v-1H16V11h1.5v-1H16V8.5h1.5c.83 0 1.5.67 1.5 1.5v3.5z"/>
  </svg>
)

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration * 60)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 1000 / 60)
        }
      },
      { threshold: 0.5 }
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={countRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export default function Hero() {
  const [projectsCount, setProjectsCount] = useState(3)
  const [skillsCount, setSkillsCount] = useState(14)

  useEffect(() => {
    // Dynamic projects count
    fetch("https://portfolio-server-blush-one.vercel.app/api/p4/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.data) setProjectsCount(data.data.length)
      })
      .catch(console.error)

    // Dynamic skills count
    fetch("https://portfolio-server-blush-one.vercel.app/api/p4/skills", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.data) setSkillsCount(data.data.length)
      })
      .catch(console.error)
  }, [])

  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full mt-8">
        {/* Left Column */}
        <div className="lg:col-span-7 text-left space-y-6">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-elevated border border-border-subtle rounded-full px-4 py-1.5 text-xs font-mono text-glow">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Eyebrow line */}
          <p className="font-mono text-muted-foreground text-sm tracking-widest uppercase">
            Full Stack Developer · MERN · Next.js
          </p>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold flex flex-col leading-tight">
            <span className="text-[#8b8ba7] text-4xl mb-1">Hi, I'm</span>
            <span 
              className="text-[#f0f0ff] text-5xl md:text-7xl tracking-tight relative drop-shadow-[0_0_35px_rgba(108,99,255,0.4)]"
            >
              Rasel Ahmed
            </span>
          </h1>

          {/* Role switcher */}
          <RoleSwitcher />

          {/* Description */}
          <p className="font-body text-[#8b8ba7] text-lg leading-relaxed max-w-lg">
            I construct responsive MERN stack products and scalable Next.js systems, merging robust APIs with high-fidelity frontend execution.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleScrollToProjects}
              className="bg-accent hover:shadow-glow-md text-white rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105 duration-300"
            >
              View My Work
            </button>

            <a
              href="/resume.pdf"
              download="Rasel_Ahmed_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent/40 text-accent hover:bg-accent/10 rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105 duration-300 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>

          {/* Social Row */}
          <div className="flex gap-4 pt-4">
            {[
              { href: "https://github.com/rasel754", icon: <Github className="w-5 h-5" />, label: "GitHub" },
              { href: "https://linkedin.com/in/rasel754", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
              { href: "mailto:raselahmed73614@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-elevated border border-border-subtle hover:border-accent hover:shadow-glow-sm transition-all flex items-center justify-center text-[#8b8ba7] hover:text-[#f0f0ff] duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column (Avatar) */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-8">
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            {/* Avatar container */}
            <div 
              className="relative w-72 h-72 rounded-3xl overflow-hidden border-2 border-accent/30 bg-[#0d0d16]"
              style={{
                boxShadow: "0 0 60px rgba(108,99,255,0.15), inset 0 0 40px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src="https://i.ibb.co.com/fYgWxy10/my-pic.jpg"
                alt="Rasel Ahmed Avatar"
                fill
                priority
                sizes="(max-width: 768px) 288px, 288px"
                className="object-cover"
              />
            </div>

            {/* Floating Tech Badges */}
            {/* React Icon badge top-right */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-4 -right-4 bg-glass-bg backdrop-blur-md border border-border-subtle rounded-xl px-3 py-2 text-xs font-mono flex items-center gap-1.5 text-[#f0f0ff]"
            >
              <ReactIcon />
              <span>React 19</span>
            </motion.div>

            {/* Node.js badge bottom-left */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-glass-bg backdrop-blur-md border border-border-subtle rounded-xl px-3 py-2 text-xs font-mono flex items-center gap-1.5 text-[#f0f0ff]"
            >
              <NodeIcon />
              <span>Node.js</span>
            </motion.div>

            {/* TypeScript badge left-center */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-1/2 -left-12 -translate-y-1/2 bg-glass-bg backdrop-blur-md border border-border-subtle rounded-xl px-3 py-2 text-xs font-mono flex items-center gap-1.5 text-[#f0f0ff]"
            >
              <TypeScriptIcon />
              <span>TypeScript</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto w-full">
        {[
          { value: projectsCount, suffix: "+", label: "Projects Built" },
          { value: 2, suffix: "+", label: "Years Training" },
          { value: skillsCount, suffix: "+", label: "Technologies" },
        ].map((stat, i) => (
          <div key={i} className="relative">
            <div className="bg-elevated border border-border-subtle rounded-2xl px-8 py-6 flex flex-col items-center justify-center h-full">
              <span className="font-display font-extrabold text-4xl text-accent">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={1.5} />
              </span>
              <span className="font-body text-[#8b8ba7] text-sm mt-2 text-center">
                {stat.label}
              </span>
            </div>
            {i < 2 && (
              <div className="hidden sm:block absolute top-1/2 -right-3 -translate-y-1/2 w-px h-12 bg-border-subtle" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
