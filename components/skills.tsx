"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Database, Server, Globe, Palette, Layers, GitBranch, Terminal, Cpu, Wrench } from "lucide-react"

const skillsData = {
  technical: [
    { name: "JavaScript", icon: <Code />, level: 90 },
    { name: "React.js", icon: <Code />, level: 85 },
    { name: "Node.js", icon: <Server />, level: 80 },
    { name: "Express.js", icon: <Server />, level: 85 },
    { name: "MongoDB", icon: <Database />, level: 75 },
    { name: "Next.js", icon: <Code />, level: 80 },
    { name: "TypeScript", icon: <Code />, level: 70 },
    { name: "RESTful APIs", icon: <Globe />, level: 85 },
    { name: "HTML/CSS", icon: <Palette />, level: 90 },
    { name: "Tailwind CSS", icon: <Palette />, level: 85 },
    { name: "Redux", icon: <Layers />, level: 75 },
    { name: "Git/GitHub", icon: <GitBranch />, level: 80 },
  ],
  soft: [
    "Problem Solving",
    "Communication",
    "Team Collaboration",
    "Time Management",
    "Adaptability",
    // "Critical Thinking",
    "Attention to Detail",
    // "Project Management",
  ],
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 bg-dot-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={titleVariants} className="text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block">
              Skills
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.h3 className="text-xl font-semibold mb-6 flex items-center" variants={titleVariants}>
                <Cpu className="mr-2 h-5 w-5 text-primary" />
                Technical Skills
              </motion.h3>

              <div className="space-y-6">
                {skillsData.technical.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <div className="flex justify-between mb-1">
                      <div className="flex items-center">
                        <span className="text-primary mr-2">{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <motion.h3 className="text-xl font-semibold mb-6 flex items-center" variants={titleVariants}>
                <Wrench className="mr-2 h-5 w-5 text-primary" />
                Soft Skills
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skillsData.soft.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(var(--primary), 0.2)",
                      transition: { duration: 0.2 },
                    }}
                    className="bg-primary/5 rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <motion.h3 className="text-xl font-semibold mb-6 flex items-center" variants={titleVariants}>
                  <Terminal className="mr-2 h-5 w-5 text-primary" />
                  Tools & Environments
                </motion.h3>

                <div className="flex flex-wrap gap-3">
                  {[
                    "VS Code",
                    "Git",
                    "GitHub",
                    // "Docker",
                    // "AWS",
                    // "Netlify",
                    "Vercel",
                    "Postman",
                    "Figma",
                    "npm",
                    // "Webpack",
                  ].map((tool, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true, margin: "-50px" }}
                      whileHover={{
                        y: -5,
                        backgroundColor: "rgba(var(--primary), 0.2)",
                        transition: { duration: 0.2 },
                      }}
                      className="px-3 py-1 bg-primary/5 rounded-full text-sm"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
