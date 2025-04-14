/**
 * @file FeatureHighlight.tsx - Displays a contextual highlight badge in a feature card, such as a key integration or capability.
 */

import React from "react"

/**
 * Props for the FeatureHighlight component.
 */
interface FeatureHighlightProps {
  index: number
}

// Predefined list of highlight messages
const highlights = [
  "Reckon One API Integration",
  "ESS Validator Integration",
  "ESS PEPPOL Network Support",
]

/**
 * FeatureHighlight Component
 *
 * Displays a small badge-like element showing an integration or highlight
 * message based on the card index.
 *
 * @param {FeatureHighlightProps} props - Component props
 * @param {number} props.index - Used to select which highlight to display
 * @returns {JSX.Element} The rendered highlight badge
 */
const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ index }) => {
  return (
    <div className="mt-auto">
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mt-10">
        <svg
          className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          />
        </svg>
        {highlights[index % highlights.length]}
      </div>
    </div>
  )
}

export default FeatureHighlight
