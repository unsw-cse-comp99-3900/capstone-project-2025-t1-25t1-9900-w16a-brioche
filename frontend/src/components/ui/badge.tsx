/* eslint-disable react-refresh/only-export-components */

/**
 * @file Badge.tsx - A reusable badge component using class-variance-authority for styling variants.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * badgeVariants
 *
 * A utility from class-variance-authority that defines style variants for the Badge component.
 * Each variant corresponds to a specific visual appearance (e.g., default, secondary, success, etc.).
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        success:
          "border-transparent bg-green-500 text-white shadow hover:bg-green-600",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * BadgeProps
 *
 * Extends native HTML div attributes and includes the badge variant prop.
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 *
 * A small UI element used to convey status or categorize content using colors and labels.
 *
 * @param {BadgeProps} props - The badge's props including className and variant.
 * @returns {JSX.Element} A styled badge element.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
