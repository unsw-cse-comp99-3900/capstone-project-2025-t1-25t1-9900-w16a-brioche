/**
 * @file ViewInvoicePage.tsx - Defines the ViewInvoicePage component, which renders the page layout for viewing an invoice.
 * * It includes the page header and the ViewInvoicContainer component.
 */

/**
 * ViewInvoicePage Component
 *
 * * This component renders the main layout for the view invoice page, including a decorative background,
 *   a header with title and icon, and the container that displays invoice details.
 *
 * @returns {JSX.Element} The full page structure for viewing an invoice.
 */

import React from "react"
import { Eye } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import ViewInvoicContainer from "@/containers/Invoices/ViewInvoicContainer"

const CreateInvoicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader title="View Invoice" icon={Eye} gradient={true} />
            <ViewInvoicContainer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateInvoicePage
