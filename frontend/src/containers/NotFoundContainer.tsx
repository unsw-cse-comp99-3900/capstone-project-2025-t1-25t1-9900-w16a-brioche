/**
 * @file NotFoundContainer.tsx - Defines the NotFoundContainer component, which displays a 404 error page.
 * It informs users that the requested page could not be found and provides navigation options.
 */

import React from "react"
import { Link } from "react-router-dom"

/**
 * NotFoundContainer Component
 *
 * This component renders a 404 error page, informing users that the requested page could not be found.
 * It includes navigation options to guide users back to available pages.
 *
 * @returns {JSX.Element} The 404 error page container.
 */
const NotFoundContainer: React.FC = () => {
  return (
    <div className="bg-white px-4 py-4 sm:px-4 sm:py-4 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-extrabold text-primary-600 sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-secondary-200 sm:pl-6">
              <h1 className="text-4xl font-extrabold text-secondary-900 tracking-tight sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-3 text-base text-secondary-500">
                Sorry, we couldn't find the page you're looking for.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </main>

        {/* Illustration */}
        <div className="mt-12 flex justify-center">
          <svg
            className="h-64 w-auto text-secondary-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 400"
            fill="none"
          >
            <path
              d="M300 328.5C391.127 328.5 465 254.627 465 163.5C465 72.3731 391.127 -1.5 300 -1.5C208.873 -1.5 135 72.3731 135 163.5C135 254.627 208.873 328.5 300 328.5Z"
              fill="#F3F4F6"
            />
            <path
              d="M126 379.5H474"
              stroke="#D1D5DB"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M284 379.5C284 371.492 290.492 365 298.5 365H301.5C309.508 365 316 371.492 316 379.5V379.5H284V379.5Z"
              fill="#D1D5DB"
            />
            <path
              d="M372 235.5L372 187.5"
              stroke="#9CA3AF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M372 171.5L372 123.5"
              stroke="#9CA3AF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M228 235.5L228 187.5"
              stroke="#9CA3AF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M228 171.5L228 123.5"
              stroke="#9CA3AF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M259 211.5H341"
              stroke="#4B5563"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M259 147.5H341"
              stroke="#4B5563"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M259 179.5H341"
              stroke="#4B5563"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M228 259.5C228 253.425 232.925 248.5 239 248.5H361C367.075 248.5 372 253.425 372 259.5V379.5H228V259.5Z"
              fill="currentColor"
            />
            <path
              d="M269 314C275.075 314 280 308.851 280 302.5C280 296.149 275.075 291 269 291C262.925 291 258 296.149 258 302.5C258 308.851 262.925 314 269 314Z"
              fill="white"
            />
            <path
              d="M331 314C337.075 314 342 308.851 342 302.5C342 296.149 337.075 291 331 291C324.925 291 320 296.149 320 302.5C320 308.851 324.925 314 331 314Z"
              fill="white"
            />
            <path
              d="M300 346.5C311.046 346.5 320 337.546 320 326.5C320 315.454 311.046 306.5 300 306.5C288.954 306.5 280 315.454 280 326.5C280 337.546 288.954 346.5 300 346.5Z"
              fill="white"
            />
          </svg>
        </div>
        {/* Quick Links */}
        <div className="mt-2">
          <h2 className="text-sm font-medium text-secondary-500">
            Popular pages
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <li>
              <a
                href="/dashboard"
                className="block hover:bg-secondary-50 rounded-lg p-3 border border-secondary-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Dashboard
                    </p>
                    <p className="text-xs text-secondary-500">
                      View your invoice statistics and history
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/create-invoice"
                className="block hover:bg-secondary-50 rounded-lg p-3 border border-secondary-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Create Invoice
                    </p>
                    <p className="text-xs text-secondary-500">
                      Create a new invoice manually
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/upload-invoice"
                className="block hover:bg-secondary-50 rounded-lg p-3 border border-secondary-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Upload CSV/Excel
                    </p>
                    <p className="text-xs text-secondary-500">
                      Create invoices from spreadsheet
                    </p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a
                href="/documentation"
                className="block hover:bg-secondary-50 rounded-lg p-3 border border-secondary-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-md flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-secondary-900">
                      Documentation
                    </p>
                    <p className="text-xs text-secondary-500">
                      View platform documentation
                    </p>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NotFoundContainer
