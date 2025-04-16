/**
 * @file FeatureSectionContainer.tsx - Defines the feature section component for the landing page
 * Contains the feature section background, content and showcase components
 */

/**
 * FeatureSectionContainer Component
 *
 * This component renders the features section of the landing page,
 * including a background component, feature content descriptions,
 * and a showcase of key product features.
 *
 * The section includes:
 * - Background visual elements
 * - Feature content descriptions and headings
 * - Interactive feature showcase component
 *
 * @returns {JSX.Element} The features section container component
 */

import React from "react"
import FeaturesBackground from "@/components/landing/FeaturesBackground"
import FeaturesContent from "@/components/landing/FeaturesContent"
import FeaturesShowcase from "@/components/landing/KeyFeaturesShowcase"

const FeatureSectionContainer: React.FC = () => {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <FeaturesBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col items-center">
          <FeaturesContent />
          <FeaturesShowcase />
        </div>
      </div>
    </section>
  )
}

export default FeatureSectionContainer
