"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  liveUrl?: string
  content?: string[]
  features?: string[]
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-glow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-void/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white rounded-full px-4 py-2 text-sm font-semibold hover:shadow-glow-sm transition-shadow"
            >
              Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-elevated border border-border-subtle text-[#f0f0ff] rounded-full px-4 py-2 text-sm hover:border-accent transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs bg-accent/10 text-accent border border-accent/20 rounded-full px-3 py-1"
            >
              {tech}
            </span>
          ))}
          {project.technologies && project.technologies.length > 4 && (
            <span className="font-mono text-xs border border-border-subtle text-[#8b8ba7] rounded-full px-2 py-1">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <h3 className="font-display text-xl text-[#f0f0ff] mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-[#8b8ba7] text-sm leading-relaxed line-clamp-2 mb-6">
          {project.description}
        </p>
        <div className="mt-auto">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
          >
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
