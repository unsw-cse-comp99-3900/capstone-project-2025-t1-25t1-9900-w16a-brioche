/**
 * @file CreateInvoicePage.tsx - Defines the CreateInvoicePage component, which renders the page layout for creating a new invoice.
 * * It includes the page header and the CreateInvoiceContainer component.
 */

/**
 * CreateInvoicePage Component
 *
 * * This component renders the main layout for the create invoice page, including a decorative background,
 *   a header with title and icon, and the form container for invoice creation.
 *
 * @returns {JSX.Element} The full page structure for creating an invoice.
 */

import React from "react"
import { FileText } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import CreateInvoiceContainer from "@/containers/Invoices/CreateInvoiceContainer"

const CreateInvoicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader
              title="Create Invoice"
              icon={FileText}
              gradient={true}
            />
            <CreateInvoiceContainer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateInvoicePage
