/**
 * @file FeatureBadge.tsx - Renders a stylized badge used for labeling features or sections with gradient styling.
 */

import React from "react"

interface FeatureBadgeProps {
  /** The text content to display inside the badge */
  text: string
}

/**
 * FeatureBadge Component
 *
 * A small, visually distinct badge typically used to highlight or categorize a feature,
 * section, or content block. The badge includes gradient text and background,
 * with rounded corners and a soft backdrop blur.
 *
 * @param {FeatureBadgeProps} props - The component props
 * @param {string} props.text - The label text displayed inside the badge
 * @returns {JSX.Element} A gradient-themed feature badge element
 */
const FeatureBadge: React.FC<FeatureBadgeProps> = ({ text }) => {
  return (
    <div className="inline-block mb-4 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-full backdrop-blur-sm border border-primary-200">
      <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
        {text}
      </span>
    </div>
  )
}

export default FeatureBadge
