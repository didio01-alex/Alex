import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import DashboardSection from "@/components/dashboard-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <DashboardSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
