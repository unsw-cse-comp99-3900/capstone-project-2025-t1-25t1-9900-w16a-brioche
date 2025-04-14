/**
 * @file Popover.tsx - Defines UI popover components using Radix UI primitives with custom styling and behavior.
 */

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * Popover Root Component
 *
 * The root component that manages the open/close state of the popover.
 */
const Popover = PopoverPrimitive.Root

/**
 * PopoverTrigger Component
 *
 * The trigger element that toggles the popover.
 */
const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * PopoverAnchor Component
 *
 * Defines a fixed anchor element relative to which the popover will be positioned.
 */
const PopoverAnchor = PopoverPrimitive.Anchor

/**
 * PopoverContent Component
 *
 * Renders the content of the popover with custom animation, size, offset, and styling.
 *
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>} props - Popover content props.
 * @param {string} [props.className] - Additional class names to apply to the content.
 * @param {"start" | "center" | "end"} [props.align="center"] - Horizontal alignment of the content relative to the trigger.
 * @param {number} [props.sideOffset=4] - Offset from the side of the trigger element.
 * @returns {JSX.Element} The rendered popover content.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
