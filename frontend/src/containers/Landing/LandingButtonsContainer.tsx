/**
 * @file LandingButtonsContainer.tsx - Container component for landing page buttons
 * Demonstrates usage of shadcn Button component and toast notifications
 */

/**
 * Import required dependencies:
 * - React for JSX support
 * - Button component from shadcn UI library
 * - toast notification from sonner library
 */
import React from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const LandingButtonsContainer: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-3">
        <Button>Shadcn Button</Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Show Toast
        </Button>
      </div>
    </div>
  )
}

export default LandingButtonsContainer
