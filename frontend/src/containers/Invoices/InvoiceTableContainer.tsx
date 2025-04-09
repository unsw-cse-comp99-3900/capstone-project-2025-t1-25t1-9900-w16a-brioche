import React, { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable, type ColumnConfig } from "@/components/ui/data-table"
import DeleteInvoiceDialog from "./DeleteInvoiceDialog"
import { useNavigate } from "react-router-dom"

import useInvoices from "@/hooks/invoice/useInvoices"
import {
  InvoiceStatus,
  type Invoice,
  invoiceTopLevelSchema,
  type InvoiceTopLevel,
} from "@/types/invoice"

const InvoiceTableContainer: React.FC = () => {
  const navigate = useNavigate()

  // State for delete dialog
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean
    invoiceId: string
    invoiceNumber: string
  }>({
    isOpen: false,
    invoiceId: "",
    invoiceNumber: "",
  })

  // Fetch all invoices
  const { data: invoices = [], isLoading, error } = useInvoices()

  // Use the transformed schema to promote nested fields to top-level properties for the table
  const transformedInvoices = invoices.map((invoice) =>
    invoiceTopLevelSchema.parse(invoice)
  ) as InvoiceTopLevel[]

  // Update handleEdit to navigate
  const handleEdit = (id: string) => {
    navigate(`/invoices/${id}/edit`)
  }

  const handleDelete = (invoice: Invoice) => {
    setDeleteDialogState({
      isOpen: true,
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
    })
  }

  // Status badge styles
  const getStatusBadge = (status: string) => {
    const styles = {
      Paid: "bg-green-100 text-green-800",
      // Draft: "bg-gray-100 text-gray-800",
      Overdue: "bg-red-100 text-red-800",
      Unpaid: "bg-yellow-100 text-yellow-800",
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  //email status badge styles
  const getEmailStatusBadge = (status: string) => {
    const styles = {
      Sented: "bg-green-100 text-green-800",
      Unsent: "bg-orange-100 text-orange-800",
    }
    return styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800"
  }

  // Define columns for the DataTable
  const columns: ColumnConfig<InvoiceTopLevel>[] = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      render: (invoice) => (
        <div className="font-medium">{invoice.invoiceNumber}</div>
      ),
      sortable: true,
      searchable: true,
      align: "left",
      width: "120px",
    },
    {
      key: "customerName",
      header: "Customer",
      render: (invoice) => <div>{invoice.customerName}</div>,
      sortable: true,
      searchable: true,
      align: "left",
      minWidth: "180px",
    },
    {
      key: "status",
      header: "Status",
      render: (invoice) => {
        let computedStatus = ""
        if (invoice.status === InvoiceStatus.Paid) {
          computedStatus = "Paid"
        } else if (invoice.dueDate) {
          const dueDate = new Date(invoice.dueDate)
          computedStatus = dueDate < new Date() ? "Overdue" : "Unpaid"
        } else {
          computedStatus = "Unpaid"
        }
        return (
          <Badge className={getStatusBadge(computedStatus)}>
            {computedStatus}
          </Badge>
        )
      },
      sortable: true,
      searchable: true,
      align: "center",
      width: "120px",
    },
    {
      key: "emailStatus",
      header: "Email Status",
      render: (invoice) => {
        let computedEmailStatus = invoice.emailStatus || "-"
        if (computedEmailStatus.toLowerCase() === "sent") {
          computedEmailStatus = "Sented"
        }
        return (
          <Badge className={getEmailStatusBadge(computedEmailStatus)}>
            {computedEmailStatus}
          </Badge>
        )
      },
      sortable: true,
      searchable: true,
      align: "center",
      width: "120px",
    },
    {
      key: "invoiceDate",
      header: "Date",
      render: (invoice) => <div>{invoice.invoiceDate || "-"}</div>,
      sortable: true,
      align: "center",
      width: "120px",
    },
    {
      key: "totalAmount",
      header: "Amount",
      render: (invoice) => (
        <div>
          {new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
          }).format(invoice.totalAmount || 0)}
        </div>
      ),
      sortable: true,
      align: "right",
      width: "150px",
    },
  ]

  // Define actions with dropdown menu
  const renderActionsDropdown = (invoice: Invoice) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-secondary-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleEdit(invoice.id)
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/invoices/${invoice.id}/view`)
          }}
        >
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
            handleDelete(invoice)
          }}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600 text-center">
          <h3 className="text-lg font-semibold">Error loading invoices</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DataTable
        data={transformedInvoices}
        columns={columns}
        keyExtractor={(invoice) => invoice.id}
        defaultSortField="date"
        searchPlaceholder="Search invoices..."
        noDataMessage="No invoices found."
        renderActions={renderActionsDropdown}
        onRowClick={(invoice) => navigate(`/invoices/${invoice.id}/view`)}
      />

      <DeleteInvoiceDialog
        invoiceId={deleteDialogState.invoiceId}
        invoiceNumber={deleteDialogState.invoiceNumber}
        isOpen={deleteDialogState.isOpen}
        onClose={() =>
          setDeleteDialogState({
            isOpen: false,
            invoiceId: "",
            invoiceNumber: "",
          })
        }
      />
    </>
  )
}

export default InvoiceTableContainer
