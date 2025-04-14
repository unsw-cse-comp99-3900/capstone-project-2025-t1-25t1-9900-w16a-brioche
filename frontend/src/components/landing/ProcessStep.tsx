/**
 * @file ProcessStep.tsx - Represents a single step in the process section, including a card, image, and timeline node.
 */

import React from "react"
import ProcessCard from "@/components/landing/ProcessCard"
import ProcessTimelineNode from "@/components/landing/ProcessTimelineNode"
import ProcessImage from "@/components/landing/ProcessImage"

interface ProcessStepProps {
  /** The index of the process step (used to fetch data and determine layout) */
  stepIndex: number
}

/**
 * ProcessStep Component
 *
 * This component visually displays a step in the landing page process flow.
 * It includes a process card, image, and a timeline node, and alternates layout for even and odd steps.
 *
 * @param {ProcessStepProps} props - The component props.
 * @param {number} props.stepIndex - The index of the step to display.
 * @returns {JSX.Element} - A full visual step with text and image aligned appropriately.
 */
const ProcessStep: React.FC<ProcessStepProps> = ({ stepIndex }) => {
  const isEven = stepIndex % 2 === 1

  return (
    <div
      className={`relative ${stepIndex < 2 ? "mb-24 md:mb-32" : ""}`}
      data-aos={isEven ? "fade-left" : "fade-right"}
      data-aos-delay={100 * (stepIndex + 1)}
    >
      <div className="flex flex-col md:flex-row items-center">
        <div
          className={`md:w-1/2 ${isEven ? "md:order-last md:pl-16" : "md:pr-16 md:text-right"}`}
        >
          <ProcessCard stepIndex={stepIndex} />
        </div>

        <ProcessTimelineNode stepIndex={stepIndex} />

        <div
          className={`md:w-1/2 ${isEven ? "md:order-first" : ""} mt-12 md:mt-0`}
        >
          <ProcessImage stepIndex={stepIndex} />
        </div>
      </div>
    </div>
  )
}

export default ProcessStep
