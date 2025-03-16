import React from "react"
import HeroBackground from "@/components/landing/HeroBackground"
import HeroContent from "@/components/landing/HeroContent"
import HeroShowcase from "@/components/landing/HeroShowcase"

const HeroContainer: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      <HeroBackground />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          <HeroContent />
          <HeroShowcase />
        </div>
      </div>
    </section>
  )
}

export default HeroContainer
