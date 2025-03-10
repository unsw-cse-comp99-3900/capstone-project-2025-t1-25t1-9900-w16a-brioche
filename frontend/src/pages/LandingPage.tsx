import React from "react"
import LandingHeaderContainer from "@/containers/Landing/LandingHeaderContainer"
import LandingButtonsContainer from "@/containers/Landing/LandingButtonsContainer"

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <LandingHeaderContainer />
      <LandingButtonsContainer />
    </div>
  )
}

export default LandingPage
