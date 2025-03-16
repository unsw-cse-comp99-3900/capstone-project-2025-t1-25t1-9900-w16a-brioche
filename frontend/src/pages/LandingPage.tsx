import React from "react"
import HeroContainer from "@/containers/Landing/HeroContainer"
import FeatureSectionContainer from "@/containers/Landing/FeatureSectionContainer"

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroContainer />
      <FeatureSectionContainer />
      {/* Add other sections here */}
    </div>
  )
}

export default LandingPage
