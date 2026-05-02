"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function BlogCard({
  post,
  index,
  isInView,
}: {
  post: any
  index: number
  isInView: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl transition-all group-hover:scale-150" />

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      <div className="relative p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags?.map((tag: string) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/10 text-primary text-xs hover:bg-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h3 className="mb-3 font-heading text-xl font-semibold text-foreground line-clamp-2 transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
        >
          Read Article
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  )
}

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [blogsList, setBlogsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/blogs")
        const data = await res.json()
        if (data.success) {
          setBlogsList(data.data.slice(0, 3).map((b: any) => ({ ...b, id: b._id })))
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
    <section
      id="blog"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            Latest Articles
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            From My Blog
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            I write about web development, programming tips, and my experiences
            as a developer. Here are some of my recent articles.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full py-12 text-center text-muted-foreground">Loading blogs...</div>
          ) : blogsList.length > 0 ? (
            blogsList.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                isInView={isInView}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">No blogs found.</div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            asChild
            className="group border-primary/50 hover:bg-primary/10"
          >
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
