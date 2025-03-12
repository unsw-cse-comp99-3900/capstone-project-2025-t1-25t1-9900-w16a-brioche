import React from "react"
import ProcessFlow from "@/components/landing/ProcessFlow"
import BrowserFrame from "@/components/landing/BrowserFrame"
import ShowcaseBadge from "@/components/landing/ShowcaseBadge"
import GlowEffect from "@/components/common/GlowEffect"
import { landingHero } from "@/constants/Landing/landingHero"

const HeroShowcase: React.FC = () => {
  return (
    <div
      className="hidden md:block lg:w-1/2 mt-12 lg:mt-0"
      data-aos="fade-left"
      data-aos-duration="1000"
    >
      <div className="relative">
        <GlowEffect />

        <BrowserFrame>
          <img
            src={landingHero.showcase.imageUrl}
            alt={landingHero.showcase.imageAlt}
            className="w-full h-auto object-cover"
            style={{ maxHeight: "400px" }}
          />

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full opacity-80 blur-sm"></div>
          <div className="absolute top-1/2 left-4 w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-80 blur-sm"></div>
        </BrowserFrame>
        <ProcessFlow />
        <ShowcaseBadge
          position="-top-4 -left-4"
          text={landingHero.showcase.badgeText}
          variant="gradient"
        />
      </div>
    </div>
  )
}

export default HeroShowcase
