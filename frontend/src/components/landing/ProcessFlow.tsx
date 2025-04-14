/**
 * @file ProcessFlow.tsx - Displays a mini process visualization in the hero section, representing 3 sequential steps with connecting arrows.
 */

import React from "react"
import { landingHero } from "@/constants/Landing/landingHero"

/**
 * ProcessFlow Component
 *
 * Renders a compact horizontal process indicator with 3 colored steps connected by arrows.
 * Typically used in the hero section to visually show the simplified workflow or onboarding process.
 *
 * @returns {JSX.Element} A styled box containing process steps and descriptions.
 */
const ProcessFlow: React.FC = () => {
  return (
    <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-3 border border-secondary-200">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
          {landingHero.processFlow.step1}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
          {landingHero.processFlow.step2}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-secondary-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xs">
          {landingHero.processFlow.step3}
        </div>
      </div>
      <div className="mt-1 text-xs text-center text-secondary-600">
        {landingHero.processFlow.flowText}
      </div>
    </div>
  )
}

export default ProcessFlow
