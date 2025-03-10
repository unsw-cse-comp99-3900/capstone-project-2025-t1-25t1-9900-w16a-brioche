import React from "react"
import { Link, Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import { FaGithub } from "react-icons/fa"

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

      <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:items-start items-center">
            <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
            <ul className="mt-3 flex flex-col md:flex-row md:gap-x-4 space-y-2 md:space-y-0 text-gray-400 font-medium">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-blue-400">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:items-start items-center">
            <h3 className="text-lg font-semibold text-gray-300">Resources</h3>
            <ul className="mt-3 flex flex-col md:flex-row md:gap-x-4 space-y-2 md:space-y-0 text-gray-400 font-medium">
              <li>
                <Link to="/docs" className="hover:text-blue-400">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="hover:text-blue-400">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col md:items-start items-center">
            <h2 className="text-xl font-bold text-blue-400">InvoiceFlow</h2>
            <p className="mt-2 text-gray-400 text-sm max-w-md">
              Streamlining e-invoicing for SMEs across Australia with our
              innovative platform.
            </p>
            {/* GitHub Icon */}
            <div className="mt-3">
              <a
                href="https://github.com/unsw-cse-comp99-3900/capstone-project-2025-t1-25t1-9900-w16a-brioche"
                className="text-gray-400 hover:text-blue-400"
              >
                <FaGithub size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Policies */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm flex flex-wrap justify-center md:justify-between items-center max-w-7xl mx-auto">
          <p>© 2025 W16a-Brioche Development Team. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-400">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-blue-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

export default Layout
