"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Particle[] = []
    const particleCount = 50

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 5 + 1
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const speedX = Math.random() * 0.2 - 0.1
      const speedY = Math.random() * 0.2 - 0.1

      const isDark = theme === "dark"
      const colorOpacity = isDark ? "0.2" : "0.1"
      const color =
        Math.random() > 0.5
          ? `hsla(262, 83%, 58%, ${colorOpacity})` // primary
          : `hsla(199, 89%, 48%, ${colorOpacity})` // secondary

      particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color,
      })
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Boundary check
        if (particle.x > canvas.width + particle.size) particle.x = 0 - particle.size
        if (particle.x < 0 - particle.size) particle.x = canvas.width + particle.size
        if (particle.y > canvas.height + particle.size) particle.y = 0 - particle.size
        if (particle.y < 0 - particle.size) particle.y = canvas.height + particle.size

        // Draw particles
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Connect particles
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = 1 - distance / 100
            ctx.beginPath()
            ctx.strokeStyle = `hsla(262, 83%, 58%, ${opacity * 0.15})`
            ctx.lineWidth = particle.size / 10
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
