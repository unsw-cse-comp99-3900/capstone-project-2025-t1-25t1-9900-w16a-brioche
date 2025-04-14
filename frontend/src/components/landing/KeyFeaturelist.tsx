/**
 * @file FeatureList.tsx - Renders a bullet-point list of features, each with a checkmark icon.
 */

import React from "react"

/**
 * Props for the FeatureList component.
 */
interface FeatureListProps {
  features: string[]
}

/**
 * FeatureList Component
 *
 * Displays a list of product or service features with consistent layout,
 * each feature prefixed by a checkmark icon.
 *
 * @param {FeatureListProps} props - Component props
 * @param {string[]} props.features - List of feature texts to render
 * @returns {JSX.Element} - The rendered feature list
 */
const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  return (
    <ul className="mt-4 space-y-2 text-gray-600">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg
            className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

export default FeatureList
