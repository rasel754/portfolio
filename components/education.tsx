"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar } from "lucide-react"

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "City University",
    duration: "2022 - Present",
    description: "Currently pursuing a degree with a focus on Web Development and Database Management.",
  },
  {
    degree: "Full Stack Web Development",
    institution: "Programming Hero",
    duration: "2024 - Present (1.5 years)",
    description: "Comprehensive training in MERN stack and modern web development practices.",
  },
  {
    degree: "Intermediate (Science)",
    institution: "Hajigonj Model Govt College",
    duration: "2019 - 2021",
    description: "Completed higher secondary education with a strong foundation in Physics, Chemistry, Biology, and Mathematics, laying the groundwork for advanced studies in technology.",
  },
];


export default function Education() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  }

  return (
    <section id="education" className="py-20 bg-dot-pattern">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="max-w-4xl mx-auto">
          <motion.h2 variants={titleVariants} className="text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block">
              Education
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
          </motion.h2>

          <motion.div className="space-y-8" variants={containerVariants}>
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ x: 5 }}
                className="relative pl-8 border-l-2 border-primary/30"
              >
                <motion.div
                  className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"
                  whileHover={{ scale: 1.2 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(255, 255, 255, 0)",
                      "0 0 8px rgba(255, 255, 255, 0.5)",
                      "0 0 0 rgba(255, 255, 255, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
                <div className="mb-1 flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">{item.degree}</h3>
                </div>
                <div className="mb-2 text-muted-foreground">{item.institution}</div>
                <div className="mb-3 flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {item.duration}
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
