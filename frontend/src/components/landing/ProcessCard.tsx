/**
 * @file ProcessCard.tsx - Defines the ProcessCard component used to display a single step in the process section.
 */

import React from "react"
import { landingProcess } from "@/constants/Landing/landingProcess"
import GlowHoverEffect from "@/components/common/GlowHoverEffect"
import GradientAccentLine from "@/components/common/GradientAccentLine"
import ProcessCardTitle from "@/components/landing/ProcessCardTitle"
import ProcessFeatureList from "@/components/landing/ProcessFeatureList"

interface ProcessCardProps {
  /** Index of the step in the process (0-based) */
  stepIndex: number
}

/**
 * ProcessCard Component
 *
 * Renders a single card for a process step including title, description,
 * gradient accents, and a list of step-specific features.
 *
 * @param {ProcessCardProps} props - Component props.
 * @param {number} props.stepIndex - The index of the step to display.
 * @returns {JSX.Element} - A visually styled process step card.
 */
const ProcessCard: React.FC<ProcessCardProps> = ({ stepIndex }) => {
  const step = landingProcess.steps[stepIndex]
  const isEven = stepIndex % 2 === 1

  return (
    <GlowHoverEffect>
      <GradientAccentLine />

      <ProcessCardTitle
        title={step.title}
        stepNumber={step.stepNumber}
        isEven={isEven}
      />

      <p className="text-gray-600 text-lg leading-relaxed">
        {step.description}
      </p>

      <ProcessFeatureList features={step.features} isEven={isEven} />
    </GlowHoverEffect>
  )
}

export default ProcessCard
