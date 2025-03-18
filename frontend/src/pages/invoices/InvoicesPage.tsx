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
