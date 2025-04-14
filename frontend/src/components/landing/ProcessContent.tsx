/**
 * @file ProcessContent.tsx - Displays the section header content for the process steps.
 */

import React from "react"
import { landingProcess } from "@/constants/Landing/landingProcess"

/**
 * ProcessContent Component
 *
 * Renders the section header for the "Process" section, including a tag label,
 * a headline, and a supporting subheading. All text content is sourced from the
 * `landingProcess.content` constant.
 *
 * @returns {JSX.Element} - The rendered process section header
 */
const ProcessContent: React.FC = () => {
  return (
    <div className="text-center mb-20" data-aos="fade-up">
      <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-primary-200">
        <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
          {landingProcess.content.tagText}
        </span>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
        {landingProcess.content.headingText}
      </h2>
      <p className="max-w-2xl mx-auto text-lg text-gray-600">
        {landingProcess.content.subheadingText}
      </p>
    </div>
  )
}

export default ProcessContent
