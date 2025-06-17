import Banner from "@/components/banner"
import Introduction from "@/components/introduction"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Skills from "@/components/skills"
import ProjectsSection from "@/components/projects-section"
import BlogSection from "@/components/blog-section"
import Contact from "@/components/contact"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Banner />
      <Introduction />
      <Education />
      {/* <Experience /> */}
      <Skills />
      <ProjectsSection />
      <BlogSection />
      <Contact />
    </div>
  )
}
