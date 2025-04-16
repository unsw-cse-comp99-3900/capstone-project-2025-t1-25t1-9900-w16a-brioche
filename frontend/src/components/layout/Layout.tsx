/**
 * @file Layout.tsx - Provides the layout for authentication-related pages such as sign-in and sign-up.
 * Includes a minimal header, authentication-specific footer, and outlet for nested routes.
 */

import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import AuthFooter from "../common/AuthFooter"

/**
 * Layout Component
 *
 * Used for authentication pages like login and register.
 * Displays a simple header with logo link, renders nested content via <Outlet />,
 * and includes an authentication-specific footer and notification toaster.
 *
 * @returns {JSX.Element} Layout wrapper for auth routes.
 */
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            InvoiceFlow
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <AuthFooter />
      <Toaster />
    </div>
  )
}

export default Layout
