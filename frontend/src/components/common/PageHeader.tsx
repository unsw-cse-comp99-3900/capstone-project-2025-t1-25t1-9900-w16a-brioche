import React, { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
  gradient?: boolean
  children?: ReactNode
}

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
