import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import InvoicePdfUploadContainer from "@/containers/Invoice/InvoicePdfUploadContainer"

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
