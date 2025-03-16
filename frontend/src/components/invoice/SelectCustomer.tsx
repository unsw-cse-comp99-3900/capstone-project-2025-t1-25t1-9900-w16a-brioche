import React from "react"

interface SelectCustomerProps {
  value: string
  onChange: (value: string) => void
}

const SelectCustomer: React.FC<SelectCustomerProps> = ({ value, onChange }) => {
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
          onChange={(e) => onChange(e.target.value)}
          required
          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
        >
          <option value="">Select a customer</option>
          <option value="Customer1">ABC Company</option>
          <option value="Customer2">XYZ Corporation</option>
        </select>
      </div>
    </div>
  )
}

export default SelectCustomer
