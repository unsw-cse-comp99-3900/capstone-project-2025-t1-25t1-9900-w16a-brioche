/**
 * @file FeaturesShowcase.tsx - Displays a responsive grid of feature cards on the landing page.
 */

import React from "react"
import FeatureCard from "@/components/landing/KeyFeatureCard"
import { landingFeature } from "@/constants/Landing/landingFeature"

/**
 * FeaturesShowcase Component
 *
 * This component renders a grid of feature cards using data from the `landingFeature` configuration.
 * Each card highlights a key product or service feature with title, description, and highlight info.
 *
 * @returns {JSX.Element} - The rendered grid of feature cards
 */
const FeaturesShowcase: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
      {landingFeature.showcase.map((feature, index) => (
        <FeatureCard key={index} {...feature} index={index} />
      ))}
    </div>
  )
}

export default FeaturesShowcase
