/**
 * @file Tabs.tsx - Provides a styled tab UI component built on top of Radix UI Tabs.
 */

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

/**
 * Tabs Root Component
 *
 * Wrapper for the entire tab interface.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/tabs
 */
const Tabs = TabsPrimitive.Root

/**
 * TabsList Component
 *
 * Represents the list container that holds all the tab triggers.
 *
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>} props - List props passed to the Tabs List.
 * @returns {JSX.Element} - A styled list of tab triggers.
 */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/**
 * TabsTrigger Component
 *
 * Represents a clickable tab button that triggers a content panel.
 *
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>} props - Trigger props passed to the Tabs Trigger.
 * @returns {JSX.Element} - A styled button used to switch between tabs.
 */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/**
 * TabsContent Component
 *
 * Represents the content area that is shown when its associated tab trigger is active.
 *
 * @param {React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>} props - Content props passed to the Tabs Content.
 * @returns {JSX.Element} - A styled content panel for the active tab.
 */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
