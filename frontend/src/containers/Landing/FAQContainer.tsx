/**
 * @file FAQContainer.tsx - Container component for the FAQ section of the landing page
 * 
 * Import required dependencies and components:
 * - React for JSX support
 * - FAQBackground for the section's background visuals
 * - FAQHeader for the FAQ section title and description
 * - FAQList for displaying the list of frequently asked questions
 * - FAQHelpSection for additional help resources
 */
import React from "react"
import FAQBackground from "@/components/landing/FAQ_Page/FAQBackground"
import FAQHeader from "@/components/landing/FAQ_Page/FAQHeader"
import FAQList from "@/components/landing/FAQ_Page/FAQList"
import FAQHelpSection from "@/components/landing/FAQ_Page/FAQHelpSection"

const FAQSection: React.FC = () => {
  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <FAQBackground />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FAQHeader />
        <FAQList />
        <FAQHelpSection />
      </div>
    </section>
  )
}

export default FAQSection
