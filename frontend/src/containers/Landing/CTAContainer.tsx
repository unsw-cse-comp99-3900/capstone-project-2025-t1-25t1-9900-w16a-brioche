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
