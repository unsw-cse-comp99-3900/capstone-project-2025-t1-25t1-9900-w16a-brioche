import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold">
            InvoiceFlow Dashboard
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-300">
              Dashboard
            </Link>
            <Link to="/invoice/upload" className="hover:text-blue-300">
              Upload
            </Link>
            <Link to="/invoice/create" className="hover:text-blue-300">
              Create
            </Link>
            <Link to="/invoice/validation" className="hover:text-blue-300">
              Validation
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

export default DashboardLayout