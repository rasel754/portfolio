"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { projects } from "@/lib/data"

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Only show 3 projects on the home page
  const featuredProjects = projects.slice(0, 3)

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projects" className="py-20 animated-gradient-subtle">
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
                Featured Projects
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </motion.h2>
            <motion.p variants={titleVariants} className="text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects. Each project showcases different skills and technologies from my
              stack.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2 + i * 0.1,
                      duration: 0.5,
                    },
                  }),
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-12 text-center" variants={titleVariants} transition={{ delay: 0.6 }}>
            <Button asChild size="lg" className="relative overflow-hidden group">
              <Link href="/projects">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  View All Projects
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
