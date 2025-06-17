"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Facebook } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.footer
      className="bg-muted py-12 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={footerVariants}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <Link
              href="/"
              className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Rasel Ahmed
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              A passionate MERN Stack Developer focused on creating intuitive and efficient web applications that solve
              real-world problems.
            </p>
            <div className="flex space-x-4 mt-6">
              <motion.a
                href="hhttps://github.com/rasel754"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </motion.a>
              <motion.a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/1C3hEcXE42/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </motion.a>
              <motion.a
                href="raselahmed73614@gmail.com"
                className="hover:text-primary transition-colors"
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/#about", label: "About" },
                { href: "/#skills", label: "Skills" },
                { href: "/projects", label: "Projects" },
                { href: "/blog", label: "Blog" },
                { href: "/#contact", label: "Contact" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <motion.li className="text-muted-foreground" whileHover={{ x: 5 }}>
                Savar, Dhaka-1340, Bangladesh
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link
                  href="mailto:rasel.ahmed@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  raselahmed73614@gmail.com
                </Link>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <Link href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                 +8801624490189
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-sm text-muted-foreground">&copy; {currentYear} Rasel Ahmed. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6 text-sm">
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
