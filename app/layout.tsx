import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

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
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
