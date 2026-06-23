"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import SectionHeader from "@/components/ui/SectionHeader"
import Reveal from "@/components/ui/Reveal"

const traits = [
  "Problem Solver",
  "Clean Code Advocate",
  "Fast Learner",
  "Team Player",
  "Open Source Curious",
]

const infoItems = [
  { label: "Name", value: "Rasel Ahmed" },
  { label: "Location", value: "Savar, Dhaka, Bangladesh" },
  { label: "Degree", value: "BSc in CSE" },
  { label: "University", value: "City University" },
  { label: "Email", value: "raselahmed73614@gmail.com" },
  { label: "Status", value: "Open to Work" },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden max-w-6xl mx-auto px-6 md:px-8">
      <Reveal>
        <SectionHeader tagline="about_me" title="Get to Know Me" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
        {/* Left Column - Image Block */}
        <div className="lg:col-span-5 flex justify-center items-center relative py-8">
          <Reveal delay={0.2}>
            <div className="relative">
              {/* Image Container matching hero style but static */}
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] rounded-3xl overflow-hidden border-2 border-accent/30 bg-[#0d0d16]"
                style={{
                  boxShadow: "0 0 60px rgba(108,99,255,0.15), inset 0 0 40px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src="https://i.ibb.co.com/RTRgvtXK/1710414204719.jpg"
                  alt="Rasel Ahmed About Avatar"
                  fill
                  sizes="(max-width: 640px) 288px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                  className="object-cover"
                />
              </div>

              {/* Floating info cards */}
              <div className="absolute -top-3 -right-4 sm:-top-4 sm:-right-8 bg-glass-bg backdrop-blur-md border border-border-subtle rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-mono text-[#f0f0ff] whitespace-nowrap shadow-lg">
                📍 Savar, Dhaka, Bangladesh
              </div>

              <div className="absolute -bottom-3 -left-4 sm:-bottom-4 sm:-left-8 bg-glass-bg backdrop-blur-md border border-border-subtle rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-mono text-[#f0f0ff] whitespace-nowrap shadow-lg">
                🎓 CSE @ City University
              </div>

              <div className="absolute top-1/2 -right-6 sm:-right-12 -translate-y-1/2 bg-glass-bg backdrop-blur-md border border-border-subtle rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs font-mono text-[#f0f0ff] whitespace-nowrap shadow-lg">
                💼 Open to Work
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column - Content */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal delay={0.3}>
            <div className="space-y-4 text-[#8b8ba7] leading-relaxed text-base">
              <p>
                My programming journey was supercharged by the intensive curriculum at **Programming Hero**, where I developed a robust grounding in full stack architectures and web development fundamentals.
              </p>
              <p>
                I construct fast, reliable web platforms using the **MERN Stack** (MongoDB, Express, React, Node.js) and modern **Next.js 15**. I focus on creating clean APIs, building responsive multi-vendor systems, and ensuring seamless database queries.
              </p>
              <p>
                Beyond writing lines of code, I value performance tuning, system responsiveness, and clean UI execution. I approach every project with curiosity, looking to learn, build, and optimize daily.
              </p>
            </div>
          </Reveal>

          {/* Trait Chips */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2 pt-2">
              {traits.map((trait, index) => (
                <span
                  key={index}
                  className="bg-elevated border border-border-subtle rounded-full px-4 py-1.5 text-sm text-[#8b8ba7] hover:border-accent hover:text-[#6c63ff] transition-all cursor-default"
                >
                  {trait}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Info Grid (2x3) */}
          <Reveal delay={0.5}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-border-subtle">
              {infoItems.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-[#4a4a6a] font-mono text-xs uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-[#f0f0ff] font-semibold text-sm mt-1">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
