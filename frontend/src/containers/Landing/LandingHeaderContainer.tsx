/**
 * @file LandingHeaderContainer.tsx - Container component for landing page header
 * Displays the main title and welcome message of the landing page
 */

/**
 * Import required dependencies:
 * - React for JSX support
 */
import React from "react"

const LandingHeaderContainer: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-bold underline text-blue-400">
          InvoiceFlow
        </h1>
        <p className="text-lg">Welcome to InvoiceFlow</p>
      </div>
    </div>
  )
}

export default LandingHeaderContainer
