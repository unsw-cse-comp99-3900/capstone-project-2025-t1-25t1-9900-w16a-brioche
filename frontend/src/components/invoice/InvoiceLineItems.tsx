import React from "react"
import { useFieldArray, Control, FieldErrors } from "react-hook-form"
import LineItemRow from "./LineItemRow"
import { InvoiceFormData } from "./invoiceSchema"

interface InvoiceLineItemsProps {
  control: Control<InvoiceFormData>
  errors: FieldErrors<InvoiceFormData>
}

const InvoiceLineItems: React.FC<InvoiceLineItemsProps> = ({ control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  })

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Line Items <span className="text-red-500">*</span>
      </h3>

      <div className="mt-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-9 bg-gray-100 px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
          <span>#</span>
          <span>Service Date</span>
          <span>Description</span>
          <span>Quantity</span>
          <span>Unit Price</span>
          <span>Discount</span>
          <span>Tax Rate</span>
          <span>Amount</span>
          <span className="text-center">Actions</span>
        </div>

        <div className="divide-y divide-gray-200">
          {fields.map((item, index) => (
            <LineItemRow
              key={item.id}
              index={index}
              control={control}
              remove={remove}
            />
          ))}
        </div>

        <div className="flex justify-end bg-gray-50 px-4 py-3">
          <button
            type="button"
            onClick={() =>
              append({
                lineNumber: fields.length + 1,
                serviceDate: "",
                project: "",
                description: "",
                quantity: 1,
                unitPrice: 0,
                taxRate: "",
                taxAmount: 0,
                discountPercent: 0,
                discountAmount: 0,
                itemDetails: { item: "Installation" },
                isFullWidthDescription: false,
              })
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200 hover:bg-blue-700"
          >
            + Add Line Item
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceLineItems
