import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

const FeaturesBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Subtle grid pattern overlay */}
      <GridPatternOverlay />

      {/* Decorative blurred shapes */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute bottom-40 -right-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-yellow-200 to-pink-200 opacity-20 rounded-full blur-[60px]"></div>
    </div>
  )
}

export default FeaturesBackground
