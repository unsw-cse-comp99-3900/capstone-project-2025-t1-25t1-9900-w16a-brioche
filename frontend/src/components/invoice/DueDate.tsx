import React from "react"
import { format } from "date-fns"

interface DueDateProps {
  value: string
  onChange: (value: string) => void
}

const DueDate: React.FC<DueDateProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Due Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        value={value || ""}
        onChange={(e) => {
          const formattedDate = format(new Date(e.target.value), "yyyy-MM-dd")
          onChange(formattedDate)
        }}
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
      />
    </div>
  )
}

export default DueDate
