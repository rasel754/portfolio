"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, Calendar, MapPin } from "lucide-react"

const experienceData = [
  {
    position: "Senior MERN Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA (Remote)",
    duration: "2022 - Present",
    description:
      "Leading a team of developers to build scalable web applications using the MERN stack. Implemented CI/CD pipelines and improved application performance by 40%.",
    responsibilities: [
      "Architected and developed full-stack applications using MongoDB, Express.js, React, and Node.js",
      "Mentored junior developers and conducted code reviews",
      "Implemented best practices for security and performance optimization",
      "Collaborated with product managers and designers to deliver high-quality user experiences",
    ],
  },
  {
    position: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    duration: "2020 - 2022",
    description:
      "Developed and maintained web applications for clients across various industries. Worked on both frontend and backend development using the MERN stack.",
    responsibilities: [
      "Built responsive and interactive user interfaces using React.js",
      "Developed RESTful APIs using Node.js and Express.js",
      "Designed and implemented MongoDB database schemas",
      "Integrated third-party APIs and services",
    ],
  },
  {
    position: "Web Development Intern",
    company: "StartUp Hub",
    location: "Boston, MA",
    duration: "2019 - 2020",
    description:
      "Assisted in the development of web applications and gained hands-on experience with modern web technologies.",
    responsibilities: [
      "Assisted senior developers in building web applications",
      "Implemented UI components using React.js",
      "Worked on bug fixes and feature enhancements",
      "Participated in code reviews and team meetings",
    ],
  },
]

export default function Experience() {
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
    <section id="experience" className="py-20 animated-gradient-subtle">
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
              Professional Experience
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
          </motion.h2>

          <div className="space-y-12">
            {experienceData.map((item, index) => (
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
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">{item.position}</h3>
                </div>
                <div className="mb-2 text-muted-foreground">{item.company}</div>
                <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {item.duration}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {item.location}
                  </div>
                </div>
                <p className="mb-4 text-muted-foreground">{item.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                  <ul className="list-none space-y-1 text-muted-foreground">
                    {item.responsibilities.map((responsibility, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start"
                      >
                        <motion.span
                          className="inline-block h-5 w-5 mr-2 text-primary flex-shrink-0"
                          whileHover={{ rotate: 20 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </motion.span>
                        {responsibility}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
