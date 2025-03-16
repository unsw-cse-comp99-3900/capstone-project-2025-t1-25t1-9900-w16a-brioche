import React from "react"
import HeroContainer from "@/containers/Landing/HeroContainer"
import FeatureSectionContainer from "@/containers/Landing/FeatureSectionContainer"
import ProcessContainer from "@/containers/Landing/ProcessContainer"
import BenefitsContainer from "@/containers/Landing/BenefitsContainer"
import CTAContainer from "@/containers/Landing/CTAContainer"

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroContainer />
      <FeatureSectionContainer />
      <ProcessContainer />
      <BenefitsContainer />
      <CTAContainer />
      {/* Add other sections here */}
    </div>
  )
}

export default LandingPage
