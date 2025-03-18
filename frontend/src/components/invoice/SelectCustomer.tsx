import React from "react"

interface SelectCustomerProps {
  value: string
  onChange: (value: string) => void
  customers: { id: string; name: string }[]
  isLoading: boolean
}

const SelectCustomer: React.FC<SelectCustomerProps> = ({
  value,
  onChange,
  customers,
  isLoading,
}) => {
  return (
    <div>
      <label
        htmlFor="customer"
        className="block text-sm font-medium text-gray-700"
      >
        Customer <span className="text-red-500">*</span>
      </label>
      <div className="mt-1">
        <select
          id="customer"
          name="customer"
          value={value}
          onChange={(e) => {
            const selectedCustomer = customers.find(
              (c) => c.name === e.target.value
            )
            onChange(selectedCustomer ? selectedCustomer.name : "")
          }}
          required
          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
          disabled={isLoading}
        >
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.name}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectCustomer
