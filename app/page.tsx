import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import EducationSection from "@/components/education-section"
import BlogSection from "@/components/blog-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <BlogSection />
      <ContactSection />
    </div>
  )
}
