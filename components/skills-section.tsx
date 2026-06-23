"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"

interface SkillItem {
  name: string
  icon: string | React.ReactNode
  level: number
}

interface SkillsData {
  frontend: SkillItem[]
  backend: SkillItem[]
  tools: SkillItem[]
  soft: SkillItem[]
}

const staticSkills: SkillsData = {
  frontend: [
    { name: "React.js", icon: "⚛️", level: 90 },
    { name: "Next.js", icon: "▲", level: 85 },
    { name: "TypeScript", icon: "🔷", level: 80 },
    { name: "Tailwind CSS", icon: "🎨", level: 88 },
    { name: "HTML5/CSS3", icon: "🌐", level: 95 },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", level: 82 },
    { name: "Express.js", icon: "🚀", level: 80 },
    { name: "MongoDB", icon: "🍃", level: 78 },
    { name: "REST APIs", icon: "🔗", level: 85 },
  ],
  tools: [
    { name: "Git & GitHub", icon: "🐙", level: 88 },
    { name: "VS Code", icon: "💻", level: 95 },
    { name: "Vercel", icon: "▲", level: 85 },
    { name: "Figma", icon: "🎯", level: 65 },
    { name: "Postman", icon: "📮", level: 80 },
  ],
  soft: [
    { name: "Problem Solving", icon: "🧩", level: 90 },
    { name: "Clean Code", icon: "✨", level: 88 },
    { name: "Fast Learner", icon: "🚀", level: 92 },
    { name: "Team Player", icon: "🤝", level: 90 },
    { name: "Open Source Curious", icon: "🌐", level: 80 },
  ],
}

function SkillCard({ name, icon, level }: SkillItem) {
  return (
    <div className="bg-surface border border-border-subtle rounded-2xl p-5 hover:border-accent/40 hover:shadow-glow-sm transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl flex items-center justify-center h-10 w-10 shrink-0">
          {typeof icon === "string" ? icon : icon}
        </span>
        <span className="font-semibold text-[#f0f0ff]">{name}</span>
      </div>
      {/* Animated progress bar */}
      <div className="h-1.5 rounded-full bg-elevated overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-accent to-glow"
        />
      </div>
      <span className="font-mono text-xs text-[#4a4a6a] mt-2 block">{level}%</span>
    </div>
  )
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "tools" | "soft">("frontend")
  const [skillsData, setSkillsData] = useState<typeof staticSkills>(staticSkills)

  useEffect(() => {
    // Attempt to fetch from backend API
    const loadData = async () => {
      try {
        const skillsRes = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/skills")
        const skillsJson = await skillsRes.json()
        
        const toolsRes = await fetch("https://portfolio-server-blush-one.vercel.app/api/p4/tools")
        const toolsJson = await toolsRes.json()

        const apiSkills = skillsJson.data || []
        const apiTools = toolsJson.data || []

        if (apiSkills.length > 0 || apiTools.length > 0) {
          // Categorize dynamic skills based on names/categories
          const frontendList: SkillItem[] = []
          const backendList: SkillItem[] = []
          const toolsList: SkillItem[] = []

          apiSkills.forEach((skill: any) => {
            const nameLower = skill.name.toLowerCase()
            const item: SkillItem = {
              name: skill.name,
              icon: skill.logo ? (
                <img src={skill.logo} alt={skill.name} className="w-8 h-8 object-contain" />
              ) : (
                "⚡"
              ),
              level: skill.level || 80,
            }

            // Simple naming classification
            if (
              nameLower.includes("react") ||
              nameLower.includes("next") ||
              nameLower.includes("typescript") ||
              nameLower.includes("tailwind") ||
              nameLower.includes("html") ||
              nameLower.includes("css") ||
              nameLower.includes("javascript") ||
              nameLower.includes("js")
            ) {
              if (item.icon === "⚡") item.icon = "⚛️"
              frontendList.push(item)
            } else {
              if (item.icon === "⚡") item.icon = "🟢"
              backendList.push(item)
            }
          })

          apiTools.forEach((tool: any) => {
            toolsList.push({
              name: tool.name,
              icon: tool.icon ? (
                <img src={tool.icon} alt={tool.name} className="w-8 h-8 object-contain" />
              ) : (
                "💻"
              ),
              level: tool.level || 80,
            })
          })

          // Merge lists with static fallback lists to avoid removing default data
          const mergedFrontend = frontendList.length > 0 ? frontendList : staticSkills.frontend
          const mergedBackend = backendList.length > 0 ? backendList : staticSkills.backend
          const mergedTools = toolsList.length > 0 ? toolsList : staticSkills.tools

          setSkillsData({
            frontend: mergedFrontend,
            backend: mergedBackend,
            tools: mergedTools,
            soft: staticSkills.soft,
          })
        }
      } catch (err) {
        console.error("Failed to load dynamic skills/tools, using static config", err)
      }
    }
    loadData()
  }, [])

  const tabsList = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools" },
    { id: "soft", label: "Soft Skills" },
  ]

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden max-w-6xl mx-auto px-6 md:px-8">
      {/* Background Dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      <Reveal>
        <SectionHeader tagline="skills_and_expertise" title="Technical Arsenal" />
      </Reveal>

      {/* Tabs list */}
      <Reveal delay={0.2}>
        <div className="flex justify-center mb-12">
          <div className="bg-elevated border border-border-subtle rounded-full p-1.5 flex gap-2 overflow-x-auto no-scrollbar">
            {tabsList.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-6 py-2 rounded-full font-body text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-white shadow-glow-sm"
                      : "text-[#8b8ba7] hover:text-[#f0f0ff]"
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Skills Grid */}
      <div className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillsData[activeTab].map((skill, index) => (
              <SkillCard
                key={`${activeTab}-${skill.name}-${index}`}
                name={skill.name}
                icon={skill.icon}
                level={skill.level}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
