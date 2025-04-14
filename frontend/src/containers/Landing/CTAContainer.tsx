/**
 * @file CTAContainer.tsx - Defines the CTAContainer component, which provides a call-to-action section on the landing page.
 * It includes background visuals and content to encourage user engagement.
 */

/**
 * CTAContainer Component
 *
 * This component renders the call-to-action section of the landing page, featuring background visuals and
 * content designed to encourage user engagement.
 *
 * @returns {JSX.Element} The call-to-action section of the landing page.
 */

import React from "react"
import CTABackground from "@/components/landing/BenefitsPage/CTABackground"
import CTAContent from "@/components/landing/BenefitsPage/CTAContent"

const CTASection: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <CTABackground />
      <CTAContent />
    </section>
  )
}

export default CTASection
