/**
 * @file DocumentationPage.tsx - Defines the DocumentationPage component, which renders the full documentation view with navigation and content sections.
 * * It includes a sidebar for navigation and multiple containers for displaying individual documentation sections.
 */

/**
 * DocumentationPage Component
 *
 * * This component renders the main layout for the documentation page, including a sidebar navigation and various documentation sections.
 *   It manages section switching via internal state and provides smooth scroll behavior when navigating between sections.
 *
 * @returns {JSX.Element} The complete documentation layout with sidebar and content.
 */

import React, { useState } from "react"
import SideBar from "@/containers/Documentation/SideBarContainer"
import Overview from "@/containers/Documentation/OverviewContainer"
import BusinessProcess from "@/containers/Documentation/BusinessProcessContainer"
import ReckonIntegration from "@/containers/Documentation/ReckonIntegrationContainer"
import InvoiceCreation from "@/containers/Documentation/InvoiceCreationContainer"
import Validation from "@/containers/Documentation/ValidationContainer"
import Sending from "@/containers/Documentation/SendingContainer"
import SMEGuidelines from "@/containers/Documentation/SMEGuidelinesContainer"
import ScrollToTopButton from "@/containers/Documentation/BackToTopButton"

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview")

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <SideBar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            <div className="lg:col-span-9">
              <div className="prose prose-primary max-w-none">
                <Overview />
                <BusinessProcess />
                <ReckonIntegration />
                <InvoiceCreation /> 
                <Validation />
                <Sending />
                <SMEGuidelines />
                <ScrollToTopButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentationPage
