"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Globe, Facebook } from "lucide-react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [apiMessage, setApiMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitSuccess(true)
        setApiMessage(result.message) // Store the API message
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setApiMessage("")
        }, 5000)
      } else {
        // Handle API error response
        console.error("API Error:", result)
        alert(result.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Network Error:", error)
      alert("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const contactItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 + custom * 0.1, duration: 0.5 },
    }),
  }

  const socialsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const socialIconVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  }

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="contact" className="py-20 animated-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <div className="text-center mb-12">
            <motion.h2 variants={titleVariants} className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative">
                Get In Touch
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </motion.h2>
            <motion.p variants={titleVariants} className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out to me through any of the channels
              below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <motion.h3 className="text-xl font-semibold mb-6" variants={titleVariants}>
                Contact Information
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  custom={0}
                  variants={contactItemVariants}
                  className="flex items-start"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="bg-primary/10 p-3 rounded-full mr-4"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                    }}
                  >
                    <Mail className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:rasel.ahmed@example.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      raselahmed73614@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={contactItemVariants}
                  className="flex items-start"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="bg-primary/10 p-3 rounded-full mr-4"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                    }}
                  >
                    <Phone className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +8801624490189
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={contactItemVariants}
                  className="flex items-start"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="bg-primary/10 p-3 rounded-full mr-4"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                    }}
                  >
                    <MapPin className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">Savar, Dhaka-1340, Bangladesh</p>
                  </div>
                </motion.div>
              </div>

              <motion.div className="mt-10" variants={socialsVariants}>
                <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>

                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/rasel754"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIconVariants}
                    whileHover={{ y: -5 }}
                    className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Github className="h-6 w-6 text-primary" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>

                  <motion.a
                    href="https://www.linkedin.com/in/rasel754"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIconVariants}
                    whileHover={{ y: -5 }}
                    className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-primary" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/share/1C3hEcXE42/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIconVariants}
                    whileHover={{ y: -5 }}
                    className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Facebook className="h-6 w-6 text-primary" />
                    <span className="sr-only">Twitter</span>
                  </motion.a>

                  <motion.a
                    href="https://portfolio-iota-two-90.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={socialIconVariants}
                    whileHover={{ y: -5 }}
                    className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
                  >
                    <Globe className="h-6 w-6 text-primary" />
                    <span className="sr-only">Website</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.div variants={formVariants}>
              <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div variants={formItemVariants}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border-2 focus:border-primary/50 transition-colors"
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 focus:border-primary/50 transition-colors"
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <Input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border-2 focus:border-primary/50 transition-colors"
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full min-h-[150px] border-2 focus:border-primary/50 transition-colors"
                  />
                </motion.div>

                <motion.div variants={formItemVariants}>
                  <Button type="submit" className="w-full relative overflow-hidden group" disabled={isSubmitting}>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </span>
                      )}
                    </span>
                  </Button>
                </motion.div>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-md text-sm"
                  >
                    {apiMessage || "Your message has been sent successfully! I'll get back to you soon."}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
