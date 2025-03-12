import React from "react"
import FeatureBadge from "@/components/landing/FeatureBadge"
import HeroHeading from "@/components/landing/HeroHeading"
import HeroButtons from "@/components/landing/HeroButtons"
import FeatureList from "@/components/landing/FeatureList"
import { landingHero } from "@/constants/Landing/landingHero"

const HeroContent: React.FC = () => {
  return (
    <div
      className="lg:w-1/2 lg:pr-12"
      data-aos="fade-right"
      data-aos-duration="1000"
    >
      {/* Decorative element */}
      <FeatureBadge text={landingHero.content.badgeText} />

      <HeroHeading />

      <p className="mt-6 text-xl text-secondary-600 max-w-2xl">
        {landingHero.content.description}
      </p>

      <HeroButtons />

      <div className="mt-8">
        <FeatureList />
      </div>
    </div>
  )
}

export default HeroContent
