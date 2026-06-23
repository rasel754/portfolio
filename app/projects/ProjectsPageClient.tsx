"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectCard, Project } from "@/components/project-card"

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

export default function ProjectsPageClient() {
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
          setProjectsList(apiList)
        } else {
          setProjectsList(fallbackProjects)
        }
      } catch (error) {
        console.error("API error loading projects:", error)
        setProjectsList(fallbackProjects)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative">
      {/* Background radial glow */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative z-10 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:text-glow transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="text-center space-y-4">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[#f0f0ff]">
            All Projects
          </h1>
          <p className="text-[#8b8ba7] max-w-xl mx-auto">
            Explore my web applications, backend services, and interface design explorations.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface border border-border-subtle rounded-2xl h-96 animate-pulse p-6 space-y-4">
                <div className="bg-elevated h-48 w-full rounded-xl" />
                <div className="bg-elevated h-6 w-3/4 rounded-full" />
                <div className="bg-elevated h-4 w-1/2 rounded-full" />
              </div>
            ))}
          </div>
        ) : projectsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {projectsList.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-[#8b8ba7]">No projects found.</div>
        )}
      </div>
    </div>
  )
}
