import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "border border-input rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)

Select.displayName = "Select"

export { Select }
