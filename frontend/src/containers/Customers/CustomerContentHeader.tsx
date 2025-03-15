import React from "react"
import { Button } from "@/components/ui/button"

interface CustomerContentHeaderProps {
  onAddCustomer?: () => void
}

const CustomerContentHeader: React.FC<CustomerContentHeaderProps> = ({
  onAddCustomer,
}) => {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Customers</h1>
        <p className="mt-2 text-secondary-600">
          Manage your customer information and view their details.
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white"
          onClick={onAddCustomer}
        >
          Add Customer
        </Button>
      </div>
    </>
  )
}

export default CustomerContentHeader
