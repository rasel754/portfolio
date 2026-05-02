"use client"
import { ProjectCard } from "@/components/project-card"
import { useEffect, useState } from "react"

export default function ProjectsPageClient() {
  const [projectsList, setProjectsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/projects")
        const data = await res.json()
        if (data.success) {
          setProjectsList(data.data.map((p: any) => ({ ...p, id: p._id })))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-12">All Projects</h1>
      
      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading projects...</div>
      ) : projectsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">No projects found.</div>
      )}
    </div>
  )
}
