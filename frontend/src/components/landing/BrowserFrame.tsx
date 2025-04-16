/**
 * @file BrowserFrame.tsx - Defines a visual wrapper component that mimics a browser window frame.
 */

import React, { ReactNode } from "react"

interface BrowserFrameProps {
  /** The content to display inside the browser frame */
  children: ReactNode
}

/**
 * BrowserFrame Component
 *
 * A styled container that visually mimics a web browser window. It includes
 * a header bar with red, yellow, and green circular "buttons" similar to those
 * found on macOS browser UIs.
 *
 * This component is typically used for design mockups, previews, or showcasing UI sections.
 *
 * @param {BrowserFrameProps} props - The component props
 * @param {ReactNode} props.children - The inner content to render inside the frame
 * @returns {JSX.Element} A visually styled browser frame container
 */
const BrowserFrame: React.FC<BrowserFrameProps> = ({ children }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-xl overflow-hidden border border-secondary-200">
      {/* Browser-like top bar */}
      <div className="p-1 bg-gradient-to-r from-secondary-100 to-secondary-50">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {children}
    </div>
  )
}

export default BrowserFrame
