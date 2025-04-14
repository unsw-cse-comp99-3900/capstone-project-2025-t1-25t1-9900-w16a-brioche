/**
 * @file HeroBackground.tsx - Defines the decorative background component for the Hero section.
 */

import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

/**
 * HeroBackground Component
 *
 * Provides a layered visual background for the Hero section.
 * It includes:
 * - A smooth gradient from top-left to bottom-right
 * - A subtle grid pattern overlay using `GridPatternOverlay`
 * - Multiple large, blurred, decorative gradient shapes
 *
 * All layers are positioned absolutely to ensure full coverage beneath the hero content.
 *
 * @returns {JSX.Element} A background layout element for the Hero section.
 */
const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Subtle grid pattern overlay */}
      <GridPatternOverlay />

      {/* Decorative blurred shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gradient-to-br from-primary-300 to-blue-300 opacity-20 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-gradient-to-tr from-purple-300 to-primary-300 opacity-20 rounded-full blur-[80px]"></div>
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-20 rounded-full blur-[60px]"></div>
    </div>
  )
}

export default HeroBackground
