/**
 * @file ProcessTimelineNode.tsx - Displays a timeline node indicator with the step number.
 */

import React from "react"
import { landingProcess } from "@/constants/Landing/landingProcess"

type ProcessTimelineNodeProps = {
  /** The index of the current step in the process */
  stepIndex: number
}

/**
 * ProcessTimelineNode Component
 *
 * This component visually represents an individual step node within the process timeline.
 * It renders a numbered circular badge with layered visual effects, used between process cards and illustrations.
 * Visible only on medium-sized screens and above.
 *
 * @param {ProcessTimelineNodeProps} props - The component props.
 * @param {number} props.stepIndex - The index of the current step in the process.
 * @returns {JSX.Element} - A circular timeline node displaying the step number.
 */
const ProcessTimelineNode = ({
  stepIndex,
}: ProcessTimelineNodeProps): React.ReactElement => {
  const stepNumber = landingProcess.steps[stepIndex].stepNumber

  return (
    <div className="hidden md:flex md:w-12 md:justify-center relative z-10">
      <div className="absolute w-24 h-24 bg-primary-50 rounded-full opacity-70 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-blue-500 border-4 border-white shadow-lg flex items-center justify-center text-white font-bold">
        {stepNumber}
      </div>
    </div>
  )
}

export default ProcessTimelineNode
