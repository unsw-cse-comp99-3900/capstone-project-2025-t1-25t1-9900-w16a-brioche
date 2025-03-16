import React from "react"
import { useWatch, Control } from "react-hook-form"
import { InvoiceFormData } from "./invoiceSchema"

interface InvoiceFooterProps {
  control: Control<InvoiceFormData>
}

const InvoiceFooter: React.FC<InvoiceFooterProps> = ({ control }) => {
  // 监听 `lineItems` 和 `amountTaxStatus`
  const lineItems = useWatch({ control, name: "lineItems" }) || []
  const amountTaxStatus =
    useWatch({ control, name: "amountTaxStatus" }) || "NonTaxed"

  // 计算小计（Subtotal）
  const subtotal = lineItems.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0
  )

  // 计算税额（Tax Amount）
  let taxAmount = 0
  if (amountTaxStatus === "Exclusive") {
    taxAmount = lineItems.reduce((acc, item) => {
      const taxRate =
        item.taxRate === "GST" ? 0.1 : item.taxRate === "VAT" ? 0.05 : 0
      return acc + item.quantity * item.unitPrice * taxRate
    }, 0)
  } else if (amountTaxStatus === "Inclusive") {
    taxAmount = lineItems.reduce((acc, item) => {
      const taxRate =
        item.taxRate === "GST" ? 0.1 : item.taxRate === "VAT" ? 0.05 : 0
      return acc + (item.quantity * item.unitPrice * taxRate) / (1 + taxRate)
    }, 0)
  }

  // 计算总金额（Total）
  const total =
    amountTaxStatus === "Inclusive" ? subtotal : subtotal + taxAmount

  return (
    <div className="p-4 border-t bg-gray-50 rounded-b-md">
      <div className="grid grid-cols-2 gap-4 text-right">
        <div className="text-gray-700 text-sm font-medium">Subtotal:</div>
        <div className="text-gray-900 font-semibold">
          ${subtotal.toFixed(2)}
        </div>

        <div className="text-gray-700 text-sm font-medium">Tax:</div>
        <div className="text-gray-900 font-semibold">
          ${taxAmount.toFixed(2)}
        </div>

        <div className="text-gray-700 text-sm font-medium text-lg">Total:</div>
        <div className="text-blue-600 text-lg font-bold">
          ${total.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default InvoiceFooter
