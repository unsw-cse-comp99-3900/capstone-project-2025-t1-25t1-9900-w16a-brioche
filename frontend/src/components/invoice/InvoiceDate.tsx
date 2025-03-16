import React from "react"

interface InvoiceDateProps {
  value: string
  onChange: (value: string) => void
}

const InvoiceDate: React.FC<InvoiceDateProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Invoice Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
      />
    </div>
  )
}

export default InvoiceDate
