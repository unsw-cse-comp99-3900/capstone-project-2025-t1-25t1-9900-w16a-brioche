import React from "react"
import FeaturesBackground from "@/components/landing/FeaturesBackground";
import FeaturesContent from "@/components/landing/FeaturesContent";
import FeaturesShowcase from "@/components/landing/KeyFeaturesShowcase";

const FeatureSectionContainer: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
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
