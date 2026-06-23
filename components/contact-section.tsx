"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "raselahmed73614@gmail.com",
    href: "mailto:raselahmed73614@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1624 490189",
    href: "tel:+8801624490189",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Savar, Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Savar,Dhaka,Bangladesh",
  },
]

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResponseMessage("")

    try {
      const res = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setIsSubmitted(true)
        setResponseMessage(data.message || "Message sent successfully! I'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => {
          setIsSubmitted(false)
          setResponseMessage("")
        }, 5000)
      } else {
        setResponseMessage(data.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error(error)
      setResponseMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden max-w-6xl mx-auto px-6 md:px-8">
      {/* Background Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <Reveal>
        <SectionHeader tagline="get_in_touch" title="Contact Me" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Column - Contact info cards */}
        <div className="lg:col-span-5 space-y-4">
          <Reveal delay={0.1}>
            <p className="text-[#8b8ba7] leading-relaxed mb-6">
              I'm always open to discussing new projects, design systems, API builds, or opportunities to join your product team. Send a note, and let's work together.
            </p>
          </Reveal>
          {contactItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Reveal key={index} delay={0.1 * index + 0.2}>
                <div className="flex items-center gap-4 bg-surface border border-border-subtle rounded-2xl p-5 hover:border-accent/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <a
                      href={item.href || "#"}
                      target={item.href?.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-[#f0f0ff] font-semibold hover:text-accent transition-colors text-sm md:text-base break-all"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Right Column - Contact form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.3}>
            <div className="bg-surface border border-border-subtle rounded-2xl p-8 relative overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Form Name field */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#4a4a6a] focus:border-accent focus:outline-none focus:shadow-glow-sm transition-all text-sm"
                  />
                </div>

                {/* Form Email field */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#4a4a6a] focus:border-accent focus:outline-none focus:shadow-glow-sm transition-all text-sm"
                  />
                </div>

                {/* Form Message field */}
                <div className="space-y-1">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    className="w-full bg-elevated border border-border-subtle rounded-xl px-4 py-3 text-[#f0f0ff] placeholder-[#4a4a6a] focus:border-accent focus:outline-none focus:shadow-glow-sm transition-all text-sm resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-accent hover:shadow-glow-md text-white font-semibold rounded-xl py-3.5 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    "Message Sent!"
                  ) : (
                    "Send Message →"
                  )}
                </button>

                {responseMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-sm font-medium border flex items-start gap-3 backdrop-blur-sm ${
                      isSubmitted
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : "bg-red-500/10 border-red-500/20 text-red-400"
                    }`}
                  >
                    {isSubmitted ? (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <p>{responseMessage}</p>
                  </motion.div>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
