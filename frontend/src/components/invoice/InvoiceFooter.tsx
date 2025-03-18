import React from "react"
import { useWatch, Control } from "react-hook-form"
import { InvoiceFormData } from "./invoiceSchema"

interface InvoiceFooterProps {
  control: Control<InvoiceFormData>
}

const InvoiceFooter: React.FC<InvoiceFooterProps> = ({ control }) => {
  const lineItems = useWatch({ control, name: "lineItems" }) || []
  const amountTaxStatus =
    useWatch({ control, name: "amountTaxStatus" }) || "NonTaxed"

  const subtotal = lineItems.reduce((acc, item) => {
    const unitPrice = Number(item.unitPrice) || 0
    const quantity = Number(item.quantity) || 0
    return acc + unitPrice * quantity
  }, 0)

  const taxAmount = lineItems.reduce((acc, item) => {
    const unitPrice = Number(item.unitPrice) || 0
    const quantity = Number(item.quantity) || 0
    const taxRate = Number(item.taxRate) || 0

    return amountTaxStatus === "Inclusive"
      ? acc + (unitPrice * quantity * taxRate) / (1 + taxRate)
      : acc + unitPrice * quantity * taxRate
  }, 0)

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
