import React from "react"

interface SectionHeaderProps {
  title: string
  tagline?: string
  eyebrow?: string
  subtitle?: string
}

export default function SectionHeader({ title, tagline, eyebrow, subtitle }: SectionHeaderProps) {
  const displayTagline = tagline || eyebrow
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      {displayTagline && (
        <p className="font-mono text-accent text-sm tracking-widest uppercase mb-2">
          {displayTagline.startsWith("//") ? displayTagline : `// ${displayTagline}`}
        </p>
      )}
      <h2 className="font-display text-4xl font-extrabold text-[#f0f0ff] md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary text-sm md:text-base max-w-2xl mt-4">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-0.5 bg-accent mt-4" />
    </div>
  )
}
