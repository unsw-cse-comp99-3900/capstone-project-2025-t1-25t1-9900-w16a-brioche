/**
 * @file SideBarContainer.tsx - Defines the SideBarContainer component, which provides navigation for the documentation sections.
 * It highlights the active section and allows users to switch between sections.
 */

import { navItems, renderIcon } from "@/constants/Documentation/SideBar"
import React from "react"

/**
 * SideBarContainer Component
 *
 * This component renders the sidebar navigation for the documentation, allowing users to navigate between different sections.
 *
 * @param {SideBarProps} props - The properties for the SideBarContainer component.
 * @returns {JSX.Element} The sidebar navigation component.
 */

interface SideBarProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

const SideBar: React.FC<SideBarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="hidden lg:block lg:col-span-3">
      <nav className="sticky top-6 space-y-1" aria-label="Sidebar">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              onSectionChange(item.id)
            }}
            className={`${
              activeSection === item.id
                ? "bg-secondary-50 text-primary-600"
                : "text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900"
            } group flex items-center px-3 py-2 text-sm font-medium rounded-md`}
          >
            {renderIcon(item.icon)}
            <span className="truncate">{item.title}</span>
          </a>
        ))}
      </nav>
    </div>
  )
}

export default SideBar
