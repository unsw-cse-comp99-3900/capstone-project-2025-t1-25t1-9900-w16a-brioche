import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa"
import Logo from "./Logo"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4 md:px-12 max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Quick Links */}
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

        {/* Resources */}
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

        {/* InvoiceFlow Info */}
        <div className="flex flex-col md:items-start items-center">
          <div className="flex items-center gap-3">
            <Logo />
            <a
              href="https://github.com/unsw-cse-comp99-3900/capstone-project-2025-t1-25t1-9900-w16a-brioche"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <FaGithub size={24} />
            </a>
          </div>
          <p className="mt-2 text-gray-400 text-sm max-w-md text-center md:text-left">
            Streamlining e-invoicing for SMEs across Australia with our
            innovative platform.
          </p>
        </div>
      </div>

      {/* Copyright & Policies */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm flex flex-wrap justify-center md:justify-between items-center max-w-7xl mx-auto px-4 md:px-12">
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
  )
}

export default Footer
