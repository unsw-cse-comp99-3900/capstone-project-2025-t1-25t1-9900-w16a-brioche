/**
 * @file LandingPage.tsx - Defines the LandingPage component, which renders the public-facing landing page for the application.
 * * It includes marketing sections such as hero, features, process, benefits, FAQs, and scroll behavior.
 */

/**
 * LandingPage Component
 *
 * * This component renders the main layout of the public landing page, including sections for feature highlights,
 *   process explanation, benefits, FAQs, and a scroll-to-top button.
 *
 * @returns {JSX.Element} The complete landing page layout for the application.
 */

import React from "react"
import HeroContainer from "@/containers/Landing/HeroContainer"
import FeatureSectionContainer from "@/containers/Landing/FeatureSectionContainer"
import ProcessContainer from "@/containers/Landing/ProcessContainer"
import BenefitsContainer from "@/containers/Landing/BenefitsContainer"
import FAQContainer from "@/containers/Landing/FAQContainer"
import ScrollToTopButton from "@/containers/Landing/ScrollToTopButton"

const LandingPage: React.FC = () => {
  return (
    <div id="landing-top">
      <HeroContainer />
      <FeatureSectionContainer />
      <ProcessContainer />
      <BenefitsContainer />
      <FAQContainer />
      <ScrollToTopButton />

      {/* Add other sections here */}
    </div>
  )
}

export default LandingPage
