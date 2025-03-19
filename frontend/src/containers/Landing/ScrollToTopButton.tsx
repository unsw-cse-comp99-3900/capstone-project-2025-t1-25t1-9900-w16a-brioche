import React, { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Listen for scroll events to determine button visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // Show the button when scrolling exceeds 70% of the document height
      const scrolled = document.documentElement.scrollTop
      const pageHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight

      setIsVisible(scrolled > (pageHeight - viewportHeight) * 0.7)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Click the button to scroll to the top
  const scrollToTop = () => {
    // Use the ID to scroll to the top
    const topElement = document.getElementById("landing-top")
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" })
    } else {
      // If the element is not found, fall back to the default scrolling method
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center justify-center gap-2",
        "rounded-full bg-gradient-to-br from-primary/90 via-primary to-purple-600",
        "p-3.5 text-white shadow-lg transition-all duration-500",
        "hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-700/30",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900",
        "group overflow-hidden",

        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-16 opacity-0 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      {/* Text part, expands on hover */}
      <div className="relative flex items-center gap-1.5 overflow-hidden transition-all duration-300 group-hover:w-[5.5rem] w-0">
        <span className="whitespace-nowrap text-md font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:delay-100">
          Back to top
        </span>
      </div>

      {/* Icon container */}
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30">
        {/* Floating animation */}
        <ArrowUp className="h-5 w-5 text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
      </span>

      {/* Background glow effect */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
    </button>
  )
}

export default ScrollToTopButton
