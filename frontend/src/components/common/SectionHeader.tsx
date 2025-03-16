import React from "react"
import { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  title: string
  icon?: LucideIcon
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon: Icon }) => {
  return (
    <h3 className="text-lg leading-6 font-medium text-secondary-900 flex items-center gap-2">
      {Icon && <Icon className="h-5 w-5 text-primary-500" />}
      {title}
    </h3>
  )
}

export default SectionHeader
