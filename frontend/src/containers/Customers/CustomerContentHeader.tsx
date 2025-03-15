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
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-white mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Customer Management
          </span>
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Manage your customer relationships efficiently
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
