"use client"

import { useEffect, useState } from "react"
import Link from "next/image"
import NextLink from "next/link"
import { ArrowRight } from "lucide-react"
import ProjectCard, { Project } from "./project-card"
import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"

const fallbackProjects: Project[] = [
  {
    id: "p3",
    title: "NextMart",
    description: "A full-stack multi-vendor e-commerce marketplace with role-based dashboards for Admin, Vendor, and Customer. Built with Next.js 15, TypeScript, and MongoDB.",
    technologies: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co.com/JR7Ysr05/Screensh7ot.png",
    liveUrl: "https://next-mart-client-sable.vercel.app/",
    github: "https://github.com/rasel754/NextMart-Client",
  },
  {
    id: "p2",
    title: "AdolBodol",
    description: "A team marketplace platform where users can browse, post, and exchange services. Full MERN stack with JWT auth and real-time features.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    image: "https://i.ibb.co.com/cK8nxcTW/Screenssshot.png",
    liveUrl: "https://adol-bodon-frontend.vercel.app/",
    github: "https://github.com/Mahmudul107/adolBodol-frontend",
  },
  {
    id: "p1",
    title: "Script & Scroll",
    description: "A full-featured e-commerce web app with product listings, cart management, user authentication, and an admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    image: "https://i.ibb.co.com/hR3t0ZxF/Screenshot.png",
    liveUrl: "https://assignment-four-client-ashy.vercel.app/",
    github: "https://github.com/rasel754/assignment-four-client",
  },
]

export default function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/projects")
        const data = await res.json()
        if (data.success && data.data && data.data.length > 0) {
          const apiList = data.data.map((p: any) => ({
            id: p._id,
            title: p.title,
            description: p.description,
            image: p.image,
            technologies: p.technologies || [],
            github: p.github,
            liveUrl: p.liveUrl,
            content: p.content,
            features: p.features,
          }))
          setProjectsList(apiList.slice(0, 3))
        } else {
          setProjectsList(fallbackProjects)
        }
      } catch (error) {
        console.error("API error loading projects, falling back:", error)
        setProjectsList(fallbackProjects)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden max-w-6xl mx-auto px-6 md:px-8">
      {/* Background Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <Reveal>
        <SectionHeader tagline="featured_work" title="My Projects" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface border border-border-subtle rounded-2xl h-96 animate-pulse flex flex-col p-6 space-y-4"
            >
              <div className="bg-elevated h-48 w-full rounded-xl" />
              <div className="bg-elevated h-6 w-3/4 rounded-full" />
              <div className="bg-elevated h-4 w-1/2 rounded-full" />
            </div>
          ))
        ) : projectsList.length > 0 ? (
          projectsList.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#8b8ba7]">No projects found.</div>
        )}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-16 text-center">
          <NextLink
            href="/projects"
            className="inline-flex items-center gap-2 border border-accent/40 text-accent hover:bg-accent/10 rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105 duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </Reveal>
    </section>
  )
}
