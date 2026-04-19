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

export function BlogDialog({ blog, onSave }: { blog?: any; onSave: (b: any, id?: string) => Promise<void> }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    image: "",
    date: "",
    readTime: "",
    url: "",
    tags: "",
  })

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        image: blog.image || "",
        date: blog.date || "",
        readTime: blog.readTime || "",
        url: blog.url || "",
        tags: (blog.tags || []).join(", "),
      })
    }
  }, [blog])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      }

      await onSave(payload, blog?._id)
      setOpen(false)
      if (!blog) {
        setFormData({ title: "", excerpt: "", image: "", date: "", readTime: "", url: "", tags: "" })
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
        {blog ? (
          <Button variant="outline" size="sm">Edit</Button>
        ) : (
          <Button><Plus className="h-4 w-4 mr-2" /> Add Blog</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog" : "Add New Blog"}</DialogTitle>
          <DialogDescription>
            {blog ? "Make changes to your blog post below." : "Fill in the details to add a new blog post."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea required value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Read Time</Label>
              <Input required placeholder="e.g. 5 min read" value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Read More URL</Label>
            <Input required value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Tags (Comma separated)</Label>
            <Input required value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
