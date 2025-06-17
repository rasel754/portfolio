import { BlogCard } from "@/components/blog-card"
import { blogPosts } from "@/lib/data"

export const metadata = {
  title: "Blog | Rasel Ahmed - MERN Stack Developer",
  description: "Blog posts by Rasel Ahmed, a MERN Stack Developer",
}

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </div>
  )
}
