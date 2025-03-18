import React from "react"
import CreateInvoiceForm from "@/components/invoice/CreateInvoiceForm"
import { InvoiceFormData } from "../../components/invoice/invoiceSchema"
import { useCreateInvoice } from "@/hooks/invoice/useCreateInvoice"
import { toast } from "sonner"

const STATIC_PAYMENT_TERMS = [
  { id: "c32080a9-4cfe-ef11-a9a0-02f5def8fefd", name: "Due on Receipt" },
  { id: "c22080a9-4cfe-ef11-a9a0-02f5def8fefd", name: "Net 15" },
  { id: "c42080a9-4cfe-ef11-a9a0-02f5def8fefd", name: "Net 30" },
]

export const TAX_RATES = [
  { id: "d31e80a9-4cfe-ef11-a9a0-02f5def8fefd", name: "GST", percent: 10 },
  { id: "e41e80a9-4cfe-ef11-a9a0-02f5def8fefd", name: "VAT", percent: 5 },
]

const InvoiceFormContainer: React.FC = () => {
  const createInvoice = useCreateInvoice() // API Hook

  const handleSubmit = async (data: InvoiceFormData, reset: () => void) => {
    console.log("📢 Submitted Data:", JSON.stringify(data, null, 2))
    console.log("The Customer value of the submission:", data.customer)

    try {
      const formattedData = {
        ...data,
        paymentTerms:
          STATIC_PAYMENT_TERMS.find((pt) => pt.name === data.paymentTerms)
            ?.id || "",

        lineItems: data.lineItems.map((item) => ({
          lineNumber: item.lineNumber,
          serviceDate: item.serviceDate,
          itemDetails: item.itemDetails || undefined,
          accountDetails: item.accountDetails || undefined,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discountPercent: item.discountPercent || 0,
          discountAmount: item.discountAmount || 0,
          taxAmount: item.taxRate ? item.taxAmount || 0 : undefined,
          taxRate: item.taxRate ? item.taxRate : undefined,
        })),
      }

      console.log("📢 Invoices are being submitted:", formattedData)
      await createInvoice.mutateAsync(formattedData)

      toast.success("✅ Invoice created successfully!")
      reset()
    } catch (error) {
      if (error instanceof Error) {
        toast.error("❌ Failed to create invoice", {
          description: `Error: ${error.message}`,
        })
        console.error("❌ Failed to create invoice:", error)
      } else {
        toast.error("❌ Failed to create invoice", {
          description: "An unknown error occurred",
        })
        console.error(
          "❌ Failed to create invoice (An unknown error occurred):",
          error
        )
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
      </header>
      <main className="bg-white shadow-md rounded-lg p-6">
        <CreateInvoiceForm
          onSubmit={handleSubmit}
          paymentTermsOptions={STATIC_PAYMENT_TERMS}
        />
      </main>
    </div>
  )
}

export default InvoiceFormContainer
