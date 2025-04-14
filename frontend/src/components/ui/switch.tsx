/**
 * @file Switch.tsx - Defines a styled toggle switch component using Radix UI's switch primitives.
 */

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Switch Component
 *
 * A toggle switch component built on top of Radix UI's Switch primitives. It supports accessibility,
 * theming, and custom styling via Tailwind CSS utility classes.
 *
 * @param {React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>} props - Props to customize the switch behavior and appearance.
 * @param {string} [props.className] - Additional class names for the root switch element.
 * @param {React.Ref} ref - React ref forwarded to the root switch element.
 * @returns {JSX.Element} A custom styled switch component.
 */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
