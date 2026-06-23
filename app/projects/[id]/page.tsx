import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Github, ExternalLink, CheckCircle } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  liveUrl?: string
  content?: string[]
  features?: string[]
}

const fallbackProjects: Project[] = [
  {
    id: "p3",
    title: "NextMart",
    description: "A full-stack multi-vendor e-commerce marketplace with role-based dashboards for Admin, Vendor, and Customer. Built with Next.js 15, TypeScript, and MongoDB.",
    technologies: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co.com/JR7Ysr05/Screensh7ot.png",
    liveUrl: "https://next-mart-client-sable.vercel.app/",
    github: "https://github.com/rasel754/NextMart-Client",
    content: [
      "NextMart is a comprehensive e-commerce platform built with Next.js that enables multi-vendor marketplace functionality. The application provides both customer-facing shopping experiences and vendor dashboard interfaces for product and shop management.",
      "The architecture leverages Next.js 15 App Router alongside dynamic data caching. Admin panels feature full transaction histories, user verification blocks, and store activation controls, ensuring premium utility for platform owners."
    ],
    features: [
      "Multi-vendor shop creation and management",
      "Shopping cart functionality with order processing",
      "User authentication and role-based access control",
      "Product CRUD Operations",
      "Modern UI components built on accessibility-first design principles"
    ]
  },
  {
    id: "p2",
    title: "AdolBodol",
    description: "A team marketplace platform where users can browse, post, and exchange services. Full MERN stack with JWT auth and real-time features.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB"],
    image: "https://i.ibb.co.com/cK8nxcTW/Screenssshot.png",
    liveUrl: "https://adol-bodon-frontend.vercel.app/",
    github: "https://github.com/Mahmudul107/adolBodol-frontend",
    content: [
      "Adolbodol is a modern gadget buy & sell platform that provides a seamless user experience for browsing, listing, and managing gadgets for sale. This frontend project is built with Next.js and TypeScript, ensuring fast performance and maintainable code.",
      "With features like JWT-based authentication, role-based dashboards, secure form handling, and a themed UI, it offers a scalable and user-centric interface."
    ],
    features: [
      "JWT Authentication",
      "Role-Based Dashboard",
      "Dark/Light Theme Toggle",
      "Dynamic Forms",
      "State Management",
      "Toast Notifications"
    ]
  },
  {
    id: "p1",
    title: "Script & Scroll",
    description: "A full-featured e-commerce web app with product listings, cart management, user authentication, and an admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    image: "https://i.ibb.co.com/hR3t0ZxF/Screenshot.png",
    liveUrl: "https://assignment-four-client-ashy.vercel.app/",
    github: "https://github.com/rasel754/assignment-four-client",
    content: [
      "Script & Scroll is a modern e-commerce frontend built with React and Redux that provides both customer-facing shopping functionality and administrative management capabilities. The application implements a comprehensive stationery shopping experience.",
      "The system handles payment gateway APIs, checkout calculations, cart structures, and protected routes for administrators to manage inventory catalogs."
    ],
    features: [
      "Product Management",
      "User Authentication",
      "Role-Based Authorization",
      "Order Processing",
      "Payment Integration",
      "Request Validation"
    ]
  }
]

async function getProject(id: string): Promise<Project | null> {
  const localMatch = fallbackProjects.find((p) => p.id === id);
  if (localMatch) return localMatch;

  try {
    const res = await fetch(`https://portfolio-server-blush-one.vercel.app/api/p4/projects/${id}`, { cache: "no-store" })
    if (!res.ok) return null
    const json = await res.json()
    if (json.success) {
      return {
        id: json.data._id,
        title: json.data.title,
        description: json.data.description,
        image: json.data.image,
        technologies: json.data.technologies || [],
        github: json.data.github,
        liveUrl: json.data.liveUrl,
        content: json.data.content || [],
        features: json.data.features || []
      }
    }
    return null
  } catch (err) {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const project = await getProject(resolvedParams.id)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found",
    }
  }

  return {
    title: `${project.title} | Rasel Ahmed Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const project = await getProject(resolvedParams.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pb-24 relative bg-void">
      {/* 1. Hero Banner with Overlay */}
      <div className="relative h-[50vh] min-h-[350px] w-full overflow-hidden shrink-0">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end max-w-6xl mx-auto px-6 md:px-8 pb-12 z-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-4 hover:text-glow transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-[#f0f0ff] drop-shadow-[0_0_35px_rgba(108,99,255,0.4)]">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 mt-12 space-y-12 relative z-10">
        {/* 2. Overview Card */}
        <div className="bg-surface border border-border-subtle rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display font-bold text-2xl text-[#f0f0ff]">
              Project Overview
            </h2>
            <p className="text-[#8b8ba7] text-base leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto shrink-0 pt-2 md:pt-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-accent hover:shadow-glow-md text-white rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-105 duration-300 w-full md:w-auto"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-elevated border border-border-subtle text-[#f0f0ff] hover:border-accent rounded-xl px-5 py-3 text-sm transition-all hover:scale-105 duration-300 w-full md:w-auto"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* 3. Tech Stack Grid */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-xl text-[#f0f0ff]">
            Technologies Employed
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm bg-accent/10 text-accent border border-accent/20 rounded-full px-4 py-1.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          {/* 4. Challenges (Left side Content) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-2xl text-[#f0f0ff]">
              Challenges & Architecture
            </h3>
            <div className="border-l-2 border-accent pl-6 space-y-4">
              {project.content && project.content.length > 0 ? (
                project.content.map((p, i) => (
                  <p key={i} className="text-[#8b8ba7] text-base leading-relaxed">
                    {p}
                  </p>
                ))
              ) : (
                <p className="text-[#8b8ba7] text-base leading-relaxed">
                  Integrating real-time secure state management, data verification mechanisms, and designing responsive components for role-based administrative routes.
                </p>
              )}
            </div>
          </div>

          {/* 5. Future Plans (Right side features) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-2xl text-[#f0f0ff]">
              Key Features & Roadmap
            </h3>
            <div className="bg-surface border border-border-subtle rounded-2xl p-6 space-y-4">
              {project.features && project.features.length > 0 ? (
                <ul className="space-y-3">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#f0f0ff]">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3">
                  {["Performance optimizations", "Robust payment logs", "Enhanced JWT auth cycles", "Multi-language translations"].map((plan, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#f0f0ff]">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{plan}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
