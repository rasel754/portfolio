"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { useState } from "react"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  liveUrl?: string
  content: string[]
  features?: string[]
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col border-2 border-border hover:border-primary/50 transition-colors duration-300">
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <CardContent className="pt-6 flex-grow relative z-10">
          <motion.h3
            className="text-xl font-bold mb-2"
            animate={isHovered ? { color: "hsl(var(--primary))" } : {}}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                  {tech}
                </Badge>
              </motion.div>
            ))}
            {project.technologies.length > 3 && <Badge variant="outline">+{project.technologies.length - 3}</Badge>}
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Button asChild className="relative overflow-hidden group">
            <Link href={`/projects/${project.id}`}>
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">View Details</span>
            </Link>
          </Button>
          <div className="flex gap-2">
            {project.github && (
              <Button
                size="icon"
                variant="outline"
                asChild
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                size="icon"
                variant="outline"
                asChild
                className="border-2 hover:border-primary/50 transition-colors"
              >
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Live Demo</span>
                </Link>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
