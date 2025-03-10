import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            InvoiceFlow
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            <Link to="/login" className="hover:text-blue-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-300">
              Register
            </Link>
            <Link to="/dashboard" className="hover:text-blue-300">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-800 text-white p-4 mt-auto">
        <div className="container mx-auto text-center">
          <p>© 2024 InvoiceFlow. All rights reserved.</p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

export default Layout
