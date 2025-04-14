/**
 * @file CustomerTableContainer.tsx - Defines the CustomerTableContainer component, which displays a table of customers.
 * It includes functionality for sorting, searching, and managing customer actions like edit and delete.
 */

/**
 * CustomerTableContainer Component
 *
 * This component renders a table of customers, providing features for sorting, searching, and performing actions such as editing and deleting customers.
 * It handles loading states and error messages.
 *
 * @returns {JSX.Element} The customer table container.
 */

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
import DeleteCustomerDialog from "./DeleteCustomerDialog"
import { useNavigate } from "react-router-dom"

import useCustomers from "@/hooks/customer/useCustomers"
import { type Customer } from "@/types/customer"

const CustomerTableContainer: React.FC = () => {
  const navigate = useNavigate()

  // State for delete dialog
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean
    customerId: string
    customerName: string
  }>({
    isOpen: false,
    customerId: "",
    customerName: "",
  })

  // Fetch all customers
  const { data: customers = [], isLoading, error } = useCustomers()

  // Update handleEdit to navigate
  const handleEdit = (id: string) => {
    navigate(`/customers/${id}/edit`)
  }

  const handleDelete = (customer: Customer) => {
    setDeleteDialogState({
      isOpen: true,
      customerId: customer.id,
      customerName: customer.name,
    })
  }

  // Status badge styles
  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return styles[status as keyof typeof styles] || styles.inactive
  }

  // Define columns for the DataTable
  const columns: ColumnConfig<Customer>[] = [
    {
      key: "name",
      header: "Name",
      render: (customer) => <div className="font-medium">{customer.name}</div>,
      sortable: true,
      searchable: true,
      align: "left",
      minWidth: "180px",
    },
    {
      key: "organisationName",
      header: "Organization",
      render: (customer) => <div>{customer.organisationName || "-"}</div>,
      sortable: true,
      searchable: true,
      align: "left",
      minWidth: "200px",
    },
    {
      key: "status",
      header: "Status",
      render: (customer) => (
        <Badge className={getStatusBadge(customer.status)}>
          {customer.status}
        </Badge>
      ),
      sortable: true,
      searchable: true,
      align: "center",
      width: "120px",
    },
    {
      key: "balance",
      header: "Balance",
      render: (customer) => (
        <div>
          {new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
          }).format(customer.balance || 0)}
        </div>
      ),
      sortable: true,
      align: "right",
      width: "150px",
    },
  ]

  // Define actions with dropdown menu
  const renderActionsDropdown = (customer: Customer) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-secondary-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEdit(customer.id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(customer)}
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
          <h3 className="text-lg font-semibold">Error loading customers</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DataTable
        data={customers}
        columns={columns}
        keyExtractor={(customer) => customer.id}
        defaultSortField="name"
        searchPlaceholder="Search customers..."
        noDataMessage="No customers found."
        renderActions={renderActionsDropdown}
      />

      <DeleteCustomerDialog
        customerId={deleteDialogState.customerId}
        customerName={deleteDialogState.customerName}
        isOpen={deleteDialogState.isOpen}
        onClose={() =>
          setDeleteDialogState({
            isOpen: false,
            customerId: "",
            customerName: "",
          })
        }
      />
    </>
  )
}

export default CustomerTableContainer
