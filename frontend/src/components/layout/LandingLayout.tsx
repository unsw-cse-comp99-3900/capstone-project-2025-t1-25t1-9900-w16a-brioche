/**
 * @file Layout.tsx - Provides the main layout structure for public-facing pages.
 * Includes a shared landing header, footer, and a dynamic content area.
 */

import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"
import LandingHeader from "../common/LandingHeader"

/**
 * Layout Component
 *
 * Serves as the base layout for publicly accessible routes (e.g. landing page, about, contact).
 * Includes a consistent header and footer, and uses <Outlet /> to render the nested route content.
 * Also renders <Toaster /> for global notifications.
 *
 * @returns {JSX.Element} Layout wrapper for public-facing pages.
 */
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
