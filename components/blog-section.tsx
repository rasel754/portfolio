"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BlogCard } from "./blog-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { blogPosts } from "@/lib/data"

export default function BlogSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Only show 3 blog posts on the home page
  const featuredPosts = blogPosts.slice(0, 3)

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="blog" className="py-20 bg-dot-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <div className="text-center mb-12">
            <motion.h2 variants={titleVariants} className="text-3xl font-bold mb-4 relative inline-block">
              <span className="relative">
                Latest Blog Posts
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={isInView ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </span>
            </motion.h2>
            <motion.p variants={titleVariants} className="text-muted-foreground max-w-2xl mx-auto">
              I share my knowledge and experiences through writing. Check out some of my latest articles.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                custom={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.2 + i * 0.1,
                      duration: 0.5,
                    },
                  }),
                }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-12 text-center" variants={titleVariants} transition={{ delay: 0.6 }}>
            <Button asChild size="lg" className="relative overflow-hidden group">
              <Link href="/blog">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  View All Posts
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
