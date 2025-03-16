import React from "react"

interface GradientAccentLineProps {
  colors?: string
  position?: string
  height?: string
  borderRadius?: string
}

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
