import React, { useMemo } from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import useCustomers from "@/hooks/useCustomers"
import { type Customer } from "@/types/customer"

const ITEMS_PER_PAGE = 5
const SIBLING_COUNT = 1

function generatePagination(currentPage: number, totalPages: number) {
  const pages: (number | "...")[] = []

  // Always show first page
  pages.push(1)

  // Calculate range for middle pages
  const start = Math.max(2, currentPage - SIBLING_COUNT)
  const end = Math.min(totalPages - 1, currentPage + SIBLING_COUNT)

  // Add ellipsis after first page if needed
  if (start > 2) {
    pages.push("...")
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Add ellipsis before last page if needed
  if (end < totalPages - 1) {
    pages.push("...")
  }

  // Always show last page if there is more than one page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}

const CustomersPage: React.FC = () => {
  // State for client-side operations
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(ITEMS_PER_PAGE)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortField, setSortField] = React.useState<string>("name")
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")

  // Dummy action handlers
  const handleEdit = (id: string) => {
    console.log("Edit customer:", id)
    // Implement edit functionality here
  }

  const handleDelete = (id: string) => {
    console.log("Delete customer:", id)
    // Implement delete functionality here (e.g., confirmation dialog)
  }

  // Fetch all customers
  const { data: allCustomers = [], isLoading, error } = useCustomers()

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...allCustomers]

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchLower) ||
          customer.organisationName?.toLowerCase().includes(searchLower) ||
          customer.status.toLowerCase().includes(searchLower)
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue = a[sortField as keyof Customer]
      let bValue = b[sortField as keyof Customer]

      // Handle null/undefined values
      aValue = aValue ?? ""
      bValue = bValue ?? ""

      // Special handling for balance (numeric) field
      if (sortField === "balance") {
        const aNum = typeof aValue === "number" ? aValue : 0
        const bNum = typeof bValue === "number" ? bValue : 0
        return sortOrder === "asc" ? aNum - bNum : bNum - aNum
      }

      // String comparison for other fields
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortOrder === "asc" ? comparison : -comparison
    })

    return result
  }, [allCustomers, searchTerm, sortField, sortOrder])

  // Apply pagination
  const paginatedCustomers = useMemo(() => {
    const start = (page - 1) * perPage
    const end = start + perPage
    return filteredAndSortedCustomers.slice(start, end)
  }, [filteredAndSortedCustomers, page, perPage])

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedCustomers.length / perPage)
  )
  const paginationRange = generatePagination(page, totalPages)

  // Handle sort change
  const handleSortChange = (field: string) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
    // Reset to first page when sorting changes
    setPage(1)
  }

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    // Reset to first page when search changes
    setPage(1)
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600 text-center">
          <h3 className="text-lg font-semibold">Error loading customers</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-900">Customers</h1>
        <p className="mt-2 text-secondary-600">
          Manage your customer information and view their details.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        <div className="flex-1 w-full sm:max-w-sm">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Select
            value={String(perPage)}
            onValueChange={(value) => {
              setPerPage(Number(value))
              setPage(1) // Reset to first page when changing items per page
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white">
            Add Customer
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-secondary-200 bg-white shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange("name")}
                  className="flex items-center gap-2"
                >
                  Name
                  {sortField === "name" && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange("organisationName")}
                  className="flex items-center gap-2"
                >
                  Organization
                  {sortField === "organisationName" && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange("status")}
                  className="flex items-center gap-2"
                >
                  Status
                  {sortField === "status" && (
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSortChange("balance")}
                  className="flex items-center gap-2 ml-auto"
                >
                  Balance
                  {sortField === "balance" && (
                    <ChevronUp
                      className={`h-4 w-4 transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                    />
                  )}
                </Button>
              </TableHead>
              <TableHead className="w-[50px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-secondary-50">
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.organisationName || "-"}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(customer.status)}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("en-AU", {
                    style: "currency",
                    currency: "AUD",
                  }).format(customer.balance || 0)}
                </TableCell>
                <TableCell className="text-center">
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
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {paginatedCustomers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-secondary-500"
                >
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-secondary-200 sm:px-6 mt-4 rounded-b-lg">
        {/* Mobile pagination */}
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page <= 1}
            className="relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page >= totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-secondary-300 text-sm font-medium rounded-md text-secondary-700 bg-white hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>

        {/* Desktop pagination */}
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-secondary-700">
              Showing{" "}
              <span className="font-medium">
                {Math.min(
                  (page - 1) * perPage + 1,
                  filteredAndSortedCustomers.length
                )}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * perPage, filteredAndSortedCustomers.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {filteredAndSortedCustomers.length}
              </span>{" "}
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              {/* Previous Page */}
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page <= 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-secondary-300 bg-white text-sm font-medium text-secondary-500 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Page Numbers */}
              {paginationRange.map((pageNum, idx) => {
                if (pageNum === "...") {
                  return (
                    <span
                      key={idx}
                      className="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700"
                    >
                      ...
                    </span>
                  )
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setPage(pageNum as number)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === pageNum
                        ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                        : "bg-white border-secondary-300 text-secondary-500 hover:bg-secondary-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {/* Next Page */}
              <button
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page >= totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-secondary-300 bg-white text-sm font-medium text-secondary-500 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage
