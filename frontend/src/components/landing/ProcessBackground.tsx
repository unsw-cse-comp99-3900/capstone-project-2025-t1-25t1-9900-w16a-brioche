/**
 * @file ProcessBackground.tsx - Renders decorative background elements for the process section.
 */

import React from "react"
import GridPatternOverlay from "../common/GridPatternOverlay"

/**
 * ProcessBackground Component
 *
 * This component provides a styled background for the process section using subtle grid patterns,
 * blurred colorful circles, and blend modes for a soft modern look.
 *
 * @returns {JSX.Element} - The background layout for the process section.
 */
const ProcessBackground: React.FC = () => {
  return (
    <>
      <GridPatternOverlay />

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
    </>
  )
}

export default ProcessBackground
