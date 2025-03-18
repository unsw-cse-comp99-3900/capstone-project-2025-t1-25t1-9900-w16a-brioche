import React from "react"

interface NotesTextareaProps {
  value: string
  onChange: (value: string) => void
}

const NotesTextarea: React.FC<NotesTextareaProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Notes</label>
      <textarea
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add any additional notes here..."
        rows={3}
        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
      />
    </div>
  )
}

export default NotesTextarea
