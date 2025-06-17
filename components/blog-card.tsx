"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  url: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col border-2 border-border hover:border-primary/50 transition-colors duration-300">
        <div className="relative h-48 overflow-hidden">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <CardContent className="pt-6 flex-grow relative z-10">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Calendar className="mr-1 h-4 w-4 text-primary" />
              {post.date}
            </motion.div>
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Clock className="mr-1 h-4 w-4 text-primary" />
              {post.readTime}
            </motion.div>
          </div>
          <motion.h3
            className="text-xl font-bold mb-2"
            animate={isHovered ? { color: "hsl(var(--primary))" } : {}}
            transition={{ duration: 0.3 }}
          >
            {post.title}
          </motion.h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <motion.span
                key={index}
                className="text-xs px-2 py-1 bg-primary/10 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            asChild
            variant="outline"
            className="w-full border-2 group hover:border-primary hover:bg-primary/5 transition-all duration-300"
          >
            <Link
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <span>Read Article</span>
              <motion.span
                animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                →
              </motion.span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
