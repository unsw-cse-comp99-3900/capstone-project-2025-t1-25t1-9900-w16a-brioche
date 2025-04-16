/**
 * @file BenefitsBackground.tsx - A simple wrapper component that renders a reusable grid background pattern.
 */

import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import React from "react"

/**
 * BenefitsBackground Component
 *
 * This component serves as a lightweight wrapper for the `GridPatternOverlay` component.
 * It is intended to be used as a visual background layer for sections like Benefits or Features.
 *
 * @returns {JSX.Element} The rendered background pattern.
 */
const BenefitsBackground: React.FC = () => {
  return <GridPatternOverlay />
}

export default BenefitsBackground
