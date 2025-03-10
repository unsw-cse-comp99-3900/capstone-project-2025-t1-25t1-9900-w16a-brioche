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
        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © 2025 W16a-Brioche Development Team. All rights reserved.
          </p>

          {/* link group */}
          <div className="flex justify-center gap-6 mt-3">
            <Link to="/privacy" className="hover:text-blue-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-400 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookies" className="hover:text-blue-400 text-sm">
              Cookie Policy
            </Link>
          </div>

          {/* GitHub icon */}
          <div className="flex justify-center mt-4">
            <a
              href="https://github.com/unsw-cse-comp99-3900/capstone-project-2025-t1-25t1-9900-w16a-brioche"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}

export default Layout
