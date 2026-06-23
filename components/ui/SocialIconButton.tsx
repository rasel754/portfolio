import React from "react"

interface SocialIconButtonProps {
  href: string
  icon: React.ReactNode
}

export default function SocialIconButton({ href, icon }: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-elevated border border-border-subtle hover:border-accent hover:shadow-glow-sm transition-all flex items-center justify-center text-[#8b8ba7] hover:text-[#f0f0ff] duration-300"
    >
      {icon}
    </a>
  )
}
