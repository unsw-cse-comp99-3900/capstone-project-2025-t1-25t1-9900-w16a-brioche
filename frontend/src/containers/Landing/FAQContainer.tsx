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
