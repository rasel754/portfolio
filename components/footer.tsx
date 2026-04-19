"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { usePathname } from "next/navigation"

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/rasel754",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rasel754",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:raselahmed73614@gmail.com",
  },
]

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  if (pathname?.startsWith("/rasel754")) {
    return null
  }

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <button
              onClick={() => handleNavClick("#home")}
              className="group inline-flex items-center gap-2"
            >
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent opacity-80" />
                <div className="absolute inset-[2px] rounded-[6px] bg-background" />
                <span className="relative font-heading text-lg font-bold gradient-text">
                  RA
                </span>
              </div>
              <span className="font-heading text-xl font-semibold text-foreground">
                Rasel Ahmed
              </span>
            </button>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A passionate MERN Stack Developer building modern, scalable web
              applications with clean code and exceptional user experiences.
            </p>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <ul className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex gap-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 transition-all hover:border-primary hover:bg-primary/10"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-2 border-t border-border pt-8 text-center"
          >
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              Built with{" "}
              <Heart className="h-4 w-4 fill-red-500 text-red-500" /> by Rasel
              Ahmed
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Rasel Ahmed. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
