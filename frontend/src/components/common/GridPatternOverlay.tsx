/**
 * @file GridPatternOverlay.tsx - Defines the GridPatternOverlay component, which renders a grid pattern overlay.
 */
import React from "react"

interface GridPatternOverlayProps {
  color?: string
  opacity?: string
  gridSize?: string
}

/**
 * GridPatternOverlay Component
 *
 * This component renders a grid pattern overlay with customizable color, opacity, and grid size.
 *
 * @param {GridPatternOverlayProps} props - The component props.
 * @param {string} [props.color="#4F46E5"] - The color of the grid lines.
 * @param {string} [props.opacity="opacity-[0.06]"] - The opacity of the grid overlay.
 * @param {string} [props.gridSize="40px 40px"] - The size of the grid.
 * @returns {JSX.Element} A div element representing the grid pattern overlay.
 */
const GridPatternOverlay: React.FC<GridPatternOverlayProps> = ({
  color = "#4F46E5",
  opacity = "opacity-[0.06]",
  gridSize = "40px 40px",
}) => {
  return (
    <div
      className={`absolute inset-0 ${opacity}`}
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
        backgroundSize: gridSize,
      }}
    ></div>
  )
}

export default GridPatternOverlay
