/**
 * @file Textarea.tsx - Defines a styled textarea component with consistent theming and accessibility support.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea Component
 *
 * A custom styled textarea element that supports full width, rounded borders, placeholder styling,
 * and focus-visible accessibility enhancements. It is responsive and theme-aware.
 *
 * @param {React.ComponentProps<"textarea">} props - Standard textarea props.
 * @param {string} [props.className] - Additional CSS class names to apply.
 * @returns {JSX.Element} - A styled <textarea> element.
 */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
