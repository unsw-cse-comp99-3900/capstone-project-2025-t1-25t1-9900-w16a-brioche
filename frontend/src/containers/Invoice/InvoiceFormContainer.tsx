import React from "react"
import CreateInvoiceForm from "@/components/invoice/CreateInvoiceForm"
import { InvoiceFormData } from "../../components/invoice/invoiceSchema"

const InvoiceFormContainer: React.FC = () => {
  const handleSubmit = (data: InvoiceFormData) => {
    const { lineItems, amountTaxStatus } = data

    // subtotal
    const subtotal = lineItems.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    )

    // taxAmount
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

    // total
    const total =
      amountTaxStatus === "Inclusive" ? subtotal : subtotal + taxAmount

    // new data
    const updatedData = {
      ...data,
      subtotal: subtotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
    }
    console.log("✅ 模拟提交成功:", updatedData)
    localStorage.setItem("mockInvoice", JSON.stringify(updatedData))
    alert("Invoice saved successfully (mock)!")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
      </header>
      <main className="bg-white shadow-md rounded-lg p-6">
        <CreateInvoiceForm onSubmit={handleSubmit} />
      </main>
    </div>
  )
}

export default InvoiceFormContainer
