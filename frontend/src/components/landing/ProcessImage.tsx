import React from "react"
import GlowEffect from "@/components/common/GlowEffect"
import { landingProcess } from "@/constants/Landing/landingProcess"

interface ProcessImageProps {
  stepIndex: number
}

const ProcessImage: React.FC<ProcessImageProps> = ({ stepIndex }) => {
  const step = landingProcess.steps[stepIndex]

  return (
    <div className="relative">
      <div className="absolute -inset-1">
        <GlowEffect
          colors="from-primary-500 to-blue-500"
          opacity="opacity-70"
        />
      </div>

      <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white">
        <img
          src={step.imageUrl}
          alt={step.imageAlt}
          className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 to-transparent"></div>

        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
          <span className="text-sm font-medium text-primary-700">
            {step.stepLabel}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProcessImage
