import React from "react"
import {
  CustomerContentHeader,
  CustomerTableContainer,
} from "@/containers/Customers"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

const CustomersPage: React.FC = () => {
  // Handlers for customer actions
  const handleEditCustomer = (id: string) => {
    console.log("Edit customer:", id)
    // Implement edit customer functionality here
  }

  const handleDeleteCustomer = (id: string) => {
    console.log("Delete customer:", id)
    // Implement delete customer functionality here (e.g., confirmation dialog)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <CustomerContentHeader />

        <CustomerTableContainer
          onEditCustomer={handleEditCustomer}
          onDeleteCustomer={handleDeleteCustomer}
        />
      </div>
    </div>
  )
}

export default CustomersPage
