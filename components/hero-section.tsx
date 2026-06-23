"use client"

import Hero from "@/components/ui/animated-shader-hero"

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <Hero
      trustBadge={{ text: "White Hat Security Analyst" }}
      headline={{
        line1: "DIDIO Alex",
        line2: "White Hat Security",
      }}
      subtitle="Level 3 Cybersecurity Specialist focused on ethical hacking, vulnerability assessment, and data analysis."
      buttons={{
        primary: { text: "Explore Operations", onClick: () => scrollTo("projects") },
        secondary: { text: "Download Resume", onClick: () => scrollTo("contact") },
      }}
    />
  )
}
