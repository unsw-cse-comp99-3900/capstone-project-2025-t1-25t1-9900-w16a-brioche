/**
 * @file SectionHeader.tsx - Defines the SectionHeader component, a reusable header for sections.
 */
import React from "react"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  title: string
  icon?: LucideIcon
}

/**
 * SectionHeader Component
 *
 * A reusable header component for sections, including a title and optional icon.
 *
 * @param {SectionHeaderProps} props - The component props.
 * @param {string} props.title - The title of the section.
 * @param {LucideIcon} [props.icon] - An optional icon to display next to the title.
 * @returns {JSX.Element} A h3 containing the title and optional icon.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon }) => {
  return (
    <h3 className="text-lg leading-6 font-medium text-secondary-900 flex items-center gap-2">
      {Icon && <Icon className="h-5 w-5 text-primary-500" />}
      {title}
    </h3>
  )
}

export default SectionHeader
