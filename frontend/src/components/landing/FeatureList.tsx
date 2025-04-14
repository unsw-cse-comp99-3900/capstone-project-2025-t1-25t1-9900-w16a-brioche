/**
 * @file FeatureList.tsx - Renders a styled list of product or service features using the FeatureItem component.
 */

import React from "react"
import FeatureItem from "@/components/landing/FeatureItem"
import { landingHero } from "@/constants/Landing/landingHero"

/**
 * FeatureList Component
 *
 * Displays a heading followed by a grid of key features, each rendered using the `FeatureItem` component.
 * Content is sourced from the `landingHero.featureList` configuration.
 *
 * @returns {JSX.Element} A styled list of features displayed in a responsive grid layout.
 */
const FeatureList: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-secondary-100">
      <h3 className="font-medium text-secondary-900">
        {landingHero.featureList.heading}
      </h3>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {landingHero.featureList.features.map((feature, index) => (
          <FeatureItem key={index} text={feature} />
        ))}
      </div>
    </div>
  )
}

export default FeatureList
