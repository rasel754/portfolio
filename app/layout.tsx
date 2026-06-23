import type React from "react"
import type { Metadata, Viewport } from "next"
import { spaceGrotesk, syne, jetbrainsMono } from "@/lib/fonts"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import CursorGlow from "@/components/ui/CursorGlow"

export const metadata: Metadata = {
  title: "Rasel Ahmed | MERN Stack Developer",
  description:
    "Portfolio of Rasel Ahmed - A passionate MERN Stack Developer building modern, scalable web applications with React, Node.js, Express, and MongoDB.",
  keywords: [
    "MERN Stack Developer",
    "React Developer",
    "Full Stack Developer",
    "Web Developer",
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Rasel Ahmed",
  ],
  authors: [{ name: "Rasel Ahmed" }],
  creator: "Rasel Ahmed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-iota-two-90.vercel.app",
    title: "Rasel Ahmed | MERN Stack Developer",
    description:
      "Portfolio of Rasel Ahmed - A passionate MERN Stack Developer building modern, scalable web applications.",
    siteName: "Rasel Ahmed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasel Ahmed | MERN Stack Developer",
    description:
      "Portfolio of Rasel Ahmed - A passionate MERN Stack Developer building modern, scalable web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#050508" },
    { media: "(prefers-color-scheme: dark)", color: "#050508" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased relative min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Space Control Room Background Gradients */}
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-void"
            style={{
              background: `
                radial-gradient(ellipse at 20% 50%, rgba(108,99,255,0.08) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 10%, rgba(167,139,250,0.05) 0%, transparent 50%)
              `,
            }}
          />
          {/* CSS Starfield overlay */}
          <div className="starfield" />

          {/* Mouse follow glow */}
          <CursorGlow />

          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
