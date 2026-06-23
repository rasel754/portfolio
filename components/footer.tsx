"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { usePathname } from "next/navigation"
import SocialIconButton from "@/components/ui/SocialIconButton"

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith("/rasel754")) {
    return null
  }

  return (
    <footer className="border-t border-border-subtle bg-surface py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + tagline */}
        <div>
          <span className="font-mono text-accent font-bold text-lg">RA</span>
          <p className="text-muted-foreground text-sm mt-1">Building the web, one commit at a time.</p>
        </div>
        {/* Nav links */}
        <nav className="flex gap-6 text-sm text-[#8b8ba7]">
          {["Home", "About", "Skills", "Projects", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-accent transition-colors duration-300"
            >
              {l}
            </a>
          ))}
        </nav>
        {/* Social icons */}
        <div className="flex gap-3">
          <SocialIconButton href="https://github.com/rasel754" icon={<Github size={16} />} />
          <SocialIconButton href="https://linkedin.com/in/rasel754" icon={<Linkedin size={16} />} />
          <SocialIconButton href="mailto:raselahmed73614@gmail.com" icon={<Mail size={16} />} />
        </div>
      </div>
      <p className="text-center text-muted-foreground font-mono text-xs mt-8">
        © 2026 Rasel Ahmed · All rights reserved
      </p>
    </footer>
  )
}
