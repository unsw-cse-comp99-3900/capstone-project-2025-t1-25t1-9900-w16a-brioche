import React from "react"
import HeroButton from "@/components/landing/HeroButton"
import { landingHero } from "@/constants/Landing/landingHero"

const HeroButtons: React.FC = () => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4">
      <HeroButton
        href="/dashboard"
        variant="primary"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        {landingHero.buttons.primaryButton}
      </HeroButton>
      <HeroButton
        href="#how-it-works"
        variant="secondary"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 opacity-70 transform group-hover:translate-y-1 transition-transform duration-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
      >
        {landingHero.buttons.secondaryButton}
      </HeroButton>
    </div>
  )
}

export default HeroButtons
