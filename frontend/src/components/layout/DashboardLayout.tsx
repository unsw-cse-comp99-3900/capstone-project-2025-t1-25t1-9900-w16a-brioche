/**
 * @file DashboardLayout.tsx - Defines the main layout structure for the dashboard pages.
 * Includes a common header, footer, and dynamic routing outlet area.
 */

import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"
import DashboardHeader from "../common/DashboardHeader"

/**
 * DashboardLayout Component
 *
 * Provides the main layout for dashboard-related routes.
 * Renders a shared header and footer, and displays nested route content via <Outlet />.
 * Also includes the <Toaster /> for global toast notifications.
 *
 * @returns {JSX.Element} Layout wrapper for dashboard pages.
 */
const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default DashboardLayout
