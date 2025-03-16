import React from "react"
import HeroContainer from "@/containers/Landing/HeroContainer"
import FeatureSectionContainer from "@/containers/Landing/FeatureSectionContainer"
import ProcessContainer from "@/containers/Landing/ProcessContainer"

const LandingPage: React.FC = () => {
  return (
    <div>
      <HeroContainer />
      <FeatureSectionContainer />
      <ProcessContainer />
      {/* Add other sections here */}
    </div>
  )
}

export default LandingPage
