import React from "react"
import { Controller, Control, useWatch } from "react-hook-form"
import { InvoiceFormData } from "./invoiceSchema"
import { TAX_RATES } from "@/containers/Invoice/InvoiceFormContainer"

interface LineItemRowProps {
  index: number
  control: Control<InvoiceFormData>
  remove: (index: number) => void
}

const LineItemRow: React.FC<LineItemRowProps> = ({
  index,
  control,
  remove,
}) => {
  const quantity =
    Number(useWatch({ control, name: `lineItems.${index}.quantity` })) || 0
  const unitPrice =
    Number(useWatch({ control, name: `lineItems.${index}.unitPrice` })) || 0
  const taxRate =
    useWatch({ control, name: `lineItems.${index}.taxRate` }) || null
  const amountTaxStatus =
    useWatch({ control, name: "amountTaxStatus" }) || "NonTaxed"
  const discountAmount =
    Number(useWatch({ control, name: `lineItems.${index}.discountAmount` })) ||
    0
  const discountPercent =
    Number(useWatch({ control, name: `lineItems.${index}.discountPercent` })) ||
    0

  const discount =
    quantity * unitPrice * (discountPercent / 100) + discountAmount

  const taxMultiplier = taxRate
    ? (TAX_RATES.find((rate) => rate.id === taxRate)?.percent || 0) / 100
    : 0

  let amount = quantity * unitPrice - discount
  if (amountTaxStatus === "Exclusive") {
    amount += amount * taxMultiplier
  } else if (amountTaxStatus === "Inclusive") {
    amount = amount / (1 + taxMultiplier)
  }

  return (
    <div className="grid grid-cols-9 gap-2 items-center py-3 px-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition duration-200">
      <span className="text-sm font-semibold text-gray-700">{index + 1}</span>

      <Controller
        name={`lineItems.${index}.serviceDate`}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      <Controller
        name={`lineItems.${index}.description`}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            placeholder="Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      <Controller
        name={`lineItems.${index}.quantity`}
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            min="1"
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      <Controller
        name={`lineItems.${index}.unitPrice`}
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            min="0"
            step="0.01"
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      <Controller
        name={`lineItems.${index}.discountPercent`}
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            min="0"
            max="100"
            placeholder="Discount %"
            onChange={(e) => field.onChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      <Controller
        name={`lineItems.${index}.taxRate`}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            value={field.value ?? ""}
            onChange={(e) => {
              field.onChange(e.target.value || "")
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Tax</option>
            {TAX_RATES.map((rate) => (
              <option key={rate.id} value={rate.id}>
                {rate.name} ({rate.percent}%)
              </option>
            ))}
          </select>
        )}
      />

      <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>

      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-500 hover:text-red-700 transition duration-200 text-center"
      >
        ✖
      </button>
    </div>
  )
}

export default LineItemRow
