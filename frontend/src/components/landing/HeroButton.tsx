/**
 * @file HeroButton.tsx - Defines a reusable button component for the Hero section with support for primary and secondary variants.
 */

import React, { ReactNode } from "react"

interface HeroButtonProps {
  /** The button text or content */
  children: ReactNode
  /** The destination URL when the button is clicked */
  href: string
  /** The button style variant, either "primary" or "secondary" */
  variant: "primary" | "secondary"
  /** Optional icon displayed next to the button text */
  icon?: ReactNode
}

/**
 * HeroButton Component
 *
 * Renders a stylized link element designed for use in the Hero section.
 * Supports two visual variants:
 * - Primary: gradient-filled button with white text
 * - Secondary: bordered button with muted text
 *
 * @param {HeroButtonProps} props - Props for the HeroButton component.
 * @param {ReactNode} props.children - Button text or elements.
 * @param {string} props.href - Destination URL.
 * @param {"primary" | "secondary"} props.variant - Determines button styling.
 * @param {ReactNode} [props.icon] - Optional icon placed after the text.
 * @returns {JSX.Element} - A styled anchor element that looks like a button.
 */
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
