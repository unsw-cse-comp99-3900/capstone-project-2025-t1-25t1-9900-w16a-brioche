/**
 * @file PageHeader.tsx - Defines the PageHeader component, a reusable header for pages.
 */
import React, { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  gradient?: boolean
  children?: ReactNode
}

/**
 * PageHeader Component
 *
 * A reusable header component for pages, including a title, description, optional icon, and optional gradient effect.
 *
 * @param {PageHeaderProps} props - The component props.
 * @param {string} props.title - The title of the page.
 * @param {string} [props.description] - An optional description for the page.
 * @param {LucideIcon} [props.icon] - An optional icon to display next to the title.
 * @param {boolean} [props.gradient=true] - Whether to apply a gradient effect to the title.
 * @param {ReactNode} [props.children] - Optional content to display in the header.
 * @returns {JSX.Element} A div containing the title, description, and optional content.
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  gradient = true,
  children,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-white mb-2 flex items-center gap-2">
            {Icon && <Icon className="h-8 w-8 text-primary-600" />}
            {gradient ? (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                {title}
              </span>
            ) : (
              title
            )}
          </h1>
          {description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}

export default PageHeader
