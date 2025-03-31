/**
 * @file GlowEffect.tsx - Defines the GlowEffect component, which renders a glowing effect using a gradient.
 */
import React from "react"

interface GlowEffectProps {
  colors?: string
  opacity?: string
}

/**
 * GlowEffect Component
 *
 * This component renders a glowing effect using a gradient.
 *
 * @param {GlowEffectProps} props - The component props.
 * @param {string} [props.colors="from-primary-600 via-blue-500 to-purple-500"] - The gradient colors.
 * @param {string} [props.opacity="opacity-30"] - The opacity of the glow effect.
 * @returns {JSX.Element} A div element with the glowing effect.
 */
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
