import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"

async function getProject(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/p4/projects/${id}`, { cache: "no-store" })
    if (!res.ok) return null
    const json = await res.json()
    if (json.success) return { ...json.data, id: json.data._id }
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
    <div className="container mx-auto px-4 py-24">
      <Link href="/projects">
        <Button variant="outline" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={1200}
            height={675}
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <p className="text-muted-foreground">{project.description}</p>

          <div>
            <h3 className="text-xl font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-muted rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.github && (
              <Button asChild>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
            )}

            {project.liveUrl && (
              <Button asChild variant="outline">
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-3xl font-bold">Project Details</h2>
        <div className="prose dark:prose-invert max-w-none">
          {project.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {project.features && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
