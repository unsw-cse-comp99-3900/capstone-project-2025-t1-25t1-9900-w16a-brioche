import React from "react"
import useInvoices from "@/hooks/useInvoices"
import type { Invoice } from "@/types/invoice"

/**
 * Component that displays a list of invoices
 * Demonstrates the use of the useInvoices hook with React Query
 */
const InvoiceList: React.FC = () => {
  const { data: invoices, isLoading, isError, error } = useInvoices()

  if (isLoading) {
    return <div>Loading invoices...</div>
  }

  if (isError) {
    return (
      <div>
        Error loading invoices: {(error as any)?.message || "Unknown error"}
      </div>
    )
  }

  return (
    <div className="invoice-list">
      <h2>Invoices</h2>
      {invoices && invoices.length > 0 ? (
        <ul>
          {invoices.map((invoice: Invoice) => (
            <li key={invoice.id}>
              <strong>{invoice.invoiceNumber}</strong> - $
              {invoice.amount.toFixed(2)}
              <span className={`status status-${invoice.status.toLowerCase()}`}>
                {invoice.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No invoices found</p>
      )}
    </div>
  )
}

export default InvoiceList
