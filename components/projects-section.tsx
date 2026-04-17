"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { projects } from "@/lib/data"

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0]
  index: number
  isInView: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div
        className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-secondary to-accent opacity-0 blur transition-opacity duration-500 ${
          isHovered ? "opacity-75" : ""
        }`}
      />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 ${
              isHovered ? "scale-110 blur-0" : "scale-100"
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-90" : "opacity-70"
            }`}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center gap-4"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110"
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        <div className="p-6" style={{ transform: "translateZ(50px)" }}>
          <h3 className="mb-2 font-heading text-xl font-semibold text-foreground line-clamp-1">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/20"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-muted-foreground">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 text-muted-foreground hover:text-primary"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-1 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-8 text-muted-foreground hover:text-primary"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-1 h-4 w-4" />
                  Demo
                </a>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-primary hover:bg-primary/10"
            >
              Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Featured Work
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            My Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A selection of projects that showcase my skills in building modern,
            scalable web applications with the MERN stack and beyond.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            asChild
            className="group border-primary/50 hover:bg-primary/10"
          >
            <a
              href="https://github.com/rasel754"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Projects on GitHub
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
