/**
 * @file ProcessFeatureList.tsx - Displays a list of bullet features for a process step, with alignment and icon depending on layout direction.
 */

import React from "react"

interface ProcessFeatureListProps {
  /**
   * An array of strings representing each feature to display.
   */
  features: string[]

  /**
   * Determines whether the current card is in even position.
   * Used to decide the text alignment and icon positioning.
   */
  isEven: boolean
}

/**
 * ProcessFeatureList Component
 *
 * Renders a list of small bullet-point features under a process step,
 * adjusting text alignment and icon position based on the step layout (even or odd).
 *
 * @param {ProcessFeatureListProps} props - Props for the component.
 * @param {string[]} props.features - The list of features to display.
 * @param {boolean} props.isEven - Whether the step is even-indexed, affecting the layout.
 * @returns {JSX.Element} - A styled list of feature points.
 */
const ProcessFeatureList: React.FC<ProcessFeatureListProps> = ({
  features,
  isEven,
}) => {
  return (
    <div className={`mt-6 space-y-2 ${isEven ? "" : "text-right"}`}>
      {features.map((feature, featureIndex) => (
        <div
          key={featureIndex}
          className={`flex items-center ${isEven ? "" : "justify-end"} text-sm text-gray-500`}
        >
          {isEven && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span>{feature}</span>
          {!isEven && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 text-primary-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProcessFeatureList
