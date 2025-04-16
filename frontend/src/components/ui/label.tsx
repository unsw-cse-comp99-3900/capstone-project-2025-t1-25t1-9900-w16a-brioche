/**
 * @file Label.tsx - A styled label component based on Radix UI's primitive and class-variance-authority.
 *
 * This component wraps Radix's Label primitive to apply consistent styling across forms.
 * It supports conditional variants and integrates with peer-disabled states for accessibility.
 */

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Label Component
 *
 * A forwardRef-compatible wrapper around Radix's Label.
 * This provides standardized styling and accessibility features for form labeling.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
