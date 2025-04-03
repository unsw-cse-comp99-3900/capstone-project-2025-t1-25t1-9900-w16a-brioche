/**
 * @file GlowHoverEffect.tsx - Defines the GlowHoverEffect component, which adds a glow effect on hover to its children.
 */
import React from "react"

interface GlowHoverEffectProps {
  children: React.ReactNode
}

/**
 * GlowHoverEffect Component
 *
 * This component wraps its children with a div that applies a glow effect on hover.
 *
 * @param {GlowHoverEffectProps} props - The component props.
 * @param {React.ReactNode} props.children - The content to which the hover effect will be applied.
 * @returns {JSX.Element} A div element with the hover effect applied to its children.
 */
const GlowHoverEffect: React.FC<GlowHoverEffectProps> = ({ children }) => {
  return (
    <div className="group relative" data-aos="fade-up">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-70 blur-lg transition duration-500 group-hover:duration-200"></div>

      <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-transparent transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}
export default GlowHoverEffect
