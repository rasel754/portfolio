"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"
import NextLink from "next/link"

const staticBlogs = [
  {
    id: "b1",
    title: "Why Choose the MERN Stack for Your Next Web Project?",
    excerpt: "The MERN stack is a popular web development framework that combines four powerful technologies: MongoDB, Express.js, React, and Node.js. Each component plays a crucial role in building dynamic web applications.",
    image: "https://i.ibb.co.com/1B0yMKQ/White-Blue-Illustration-Business-Blog-Banner.png",
    date: "June 3, 2026",
    readTime: "10 min read",
    url: "https://dly.to/OveKzgglTH0",
    tags: ["MERN Stack", "Web Development", "JavaScript"],
  },
  {
    id: "b2",
    title: "Building Modern Web Apps: TypeScript and Next.js Together",
    excerpt: "Among the many options available, TypeScript and Next.js have emerged as powerful allies for developers looking to build modern web applications. This post will explore how these two technologies work together.",
    image: "https://i.ibb.co.com/L4PbdGx/image-1.jpg",
    date: "May 15, 2026",
    readTime: "8 min read",
    url: "https://docs.google.com/document/d/1rQjCpuqu9qb-xu70qOeL7UJqW-HpjHNVmofSU5mmgO8/edit?usp=sharing",
    tags: ["TypeScript", "Next.js", "MERN Stack"],
  },
]

function BlogCard({ post, index }: { post: any; index: number }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface hover:border-accent/40 hover:shadow-glow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-xs text-[#8b8ba7] font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-accent" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gold" />
            {post.readTime}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="font-mono text-[10px] bg-accent/10 text-accent border border-accent/20 rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mb-3 font-display text-lg font-bold text-[#f0f0ff] line-clamp-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-[#8b8ba7] text-sm leading-relaxed line-clamp-3 mb-6">
          {post.excerpt}
        </p>
        <div className="mt-auto">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent text-sm font-semibold hover:gap-3 transition-all duration-300"
          >
            Read Article <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function BlogSection() {
  const [blogsList, setBlogsList] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/blogs")
        const data = await res.json()
        if (data.success && data.data && data.data.length > 0) {
          setBlogsList(data.data.slice(0, 3).map((b: any) => ({ ...b, id: b._id })))
        } else {
          setBlogsList(staticBlogs)
        }
      } catch (error) {
        console.error("Failed to load blogs from API, using static posts:", error)
        setBlogsList(staticBlogs)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  return (
    <section id="blog" className="relative py-24 md:py-32 overflow-hidden max-w-6xl mx-auto px-6 md:px-8">
      {/* Background Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <Reveal>
        <SectionHeader tagline="latest_articles" title="From My Blog" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-surface border border-border-subtle rounded-2xl h-80 animate-pulse flex flex-col p-6 space-y-4"
            >
              <div className="bg-elevated h-36 w-full rounded-xl" />
              <div className="bg-elevated h-6 w-3/4 rounded-full" />
              <div className="bg-elevated h-4 w-1/2 rounded-full" />
            </div>
          ))
        ) : blogsList.length > 0 ? (
          blogsList.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.1}>
              <BlogCard post={post} index={index} />
            </Reveal>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-[#8b8ba7]">No blogs found.</div>
        )}
      </div>

      <Reveal delay={0.4}>
        <div className="mt-16 text-center">
          <NextLink
            href="/blog"
            className="inline-flex items-center gap-2 border border-accent/40 text-accent hover:bg-accent/10 rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105 duration-300"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </Reveal>
    </section>
  )
}
