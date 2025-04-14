/**
 * @file SelectLayout.tsx - Layout component using a minimal header, designed for selection or setup screens.
 * Includes footer and global toast notifications.
 */

import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"
import MinimalHeader from "../common/MinimalHeader"

/**
 * SelectLayout Component
 *
 * A minimal layout structure used for selection or setup-related routes.
 * Renders a lightweight header, a main content area via <Outlet />,
 * and a shared footer with global toast support.
 *
 * @returns {JSX.Element} Layout wrapper for lightweight screens.
 */
const SelectLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MinimalHeader />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default SelectLayout
