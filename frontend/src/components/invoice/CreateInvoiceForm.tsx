import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InvoiceFormHeader from "./InvoiceFormHeader"
import InvoiceLineItems from "./InvoiceLineItems"
import InvoiceFooter from "./InvoiceFooter"
import { invoiceSchema, InvoiceFormData } from "./invoiceSchema"

const CreateInvoiceForm: React.FC<{
  onSubmit: (data: InvoiceFormData, reset: () => void) => void
  paymentTermsOptions: { id: string; name: string }[]
}> = ({ onSubmit, paymentTermsOptions }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer: "",
      invoiceNumber: "",
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      amountTaxStatus: "Inclusive",
      paymentTerms: "",
      reference: "",
      purchaseOrderNumber: "",
      template: "Professional invoice",
      notes: "",
      paymentDetails: "BSB 134-456, Account 987654",
      lineItems: [],
    },
  })

  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          console.log(
            "📢 Submitted invoice data:",
            JSON.stringify(data, null, 2)
          )
          console.log("📢 Submitted paymentTerms):", data.paymentTerms)
          data.lineItems.forEach((item, index) => {
            console.log(`📢 ${index + 1} LineItem:`, item)
            console.log(
              `👉 discountPercent:`,
              typeof item.discountPercent,
              item.discountPercent
            )
            console.log(
              `👉 discountAmount:`,
              typeof item.discountAmount,
              item.discountAmount
            )
          })
          onSubmit(data, reset)
        },
        (errors) => {
          console.error("❌ Form validation failed:", errors)
        }
      )}
      className="bg-white shadow-md rounded-lg p-8 space-y-10"
    >
      {/* Basic Info */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Invoice Information
        </h2>
        <InvoiceFormHeader
          control={control}
          errors={errors}
          paymentTermsOptions={paymentTermsOptions}
        />
      </section>

      {/* Line Items */}
      <section>
        <InvoiceLineItems control={control} errors={errors} />
        <InvoiceFooter control={control} />
      </section>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md shadow-sm hover:bg-gray-400"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700"
        >
          Submit Invoice
        </button>
      </div>
    </form>
  )
}

export default CreateInvoiceForm
