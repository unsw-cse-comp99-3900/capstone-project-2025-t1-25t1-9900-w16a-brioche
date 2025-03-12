import React from "react"
import FeatureItem from "@/components/landing/FeatureItem"
import { landingHero } from "@/constants/Landing/landingHero"

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
