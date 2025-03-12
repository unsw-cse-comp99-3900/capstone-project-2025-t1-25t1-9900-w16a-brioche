import React from "react"

interface GridPatternOverlayProps {
  color?: string
  opacity?: string
  gridSize?: string
}

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
