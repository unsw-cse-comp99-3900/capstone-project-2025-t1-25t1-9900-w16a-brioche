/**
 * @file ShowcaseBadge.tsx - Displays a badge label used to highlight key elements in a showcase.
 */

import React from "react"

interface ShowcaseBadgeProps {
  /** The text content displayed inside the badge */
  text: string
  /** Custom position classes applied to the badge container (typically for absolute positioning) */
  position?: string
  /** Visual style of the badge */
  variant?: "gradient" | "outline" | "solid"
}

/**
 * ShowcaseBadge Component
 *
 * Renders a small, styled badge used to label or highlight components within a UI showcase or feature section.
 * Supports gradient, outline, and solid visual variants.
 *
 * @param {ShowcaseBadgeProps} props - The component props.
 * @param {string} props.text - The badge text.
 * @param {string} [props.position="inline-block"] - Optional custom position classes (e.g., `top-4 left-4`).
 * @param {"gradient" | "outline" | "solid"} [props.variant="outline"] - The visual variant of the badge.
 * @returns {JSX.Element} - The styled badge component.
 */
const ShowcaseBadge: React.FC<ShowcaseBadgeProps> = ({
  text,
  position = "inline-block",
  variant = "outline",
}) => {
  const variantClasses = {
    gradient: "bg-gradient-to-br from-primary-500 to-blue-500 text-white",
    outline:
      "bg-gradient-to-r from-primary-500/10 to-blue-500/10 border border-primary-200",
    solid: "bg-primary-100 text-primary-800",
  }

  return (
    <div
      className={`absolute ${position} rounded-lg shadow-lg p-3 ${variantClasses[variant]}`}
    >
      <div className="text-xs font-medium">{text}</div>
    </div>
  )
}

export default ShowcaseBadge
