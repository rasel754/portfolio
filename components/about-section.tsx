"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { MapPin, Calendar, GraduationCap, Code2 } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    label: "Focus",
    value: "Full Stack Development",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "BSc in Computer Science",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Savar, Dhaka, Bangladesh",
  },
  {
    icon: Calendar,
    label: "Experience",
    value: "1.5+ Years Training",
  },
]

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [projectsCount, setProjectsCount] = useState<number | string>("3+")
  const [skillsCount, setSkillsCount] = useState<number | string>("6+")

  useEffect(() => {
    fetch("http://localhost:5000/api/p4/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setProjectsCount(data.data.length)
        }
      })
      .catch(console.error)

    fetch("http://localhost:5000/api/p4/skills", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.data) {
          setSkillsCount(data.data.length)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            About Me
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Get to Know Me
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="https://i.ibb.co.com/RTRgvtXK/1710414204719.jpg"
                    alt="Rasel Ahmed"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4">
                      {highlights.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {item.label}
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {item.value}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -top-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg glow"
              >
                <Code2 className="h-8 w-8 text-primary-foreground" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-4 -left-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary shadow-lg glow-accent"
              >
                <span className="text-2xl font-bold text-accent-foreground">
                  JS
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-heading text-2xl font-semibold text-foreground">
                A Passionate Developer Building the{" "}
                <span className="gradient-text">Future of Web</span>
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                I&apos;m Rasel Ahmed, a dedicated MERN Stack Developer from
                Savar, Dhaka, Bangladesh. Currently pursuing my BSc in Computer
                Science at City University while simultaneously completing an
                intensive 1.5-year Full Stack Web Development program at
                Programming Hero.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                My journey in web development began with a curiosity about how
                websites work, which quickly evolved into a passion for building
                them. I specialize in creating modern, responsive web
                applications using React, Node.js, Express, and MongoDB -
                the MERN stack.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I believe in writing clean, maintainable code and creating
                intuitive user experiences. When I&apos;m not coding, you&apos;ll
                find me exploring new technologies, contributing to open-source
                projects, or sharing my knowledge through technical blog posts.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {[
                { value: `${projectsCount}+`, label: "Projects" },
                { value: "1.5+", label: "Years" },
                { value: `${skillsCount}+`, label: "Technologies" },
                { value: "100%", label: "Dedication" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="group rounded-xl border border-border bg-card/50 p-4 text-center backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "Problem Solving",
                "Team Collaboration",
                "Quick Learner",
                "Attention to Detail",
                "Time Management",
                "Communication",
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
