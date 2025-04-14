/**
 * @file FeaturesBackground.tsx - Defines a decorative background component for the features section with gradient and blurred shapes.
 */

import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

/**
 * FeaturesBackground Component
 *
 * Renders a visually appealing background with a gradient layer,
 * subtle grid pattern overlay, and animated blurred shapes.
 * This component is intended to be placed behind a feature section
 * to enhance visual interest without distracting from the content.
 *
 * @returns {JSX.Element} A styled background layer component.
 */
const FeaturesBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Subtle grid pattern overlay */}
      <GridPatternOverlay />

      {/* Decorative blurred shapes */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-20 rounded-full blur-[60px]"></div>
    </div>
  )
}

export default FeaturesBackground
