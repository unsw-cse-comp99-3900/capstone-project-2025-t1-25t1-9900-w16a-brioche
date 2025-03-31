/**
 * @file GradientAccentLine.tsx - Defines the GradientAccentLine component, which renders a gradient accent line.
 */
import React from "react"

interface GradientAccentLineProps {
  colors?: string
  position?: string
  height?: string
  borderRadius?: string
}

/**
 * GradientAccentLine Component
 *
 * This component renders a gradient accent line with customizable colors, position, height, and border radius.
 *
 * @param {GradientAccentLineProps} props - The component props.
 * @param {string} [props.colors="from-primary-500 to-blue-500"] - The gradient colors.
 * @param {string} [props.position="top-0 right-0 left-0"] - The position of the line.
 * @param {string} [props.height="h-1"] - The height of the line.
 * @param {string} [props.borderRadius="rounded-t-2xl"] - The border radius of the line.
 * @returns {JSX.Element} A div element representing the gradient accent line.
 */
const GradientAccentLine: React.FC<GradientAccentLineProps> = ({
  colors = "from-primary-500 to-blue-500",
  position = "top-0 right-0 left-0",
  height = "h-1",
  borderRadius = "rounded-t-2xl",
}) => {
  return (
    <div
      className={`absolute ${position} ${height} bg-gradient-to-r ${colors} ${borderRadius}`}
    ></div>
  )
}

export default GradientAccentLine
