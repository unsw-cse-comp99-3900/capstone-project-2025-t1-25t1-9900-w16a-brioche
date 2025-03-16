import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import AuthFooter from "../common/AuthFooter"

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
