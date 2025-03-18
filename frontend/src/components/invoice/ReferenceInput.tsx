import React from "react"

interface ReferenceInputProps {
  value: string
  onChange: (value: string) => void
}

const ReferenceInput: React.FC<ReferenceInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Reference Number
      </label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter reference number"
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
      />
    </div>
  )
}

export default ReferenceInput
