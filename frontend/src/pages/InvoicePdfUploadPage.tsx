/**
 * @file InvoicePdfUploadPage.tsx - Defines the InvoicePdfUploadPage component, which renders the page layout for uploading invoice PDFs.
 * * It includes a decorative background and the InvoicePdfUploadContainer component.
 */

/**
 * InvoicePdfUploadPage Component
 *
 * * This component renders the main layout for the invoice PDF upload page, including a decorative background
 *   and the upload container for handling invoice PDF files.
 *
 * @returns {JSX.Element} The full page layout for uploading invoice PDFs.
 */

import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import InvoicePdfUploadContainer from "@/containers/Invoices/InvoicePdfUploadContainer"

const InvoicePdfUploadPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <InvoicePdfUploadContainer />
      </div>
    </div>
  )
}

export default InvoicePdfUploadPage
