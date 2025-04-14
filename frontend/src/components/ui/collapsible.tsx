/**
 * @file Collapsible.tsx - Provides collapsible UI elements using Radix UI's Collapsible primitives.
 * This file exports three main components: Collapsible, CollapsibleTrigger, and CollapsibleContent.
 */

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Collapsible
 *
 * The root component that wraps the entire collapsible element.
 * It manages the open/closed state and provides context to its children.
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * CollapsibleTrigger
 *
 * A component that acts as the clickable element to toggle the collapsible content.
 * It should be placed inside the Collapsible root.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * CollapsibleContent
 *
 * This component wraps the content that will be shown or hidden based on the open state.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
