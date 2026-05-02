"use client"
import { BlogCard } from "@/components/blog-card"
import { useEffect, useState } from "react"

export default function BlogPageClient() {
  const [blogsList, setBlogsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/blogs")
        const data = await res.json()
        if (data.success) {
          setBlogsList(data.data.map((b: any) => ({ ...b, id: b._id })))
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-12">All Blogs</h1>
      
      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading blogs...</div>
      ) : blogsList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsList.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-muted-foreground">No blogs found.</div>
      )}
    </div>
  )
}
