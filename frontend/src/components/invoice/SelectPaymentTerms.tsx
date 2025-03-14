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
    // 模拟 API 数据
    const fakeTerms = [
      { id: "net30", name: "Net 30 Days" },
      { id: "net60", name: "Net 60 Days" },
      { id: "dueOnReceipt", name: "Due on Receipt" },
    ]
    setPaymentTerms(fakeTerms)
  }, [])

  return (
    <select
      className="p-2 rounded w-full border-b-2 border-gray-400 bg-transparent focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select payment terms...</option>
      {paymentTerms.map((term) => (
        <option key={term.id} value={term.id}>
          {term.name}
        </option>
      ))}
    </select>
  )
}

export default SelectPaymentTerms
