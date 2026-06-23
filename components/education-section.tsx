"use client"

import { GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react"
import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"

const educationData = [
  {
    id: 1,
    title: "BSc in Computer Science",
    institution: "City University",
    location: "Dhaka, Bangladesh",
    period: "2022 - Present",
    description:
      "Currently pursuing a Bachelor's degree in Computer Science, focusing on software engineering, algorithms, and web technologies.",
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
    type: "education",
  },
]

export default function EducationSection() {
  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden max-w-6xl mx-auto px-6 md:px-8">
      {/* Background Dot pattern overlay */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <Reveal>
        <SectionHeader tagline="education_and_training" title="My Academic Journey" />
      </Reveal>

      {/* Timeline wrapper */}
      <div className="relative mt-16">
        {/* Center vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {educationData.map((item, index) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
              >
                {/* Desktop Left Side Card */}
                <div className={`hidden md:flex w-1/2 ${isLeft ? "justify-end pr-12" : "justify-start pl-12 invisible"}`}>
                  {isLeft && (
                    <Reveal delay={0.1 * index}>
                      <div className="bg-surface border border-border-subtle rounded-2xl p-6 max-w-md hover:border-accent/30 transition-colors duration-300">
                        <span className="font-mono text-xs bg-accent/10 text-accent rounded-full px-3 py-1 uppercase tracking-wide inline-block mb-3">
                          {item.type === "training" ? "Training" : "Education"}
                        </span>
                        <h3 className="font-display text-xl font-bold text-[#f0f0ff] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent font-semibold text-sm mb-2">
                          {item.institution}
                        </p>
                        <div className="flex gap-4 text-xs font-mono text-[#4a4a6a] mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {item.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {item.location}
                          </span>
                        </div>
                        <p className="text-[#8b8ba7] text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  )}
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 z-10 -translate-x-1/2">
                  <div className="w-4 h-4 rounded-full bg-accent shadow-glow-sm border-2 border-void" />
                </div>

                {/* Desktop Right Side Card */}
                <div className={`hidden md:flex w-1/2 ${!isLeft ? "justify-start pl-12" : "justify-end pr-12 invisible"}`}>
                  {!isLeft && (
                    <Reveal delay={0.1 * index}>
                      <div className="bg-surface border border-border-subtle rounded-2xl p-6 max-w-md hover:border-accent/30 transition-colors duration-300">
                        <span className="font-mono text-xs bg-accent/10 text-accent rounded-full px-3 py-1 uppercase tracking-wide inline-block mb-3">
                          {item.type === "training" ? "Training" : "Education"}
                        </span>
                        <h3 className="font-display text-xl font-bold text-[#f0f0ff] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-accent font-semibold text-sm mb-2">
                          {item.institution}
                        </p>
                        <div className="flex gap-4 text-xs font-mono text-[#4a4a6a] mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {item.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" /> {item.location}
                          </span>
                        </div>
                        <p className="text-[#8b8ba7] text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Reveal>
                  )}
                </div>

                {/* Mobile Card (Visible on mobile only, stacks to the right of line) */}
                <div className="md:hidden pl-10 w-full">
                  <Reveal delay={0.1 * index}>
                    <div className="bg-surface border border-border-subtle rounded-2xl p-6 hover:border-accent/30 transition-colors duration-300">
                      <span className="font-mono text-xs bg-accent/10 text-accent rounded-full px-3 py-1 uppercase tracking-wide inline-block mb-3">
                        {item.type === "training" ? "Training" : "Education"}
                      </span>
                      <h3 className="font-display text-xl font-bold text-[#f0f0ff] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-accent font-semibold text-sm mb-2">
                        {item.institution}
                      </p>
                      <div className="flex flex-wrap gap-4 text-xs font-mono text-[#4a4a6a] mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {item.location}
                        </span>
                      </div>
                      <p className="text-[#8b8ba7] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
