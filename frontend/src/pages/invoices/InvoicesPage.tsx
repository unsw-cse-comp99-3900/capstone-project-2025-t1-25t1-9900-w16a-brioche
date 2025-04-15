/**
 * @file InvoicesPage.tsx - Defines the InvoicesPage component, which renders the main page for viewing invoice records.
 * * It includes the header and table components for displaying invoice data.
 */

/**
 * InvoicesPage Component
 *
 * * This component renders the main layout for the invoices page, including a decorative background,
 *   a content header, and the table that displays invoice records.
 *
 * @returns {JSX.Element} The full page layout for viewing invoices.
 */

import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import InvoiceContentHeader from "@/containers/Invoices/InvoiceContentHeader"
import InvoiceTableContainer from "@/containers/Invoices/InvoiceTableContainer"

const InvoicesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <InvoiceContentHeader />
        <InvoiceTableContainer />
      </div>
    </div>
  )
}

export default InvoicesPage
