import React from "react"
import {
  CustomerContentHeader,
  CustomerTableContainer,
} from "@/containers/Customers"

const CustomersPage: React.FC = () => {
  // Handlers for customer actions
  const handleAddCustomer = () => {
    console.log("Add customer clicked")
    // Implement add customer functionality here
  }

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
      <CustomerContentHeader onAddCustomer={handleAddCustomer} />
      <CustomerTableContainer
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />
    </div>
  )
}

export default CustomersPage
