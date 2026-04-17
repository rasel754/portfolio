"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const technicalSkills = [
  { name: "JavaScript", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "React.js", level: 85, color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js", level: 80, color: "from-green-400 to-green-600" },
  { name: "Express.js", level: 85, color: "from-gray-400 to-gray-600" },
  { name: "MongoDB", level: 75, color: "from-green-500 to-green-700" },
  { name: "Next.js", level: 80, color: "from-black to-gray-700 dark:from-white dark:to-gray-300" },
  { name: "TypeScript", level: 70, color: "from-blue-400 to-blue-600" },
  { name: "REST APIs", level: 85, color: "from-purple-400 to-purple-600" },
  { name: "HTML/CSS", level: 90, color: "from-orange-400 to-red-500" },
  { name: "Tailwind CSS", level: 85, color: "from-teal-400 to-teal-600" },
  { name: "Redux", level: 75, color: "from-violet-400 to-violet-600" },
  { name: "Git", level: 80, color: "from-orange-500 to-red-600" },
]

const tools = [
  { name: "VS Code", icon: "💻" },
  { name: "Git", icon: "📦" },
  { name: "GitHub", icon: "🐙" },
  { name: "Vercel", icon: "▲" },
  { name: "Postman", icon: "📮" },
  { name: "Figma", icon: "🎨" },
  { name: "npm", icon: "📦" },
  { name: "MongoDB Compass", icon: "🍃" },
]

const softSkills = [
  "Problem Solving",
  "Team Collaboration",
  "Quick Learner",
  "Attention to Detail",
  "Time Management",
  "Communication",
  "Adaptability",
  "Critical Thinking",
]

function SkillProgressRing({
  skill,
  index,
  isInView,
}: {
  skill: { name: string; level: number; color: string }
  index: number
  isInView: boolean
}) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (skill.level / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative flex flex-col items-center"
    >
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted/30"
          />
          <motion.circle
            cx="56"
            cy="56"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset }
                : { strokeDashoffset: circumference }
            }
            transition={{ delay: 0.5 + index * 0.05, duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 + index * 0.05 }}
            className="text-xl font-bold text-foreground"
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>
      <span className="mt-3 text-center text-sm font-medium text-foreground">
        {skill.name}
      </span>
    </motion.div>
  )
}

function SkillCard3D({
  skill,
  index,
  isInView,
}: {
  skill: { name: string; level: number; color: string }
  index: number
  isInView: boolean
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="perspective-1000 h-32"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-2 text-2xl font-bold text-foreground">
            {skill.name}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : {}}
              transition={{ delay: 0.5 + index * 0.05, duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
            />
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-primary/50 bg-gradient-to-br from-primary/20 to-secondary/20 p-4 backdrop-blur-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-4xl font-bold gradient-text">{skill.level}%</div>
          <div className="mt-2 text-sm text-muted-foreground">Proficiency</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-primary">
            My Expertise
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A comprehensive overview of my technical skills and the tools I use
            to build modern web applications.
          </p>
        </motion.div>

        <Tabs defaultValue="technical" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <TabsList className="glass h-auto p-1">
              <TabsTrigger
                value="technical"
                className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Technical Skills
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Tools
              </TabsTrigger>
              <TabsTrigger
                value="soft"
                className="px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Soft Skills
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="technical" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {technicalSkills.map((skill, index) => (
                <SkillProgressRing
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>

            <div className="mt-16">
              <h3 className="mb-8 text-center font-heading text-xl font-semibold text-foreground">
                Hover to see proficiency
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {technicalSkills.slice(0, 8).map((skill, index) => (
                  <SkillCard3D
                    key={`card-${skill.name}`}
                    skill={skill}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group flex flex-col items-center justify-center rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <span className="mb-3 text-4xl">{tool.icon}</span>
                  <span className="text-sm font-medium text-foreground">
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="soft" className="mt-0">
            <div className="flex flex-wrap justify-center gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative overflow-hidden rounded-full border border-border bg-card/50 px-6 py-3 backdrop-blur-sm transition-all hover:border-primary/50"
                >
                  <span className="relative z-10 font-medium text-foreground transition-colors group-hover:text-primary">
                    {skill}
                  </span>
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
