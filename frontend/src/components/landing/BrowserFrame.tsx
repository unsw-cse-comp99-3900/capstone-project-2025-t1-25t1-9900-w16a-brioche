import React, { ReactNode } from "react"

interface BrowserFrameProps {
  children: ReactNode
}

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
