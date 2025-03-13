import React from "react"
import useInvoices from "@/hooks/useInvoices"
import { format } from "date-fns"
import type { Invoice, InvoiceStatus } from "@/types/invoice"

const StatusBadge: React.FC<{ status: InvoiceStatus }> = ({ status }) => {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PAID: "bg-green-100 text-green-800",
    OVERDUE: "bg-red-100 text-red-800",
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {status}
    </span>
  )
}

const InvoiceCard: React.FC<{ invoice: Invoice }> = ({ invoice }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{invoice.invoiceNumber}</h3>
          <p className="text-gray-500">ID: {invoice.id}</p>
        </div>
        <StatusBadge status={invoice.status as InvoiceStatus} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-medium">${invoice.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">
            {format(new Date(invoice.date), "MMM dd, yyyy")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="font-medium">
            {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  )
}

const InvoiceTestPage: React.FC = () => {
  const { data: invoices, isLoading, isError, error, refetch } = useInvoices()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-red-800 font-medium">Error</h2>
          <p className="text-red-600">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {(error as any)?.message || "Unknown error occurred"}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Invoice Test Page
          </h1>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh Data
          </button>
        </div>

        {/* Debug Information */}
        <div className="mb-8 bg-gray-800 text-white p-4 rounded-lg overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Debug Info</h2>
          <pre className="text-sm">{JSON.stringify({ invoices }, null, 2)}</pre>
        </div>

        {/* Invoices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invoices?.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>

        {/* No Data State */}
        {(!invoices || invoices.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoiceTestPage
