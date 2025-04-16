/**
 * @file Toaster.tsx - Defines the customized Toaster component using Sonner and theme support from next-themes.
 */

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * Toaster Component
 *
 * A wrapper around the Sonner Toaster that integrates with the app's theme system via `next-themes`.
 * Provides consistent styling for toast notifications across light/dark/system themes.
 *
 * @param {ToasterProps} props - Optional props to pass through to the Sonner toaster component.
 * @returns {JSX.Element} A themed and styled Sonner toaster.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
