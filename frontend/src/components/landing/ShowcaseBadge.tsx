import React from "react"

interface ShowcaseBadgeProps {
  text: string
  position?: string
  variant?: "gradient" | "outline" | "solid"
}

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
