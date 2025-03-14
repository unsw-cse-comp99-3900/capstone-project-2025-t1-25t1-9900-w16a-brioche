import React from "react"

interface SelectCustomerProps {
  value: string
  onChange: (value: string) => void
}

const SelectCustomer: React.FC<SelectCustomerProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-b-2 border-gray-400 bg-transparent focus:outline-none p-2"
    >
      <option value="">Select Customer...</option>
      <option value="Customer1">Customer 1</option>
      <option value="Customer2">Customer 2</option>
    </select>
  )
}

export default SelectCustomer
