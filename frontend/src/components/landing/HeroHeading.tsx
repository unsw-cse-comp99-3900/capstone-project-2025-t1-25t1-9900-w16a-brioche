import React from "react"
import { landingHero } from "@/constants/Landing/landingHero"

const HeroHeading: React.FC = () => {
  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
      {landingHero.heading.mainText} <br />
      <span className="relative">
        <span className="relative z-10 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          {landingHero.heading.highlightedText}
          <br />
        </span>
        <span className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary-200 to-blue-200 opacity-50 rounded-lg -z-10"></span>
      </span>
      {landingHero.heading.suffixText}
    </h1>
  )
}

export default HeroHeading
