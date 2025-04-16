/**
 * @file BenefitsCTA.tsx - Displays a call-to-action button component for the benefits section.
 */

import React from "react"
import BenefitSlideButton from "@/components/landing/BenefitsPage/BenefitSlideButton"
import { landingBenefits } from "@/constants/Landing/landingbenefits"

/**
 * BenefitsCTA Component
 *
 * This component renders a centered call-to-action button below the benefits section.
 * It uses the CTA configuration (href and text) from the `landingBenefits` constant.
 *
 * @returns {JSX.Element} A call-to-action section with animation on scroll.
 */
const BenefitsCTA: React.FC = () => {
  return (
    <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="500">
      <BenefitSlideButton
        href={landingBenefits.cta.href}
        text={landingBenefits.cta.text}
      />
    </div>
  )
}

export default BenefitsCTA
