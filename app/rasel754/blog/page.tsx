"use client"

import { useEffect, useState } from "react"
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../utils/api"
import { BlogDialog } from "../components/BlogDialog"
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadBlogs = async () => {
    setLoading(true)
    try {
      const data = await fetchBlogs()
      setBlogs(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
  }, [])

  const handleSave = async (blogData: any, id?: string) => {
    if (id) {
      await updateBlog(id, blogData)
    } else {
      await createBlog(blogData)
    }
    await loadBlogs()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await deleteBlog(id)
        await loadBlogs()
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
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground mt-2">Manage your thoughts and articles here.</p>
        </div>
        <BlogDialog onSave={handleSave} />
      </div>

      <div className="rounded-md border bg-card/50 backdrop-blur-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Read Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  Loading blogs...
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No blogs found. Start writing!
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>
                    <img src={blog.image} alt={blog.title} className="w-16 h-10 object-cover rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>{blog.date}</TableCell>
                  <TableCell>{blog.readTime}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <BlogDialog blog={blog} onSave={handleSave} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(blog._id)}>
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
