import React, { ReactNode } from "react"

interface HeroButtonProps {
  children: ReactNode
  href: string
  variant: "primary" | "secondary"
  icon?: ReactNode
}

const HeroButton: React.FC<HeroButtonProps> = ({
  children,
  href,
  variant,
  icon,
}) => {
  const baseClasses =
    "group inline-flex justify-center items-center px-6 py-3 border text-base font-medium rounded-lg transition-all duration-300"

  const variantClasses = {
    primary:
      "border-transparent text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md hover:shadow-lg",
    secondary:
      "border-secondary-300 text-secondary-700 bg-white hover:bg-secondary-50 shadow-sm hover:shadow-md",
  }

  return (
    <a href={href} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
      {icon}
    </a>
  )
}
export default HeroButton
