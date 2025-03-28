import React from "react"
import { landingBenefits } from "@/constants/Landing/landingbenefits"

const BenefitsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {landingBenefits.benefits.map((benefit, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
            {benefit.icon}
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {benefit.title}
          </h4>
          <p className="text-gray-600">{benefit.description}</p>
        </div>
      ))}
    </div>
  )
}

export default BenefitsGrid
