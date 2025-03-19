import React from "react"
import DashboardHeaderContainer from "@/containers/Dashboard/DashboardHeaderContainer"
import DashboardStatsContainer from "@/containers/Dashboard/DashboardStatsContainer"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import InvoiceTableContainer from "@/containers/Invoices/InvoiceTableContainer"

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <DashboardHeaderContainer />
        <DashboardStatsContainer />
        <InvoiceTableContainer />
      </div>
    </div>
  )
}

export default DashboardPage
