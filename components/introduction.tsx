"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function Introduction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <section id="about" className="py-20 animated-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={childVariants} className="text-3xl font-bold text-center mb-12 relative">
            <span className="relative inline-block">
              About Me
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <motion.div className="md:col-span-1" variants={childVariants}>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-70 blur-md"
                  animate={{
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src="https://i.ibb.co.com/RTRgvtXK/1710414204719.jpg"
                    alt="Rasel Ahmed"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </motion.div>

            <motion.div className="md:col-span-2 space-y-4" variants={childVariants}>
              <motion.h3 className="text-2xl font-semibold" variants={childVariants}>
                Hi, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Rasel Ahmed
                </span>
              </motion.h3>
              <motion.p className="text-muted-foreground" variants={childVariants}>
                I am a passionate MERN Stack Developer with expertise in building modern web applications. With a strong
                foundation in MongoDB, Express.js, React.js, and Node.js, I create scalable and efficient solutions that
                solve real-world problems.
              </motion.p>
              <motion.p className="text-muted-foreground" variants={childVariants}>
                My journey in web development started with a curiosity about how websites work, which evolved into a
                deep passion for creating intuitive and responsive user interfaces. I enjoy the challenge of turning
                complex problems into simple, elegant solutions.
              </motion.p>
              <motion.p className="text-muted-foreground" variants={childVariants}>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing my knowledge through blog posts and tutorials.
              </motion.p>

              <motion.div className="pt-4 flex flex-wrap gap-4" variants={childVariants}>
                {["MongoDB", "Express.js", "React.js", "Node.js", "Next.js", "Tailwind CSS"].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
