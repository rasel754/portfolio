"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react"

const education = [
  {
    id: 1,
    title: "BSc in Computer Science",
    institution: "City University",
    location: "Dhaka, Bangladesh",
    period: "2022 - Present",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science, focusing on software engineering, algorithms, and web technologies.",
    icon: GraduationCap,
    type: "education",
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    institution: "Programming Hero",
    location: "Online",
    period: "2024 - Present",
    description:
      "Intensive 1.5-year program covering the complete MERN stack, including React, Node.js, Express, MongoDB, TypeScript, and modern development practices.",
    icon: BookOpen,
    type: "training",
  },
  {
    id: 3,
    title: "Intermediate in Science",
    institution: "Hajigonj Model Govt College",
    location: "Chandpur, Bangladesh",
    period: "2019 - 2021",
    description:
      "Completed higher secondary education with a focus on science subjects, building a strong foundation in mathematics and physics.",
    icon: GraduationCap,
    type: "education",
  },
]

function TimelineItem({
  item,
  index,
  isInView,
  isLast,
}: {
  item: (typeof education)[0]
  index: number
  isInView: boolean
  isLast: boolean
}) {
  const isLeft = index % 2 === 0

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`hidden w-full md:flex ${isLeft ? "justify-end pr-8 lg:pr-16" : "justify-start pl-8 lg:pl-16"} md:w-1/2`}
      >
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <TimelineCard item={item} />
          </motion.div>
        )}
      </div>

      <div className="absolute left-1/2 z-10 flex -translate-x-1/2 flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-md animate-pulse" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary to-secondary shadow-lg">
            <item.icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            className="w-0.5 bg-gradient-to-b from-primary/50 to-secondary/50"
            style={{ minHeight: "120px" }}
          />
        )}
      </div>

      <div
        className={`hidden w-full md:flex ${!isLeft ? "justify-end pr-8 lg:pr-16" : "justify-start pl-8 lg:pl-16"} md:w-1/2`}
      >
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <TimelineCard item={item} />
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.2, duration: 0.5 }}
        className="ml-20 w-full md:hidden"
      >
        <TimelineCard item={item} />
      </motion.div>
    </div>
  )
}

function TimelineCard({ item }: { item: (typeof education)[0] }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-2xl transition-all group-hover:scale-150" />

      <div className="relative">
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
              item.type === "training"
                ? "bg-accent/10 text-accent"
                : "bg-primary/10 text-primary"
            }`}
          >
            {item.type === "training" ? "Training" : "Education"}
          </span>
        </div>

        <h3 className="mb-2 font-heading text-xl font-semibold text-foreground">
          {item.title}
        </h3>

        <p className="mb-3 text-lg font-medium text-primary">
          {item.institution}
        </p>

        <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {item.period}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {item.location}
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            My Journey
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Education & Training
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            My educational background and professional training that shaped my
            skills as a developer.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20 md:block" />
          <div className="absolute left-7 top-0 h-full w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20 md:hidden" />

          <div className="space-y-12 md:space-y-0">
            {education.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
                isLast={index === education.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
