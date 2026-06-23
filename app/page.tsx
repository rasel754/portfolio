import Hero from "@/components/hero/Hero"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import { Services } from "@/components/services/Services"
import ProjectsSection from "@/components/projects-section"
import EducationSection from "@/components/education-section"
import BlogSection from "@/components/blog-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <SkillsSection />
      <Services />
      <ProjectsSection />
      <EducationSection />
      <BlogSection />
      <ContactSection />
    </div>
  )
}
