import React, { useEffect, useState } from "react"

type SelectPaymentTermsProps = {
  value: string
  onChange: (val: string) => void
}

const SelectPaymentTerms: React.FC<SelectPaymentTermsProps> = ({
  value,
  onChange,
}) => {
  const [paymentTerms, setPaymentTerms] = useState<
    { id: string; name: string }[]
  >([])

  useEffect(() => {
    setPaymentTerms([
      { id: "net30", name: "Net 30 Days" },
      { id: "net60", name: "Net 60 Days" },
      { id: "dueOnReceipt", name: "Due on Receipt" },
    ])
  }, [])

  return (
    <div>
      <label
        htmlFor="paymentTerms"
        className="block text-sm font-medium text-gray-700"
      >
        Payment Terms
      </label>
      <div className="mt-1">
        <select
          id="paymentTerms"
          name="paymentTerms"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md p-2"
        >
          <option value="">Select payment terms...</option>
          {paymentTerms.map((term) => (
            <option key={term.id} value={term.id}>
              {term.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectPaymentTerms
