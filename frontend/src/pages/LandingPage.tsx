import React from "react"
import HeroContainer from "@/containers/Landing/HeroContainer"
import Navbar from "@/components/layout/Navbar"

const LandingPage: React.FC = () => {
  return (
    <div>
      <Navbar /> {/* ✅ Navbar remains */}
      <HeroContainer />
      {/* Other sections of the Landing Page */}
    </div>
  )
}

export default LandingPage
