/**
 * @file ProcessContainer.tsx - Defines the process section component for the landing page
 * Contains the process section background, content and timeline components
 */

/**
 * Import required dependencies and components:
 * - React for JSX support
 * - ProcessBackground for the section's background visuals
 * - ProcessContent for the main content area
 * - ProcessTimeline for displaying the process steps
 */
import React from "react"
import ProcessBackground from "@/components/landing/ProcessBackground"
import ProcessContent from "@/components/landing/ProcessContent"
import ProcessTimeline from "@/components/landing/ProcessTimeline"

const ProcessContainer: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <ProcessBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ProcessContent />
        <ProcessTimeline />
      </div>
    </section>
  )
}

export default ProcessContainer
