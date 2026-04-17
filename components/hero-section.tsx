"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

const Scene3D = dynamic(() => import("@/components/scene-3d"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/20" />
  ),
})

const roles = [
  "MERN Stack Developer",
  "React Specialist",
  "Full Stack Engineer",
  "UI/UX Enthusiast",
]

function TypewriterText() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentRole.length) {
            setCurrentText(currentRole.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentRole.slice(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRoleIndex])

  return (
    <span className="inline-flex items-center">
      <span className="gradient-text font-heading">{currentText}</span>
      <span className="ml-1 inline-block h-8 w-[3px] bg-primary cursor-blink" />
    </span>
  )
}

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

export default function HeroSection() {
  const handleScrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <Scene3D />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="relative h-36 w-36 md:h-44 md:w-44">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-75 blur-lg animate-pulse-glow" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-background">
                <Image
                  src="https://i.ibb.co.com/fYgWxy10/my-pic.jpg"
                  alt="Rasel Ahmed"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg glow"
            >
              <span className="text-lg font-bold text-primary-foreground">
                {"</>"}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {"Hi, I'm "}
            <span className="gradient-text">Rasel Ahmed</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6 text-xl md:text-2xl lg:text-3xl text-muted-foreground"
          >
            <TypewriterText />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            I build modern, scalable web applications with clean code and
            exceptional user experiences. Passionate about creating digital
            solutions that make a difference.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-12 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              size="lg"
              onClick={handleScrollToProjects}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={handleScrollToContact}
              className="group border-primary/50 hover:bg-primary/10"
            >
              <span className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/rasel754"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/rasel754"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a
              href="mailto:raselahmed73614@gmail.com"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/10 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
          >
            {[
              { value: 3, suffix: "+", label: "Projects Built" },
              { value: 1.5, suffix: "+", label: "Years Training" },
              { value: 6, suffix: "+", label: "Technologies" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                  />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-5 w-5 animate-bounce-arrow" />
        </button>
      </motion.div>
    </section>
  )
}
