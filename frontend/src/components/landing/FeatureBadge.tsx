import React from "react"

interface FeatureBadgeProps {
  text: string
}

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
