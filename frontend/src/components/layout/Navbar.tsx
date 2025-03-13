import React from "react"

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Left Logo */}
      <div className="text-2xl font-bold text-gray-900">
        <span className="text-blue-600">Invoice</span>Flow
      </div>

      {/* Center Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li>
          <a href="#" className="hover:text-blue-600">
            Features
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600">
            How It Works
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600">
            FAQ
          </a>
        </li>
        <li>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
        </li>
      </ul>

      {/* Right Buttons */}
      <div className="space-x-4">
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Sign In
        </a>
        <a
          href="#"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Sign Up
        </a>
      </div>
    </nav>
  )
}

export default Navbar
