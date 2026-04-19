"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

export function ProjectDialog({ project, onSave }: { project?: any; onSave: (p: any, id?: string) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    github: "",
    liveUrl: "",
    content: "",
    features: "",
  })

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        image: project.image || "",
        technologies: (project.technologies || []).join(", "),
        github: project.github || "",
        liveUrl: project.liveUrl || "",
        content: (project.content || []).join(", "),
        features: (project.features || []).join(", "),
      })
    }
  }, [project])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        content: formData.content.split(",").map((c) => c.trim()).filter(Boolean),
        features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      }

      await onSave(payload, project?._id)
      setOpen(false)
      if (!project) {
        setFormData({
          title: "", description: "", image: "", technologies: "",
          github: "", liveUrl: "", content: "", features: ""
        })
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {project ? (
          <Button variant="outline" size="sm">Edit</Button>
        ) : (
          <Button><Plus className="h-4 w-4 mr-2" /> Add Project</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Make changes to your project below." : "Fill in the details to add a new project."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Technologies (Comma separated)</Label>
            <Input required value={formData.technologies} onChange={(e) => setFormData({ ...formData, technologies: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input required value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Live URL</Label>
              <Input required value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Content Details (Comma separated)</Label>
            <Textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Features (Comma separated)</Label>
            <Textarea required value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
