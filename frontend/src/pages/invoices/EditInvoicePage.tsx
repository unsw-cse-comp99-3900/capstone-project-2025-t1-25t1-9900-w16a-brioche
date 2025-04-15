/**
 * @file EditInvoicePage.tsx - Defines the EditInvoicePage component, which renders the page layout for editing an existing invoice.
 * * It includes the page header and the EditInvoiceContainer component.
 */

/**
 * EditInvoicePage Component
 *
 * * This component renders the main layout for the update invoice page, including a decorative background,
 *   a header with title and icon, and the form container for invoice editing.
 *
 * @returns {JSX.Element} The full page structure for updating an invoice.
 */

import React from "react"
import { FileText } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import EditInvoiceContainer from "@/containers/Invoices/EditInvoiceContainer"

const CreateInvoicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader
              title="Update Invoice"
              icon={FileText}
              gradient={true}
            />
            <EditInvoiceContainer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateInvoicePage
