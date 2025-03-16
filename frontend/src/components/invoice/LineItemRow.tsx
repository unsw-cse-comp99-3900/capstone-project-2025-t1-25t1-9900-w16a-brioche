import React from "react"
import { Controller, Control, useWatch } from "react-hook-form"
import { InvoiceFormData } from "./invoiceSchema"

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
    useWatch({ control, name: `lineItems.${index}.quantity` }) || 0
  const unitPrice =
    useWatch({ control, name: `lineItems.${index}.unitPrice` }) || 0
  const taxRate =
    useWatch({ control, name: `lineItems.${index}.taxRate` }) || "None"
  const amountTaxStatus =
    useWatch({ control, name: "amountTaxStatus" }) || "NonTaxed"

  // 获取税率
  const taxMultiplier = taxRate === "GST" ? 0.1 : taxRate === "VAT" ? 0.05 : 0

  // 计算 Amount
  let amount = quantity * unitPrice
  if (amountTaxStatus === "Exclusive") {
    amount += amount * taxMultiplier
  } else if (amountTaxStatus === "Inclusive") {
    amount = amount / (1 + taxMultiplier)
  }

  return (
    <div className="grid grid-cols-7 gap-2 items-center py-3 px-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition duration-200">
      {/* 行号 */}
      <span className="text-sm font-semibold text-gray-700">{index + 1}</span>

      {/* 描述 */}
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

      {/* 数量 */}
      <Controller
        name={`lineItems.${index}.quantity`}
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      {/* 单价 */}
      <Controller
        name={`lineItems.${index}.unitPrice`}
        control={control}
        render={({ field }) => (
          <input
            type="number"
            {...field}
            min="1"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      />

      {/* 税率 */}
      <Controller
        name={`lineItems.${index}.taxRate`}
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Tax</option>
            <option value="GST">GST (10%)</option>
            <option value="VAT">VAT (5%)</option>
            <option value="None">None</option>
          </select>
        )}
      />

      {/* Amount 显示，计算后的金额 */}
      <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>

      {/* 删除 */}
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
