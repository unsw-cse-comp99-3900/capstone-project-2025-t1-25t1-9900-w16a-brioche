/**
 * @file FAQItem.tsx - Represents a single FAQ question and answer block with an expand/collapse interaction and glow hover effect.
 */

import React, { ReactNode, useState } from "react"
import GlowHoverEffect from "@/components/common/GlowHoverEffect"

interface FAQItemProps {
  /** Icon displayed to the left of the question */
  icon: ReactNode
  /** FAQ question text */
  question: string
  /** Answer content which can include JSX */
  answer: ReactNode
}

/**
 * FAQItem Component
 *
 * This component renders a single FAQ item with:
 * - An icon
 * - A clickable question
 * - A collapsible answer section
 * - Visual enhancements like a glowing hover effect and gradient divider
 *
 * @param {FAQItemProps} props - The FAQ item properties
 * @param {ReactNode} props.icon - The icon representing the FAQ topic
 * @param {string} props.question - The question to be displayed
 * @param {ReactNode} props.answer - The answer content to be revealed upon click
 * @returns {JSX.Element} A stylized expandable FAQ item
 */
const FAQItem: React.FC<FAQItemProps> = ({ icon, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <GlowHoverEffect>
      <div className="px-6 py-1">
        <button onClick={toggleOpen} className="w-full">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 mr-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-50 to-blue-50 text-primary-600">
                {icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-left">
              {question}
            </h3>
            <div className="ml-auto">
              <svg
                className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </button>

        {isOpen && (
          <div className="h-px w-full bg-gradient-to-r from-primary-100 to-blue-100 mb-4"></div>
        )}

        <div
          className={`overflow-hidden transition-all duration-300 text-base ${isOpen ? "max-h-96 opacity-100 mb-3" : "max-h-0 opacity-0 mb-0"}`}
        >
          {answer}
        </div>
      </div>
    </GlowHoverEffect>
  )
}

export default FAQItem
