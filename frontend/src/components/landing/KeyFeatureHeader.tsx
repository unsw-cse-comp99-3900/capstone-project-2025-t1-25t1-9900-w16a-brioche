/**
 * @file FeatureHeader.tsx - Displays the title and description section at the top of a feature card.
 */

import React from "react"

/**
 * Props for the FeatureHeader component.
 */
interface FeatureHeaderProps {
  /** Title text shown at the top of the feature card */
  title: string
  /** Description text displayed below the title */
  description: string
}

/**
 * FeatureHeader Component
 *
 * Renders the title and description section used in feature cards.
 *
 * @param {FeatureHeaderProps} props - Component props
 * @param {string} props.title - The heading text of the feature
 * @param {string} props.description - Supporting description text
 * @returns {JSX.Element} The header section of a feature card
 */
const FeatureHeader: React.FC<FeatureHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default FeatureHeader
