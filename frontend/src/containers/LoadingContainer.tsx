/**
 * @file LoadingContainer.tsx - Defines the LoadingContainer component, which displays a loading animation.
 * It provides a visual indication that content is being loaded.
 */

/**
 * LoadingContainer Component
 *
 * This component renders a loading animation, indicating to users that content is being loaded.
 * It includes decorative elements and animations to enhance user experience.
 *
 * @returns {JSX.Element} The loading animation container.
 */

import React from "react"

const LoadingContainer: React.FC = () => {
  return (
    <div className="bg-white px-4 py-4 sm:px-4 sm:py-4 md:grid md:place-items-center lg:px-8 min-h-screen">
      <div className="max-w-max mx-auto">
        <main className="sm:flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-primary tracking-tight sm:text-5xl">
              Loading
            </h1>
            <p className="mt-3 text-base text-secondary-500">
              Please wait while we prepare your content...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mt-12 flex justify-center">
            <svg
              className="animate-spin h-16 w-16 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-secondary-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-secondary-500">
                Processing your request
              </span>
            </div>
          </div>

          {/* Pulse Animation Dots */}
          <div className="mt-8 flex space-x-4 justify-center">
            <div className="h-3 w-3 bg-primary-400 rounded-full animate-pulse"></div>
            <div className="h-3 w-3 bg-primary-500 rounded-full animate-pulse delay-150"></div>
            <div className="h-3 w-3 bg-primary-600 rounded-full animate-pulse delay-300"></div>
          </div>

          {/* Progress Bar */}
          <div className="mt-12 w-full max-w-md">
            <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-600 rounded-full w-2/3 animate-pulse"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LoadingContainer
