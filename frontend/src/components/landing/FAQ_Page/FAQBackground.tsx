/**
 * @file FAQBackground.tsx - Renders the decorative background layer for the FAQ section.
 * It includes a gradient overlay, grid pattern, and floating blurred shapes for visual enhancement.
 */

import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

/**
 * FAQBackground Component
 *
 * This component provides a visually appealing background for the FAQ section.
 * It includes:
 * - A soft gradient-to-white overlay
 * - A reusable grid pattern for texture
 * - Blurred colored blobs for depth and decoration
 *
 * All elements are positioned absolutely and layered behind the content.
 *
 * @returns {JSX.Element} The background component for the FAQ section.
 */
const FAQBackground: React.FC = () => {
  return (
    <>
      {/* Premium background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-b to-white">
        <GridPatternOverlay />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
    </>
  )
}

export default FAQBackground
