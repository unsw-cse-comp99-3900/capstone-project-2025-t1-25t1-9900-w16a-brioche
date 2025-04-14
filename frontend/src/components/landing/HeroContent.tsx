/**
 * @file HeroContent.tsx - Defines the left content section of the landing page's Hero area.
 */

import React from "react"
import FeatureBadge from "@/components/landing/FeatureBadge"
import HeroHeading from "@/components/landing/HeroHeading"
import HeroButtons from "@/components/landing/HeroButtons"
import FeatureList from "@/components/landing/FeatureList"
import { landingHero } from "@/constants/Landing/landingHero"

/**
 * HeroContent Component
 *
 * This component renders the primary textual content for the Hero section,
 * including a badge, heading, description, call-to-action buttons, and a feature list.
 *
 * It uses AOS (Animate on Scroll) attributes for scroll-based animation effects.
 *
 * @returns {JSX.Element} The content area for the Hero section of the landing page.
 */
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
