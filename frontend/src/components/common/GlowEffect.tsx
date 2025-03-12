import React from "react"

interface GlowEffectProps {
  colors?: string
  opacity?: string
}

const GlowEffect: React.FC<GlowEffectProps> = ({
  colors = "from-primary-600 via-blue-500 to-purple-500",
  opacity = "opacity-30",
}) => {
  return (
    <div
      className={`absolute -inset-1 bg-gradient-to-r ${colors} rounded-lg blur-lg ${opacity} animate-pulse`}
    ></div>
  )
}

export default GlowEffect
