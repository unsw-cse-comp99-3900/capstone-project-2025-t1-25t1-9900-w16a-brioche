/**
 * @file BenefitsHeader.tsx - Renders the main heading text for the benefits section of the landing page.
 */

import React from "react"
import { landingBenefits } from "@/constants/Landing/landingbenefits"

/**
 * BenefitsHeader Component
 *
 * This component renders the title of the benefits section using a styled `<h3>` element.
 * The content is dynamically loaded from the `landingBenefits.sectionTitle` constant.
 *
 * @returns {JSX.Element} A styled heading element for the benefits section.
 */
const BenefitsHeader: React.FC = () => {
  return (
    <h3
      className="text-2xl font-bold text-center text-gray-900 mb-10"
      style={{ position: "relative", top: "-20px" }}
    >
      {landingBenefits.sectionTitle}
    </h3>
  )
}

export default BenefitsHeader
