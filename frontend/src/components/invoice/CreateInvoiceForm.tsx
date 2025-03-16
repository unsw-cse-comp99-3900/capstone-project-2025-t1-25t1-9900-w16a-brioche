import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InvoiceFormHeader from "./InvoiceFormHeader"
import InvoiceLineItems from "./InvoiceLineItems"
import InvoiceFooter from "./InvoiceFooter"
import { invoiceSchema, InvoiceFormData } from "./invoiceSchema"

const CreateInvoiceForm: React.FC<{
  onSubmit: (data: InvoiceFormData) => void
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md rounded-lg p-8 space-y-10"
    >
      {/* basic information part */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Invoice Information
        </h2>
        <InvoiceFormHeader control={control} errors={errors} />
      </section>

      {/* line item part */}
      <section>
        <InvoiceLineItems control={control} errors={errors} />
        <InvoiceFooter control={control} />
      </section>

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
