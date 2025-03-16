import React from "react"
import ProcessStep from "@/components/landing/ProcessStep"
import { landingProcess } from "@/constants/Landing/landingProcess"

const ProcessTimeline: React.FC = () => {
  return (
    <div className="relative">
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-300 via-primary-500 to-blue-500 rounded-full"></div>

      {landingProcess.steps.map((_, index) => (
        <ProcessStep key={index} stepIndex={index} />
      ))}
    </div>
  )
}

export default ProcessTimeline
