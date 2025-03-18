import React, { ReactNode } from "react"
import GlowHoverEffect from "@/components/common/GlowHoverEffect"

interface FAQItemProps {
  icon: ReactNode
  question: string
  answer: ReactNode
}

const FAQItem: React.FC<FAQItemProps> = ({ icon, question, answer }) => {
  return (
    <GlowHoverEffect>
      <div className="px-6 py-2">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 mr-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-50 to-blue-50 text-primary-600">
              {icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-primary-100 to-blue-100 mb-6"></div>
        {answer}
      </div>
    </GlowHoverEffect>
  )
}

export default FAQItem
