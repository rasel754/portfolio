"use client"

import { useEffect, useState } from "react"
import { fetchProjects, createProject, updateProject, deleteProject } from "../utils/api"
import { ProjectDialog } from "../components/ProjectDialog"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash2 } from "lucide-react"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await fetchProjects()
      setProjects(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const handleSave = async (projectData: any, id?: string) => {
    if (id) {
      await updateProject(id, projectData)
    } else {
      await createProject(projectData)
    }
    await loadProjects()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id)
        await loadProjects()
      } catch (error) {
        console.error(error)
        alert("Failed to delete")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your spectacular portfolio projects here.</p>
        </div>
        <ProjectDialog onSave={handleSave} />
      </div>

      <div className="rounded-md border bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Live URL</TableHead>
              <TableHead>GitHub</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Loading projects...
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No projects found. Add your first project!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <img src={project.image} alt={project.title} className="w-16 h-10 object-cover rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                      View Live
                    </a>
                  </TableCell>
                  <TableCell>
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                      GitHub
                    </a>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <ProjectDialog project={project} onSave={handleSave} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
