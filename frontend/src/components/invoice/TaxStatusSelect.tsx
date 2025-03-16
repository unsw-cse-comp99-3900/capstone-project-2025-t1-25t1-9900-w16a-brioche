import React from "react"

interface TaxStatusSelectProps {
  value: string
  onChange: (value: string) => void
}

const TaxStatusSelect: React.FC<TaxStatusSelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Amount Tax Status <span className="text-red-500">*</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
      >
        <option value="NonTaxed">Non-Taxed</option>
        <option value="Inclusive">Inclusive</option>
        <option value="Exclusive">Exclusive</option>
      </select>
    </div>
  )
}

export default TaxStatusSelect
