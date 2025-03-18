import React from "react"
import { landingBenefits } from "@/constants/Landing/landingbenefits"

const BenefitsHeader: React.FC = () => {
  return (
    <h3
      className="text-2xl font-bold text-center text-gray-900 mb-10"
      style={{ position: "relative", top: "-20px" }}
    >
      {landingBenefits.sectionTitle}
    </h3>
  )
}

export default BenefitsHeader
