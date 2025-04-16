/**
 * @file FAQList.tsx - Renders the full list of frequently asked questions using individual FAQItem components.
 */

import React from "react"
import FAQItem from "@/components/landing/FAQ_Page/FAQItem"
import { landingFAQ } from "@/constants/Landing/landingFAQ"

/**
 * FAQList Component
 *
 * This component maps over the FAQ data and renders each item using the `FAQItem` component.
 * It is intended to be used within a landing page FAQ section.
 *
 * Animations are handled via `data-aos` attributes.
 *
 * @returns {JSX.Element} A styled list of expandable FAQ items
 */
const FAQList: React.FC = () => {
  return (
    <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
      {landingFAQ.faqItems.map((item) => (
        <FAQItem
          key={item.id}
          icon={item.icon}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  )
}

export default FAQList
