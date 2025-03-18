import React from "react"

interface InvoiceNumberProps {
  value?: string
  onChange: (value: string) => void
}

const InvoiceNumber: React.FC<InvoiceNumberProps> = ({
  value = "",
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Purchase Order Number
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Invoice NumberNumber"
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
      />
    </div>
  )
}

export default InvoiceNumber
