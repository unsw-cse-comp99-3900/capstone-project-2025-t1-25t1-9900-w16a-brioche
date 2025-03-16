import React from "react"
import {
  CustomerContentHeader,
  CustomerTableContainer,
} from "@/containers/Customers"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

const CustomersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <CustomerContentHeader />
        <CustomerTableContainer />
      </div>
    </div>
  )
}

export default CustomersPage
