/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Define types for the DataTable component
export type SortOrder = "asc" | "desc"

export type ColumnConfig<T> = {
  key: string
  header: string
  render: (item: T) => React.ReactNode
  sortable?: boolean
  searchable?: boolean
  align?: "left" | "center" | "right"
  width?: string // Add width option for columns
  minWidth?: string // Add minimum width option
}

export type ActionConfig<T> = {
  label: string
  onClick: (item: T) => void
  className?: string
}

export type DataTableProps<T> = {
  data: T[]
  columns: ColumnConfig<T>[]
  actions?: ActionConfig<T>[]
  renderActions?: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
  defaultSortField?: string
  defaultSortOrder?: SortOrder
  searchPlaceholder?: string
  noDataMessage?: string
  itemsPerPageOptions?: number[]
  defaultItemsPerPage?: number
  onRowClick?: (item: T) => void
}

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

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  renderActions,
  keyExtractor,
  defaultSortField = columns[0]?.key,
  defaultSortOrder = "asc",
  searchPlaceholder = "Search...",
  noDataMessage = "No data found.",
  itemsPerPageOptions = [5, 10, 20, 50],
  defaultItemsPerPage = 5,
  onRowClick,
}: DataTableProps<T>) {
  // State for client-side operations
  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(defaultItemsPerPage)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortField, setSortField] = React.useState<string>(defaultSortField)
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(defaultSortOrder)

  // Get searchable columns
  const searchableColumns = useMemo(
    () => columns.filter((col) => col.searchable),
    [columns]
  )

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    // Apply search filter if there are searchable columns
    if (searchTerm && searchableColumns.length > 0) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter((item) =>
        searchableColumns.some((col) => {
          const value = item[col.key]
          return value && String(value).toLowerCase().includes(searchLower)
        })
      )
    }

    // Apply sorting if sortField is valid
    if (sortField) {
      result.sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        // Handle null/undefined values
        aValue = aValue ?? ""
        bValue = bValue ?? ""

        // Special handling for numeric fields
        if (typeof aValue === "number" || typeof bValue === "number") {
          const aNum = typeof aValue === "number" ? aValue : 0
          const bNum = typeof bValue === "number" ? bValue : 0
          return sortOrder === "asc" ? aNum - bNum : bNum - aNum
        }

        // String comparison for other fields
        const comparison = String(aValue).localeCompare(String(bValue))
        return sortOrder === "asc" ? comparison : -comparison
      })
    }

    return result
  }, [data, searchTerm, sortField, sortOrder, searchableColumns])

  // Apply pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage
    const end = start + perPage
    return filteredAndSortedData.slice(start, end)
  }, [filteredAndSortedData, page, perPage])

  // Calculate total pages
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedData.length / perPage)
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

  // Helper function to get alignment class
  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 py-4">
        {searchableColumns.length > 0 && (
          <div className="flex-1 w-full sm:max-w-sm">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
        )}

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
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-secondary-200 bg-white shadow-md overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary-50">
            <TableRow className="border-b border-secondary-200 hover:bg-secondary-50">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    getAlignmentClass(column.align),
                    "py-4 font-semibold text-secondary-700",
                    column.width ? `w-[${column.width}]` : "",
                    column.minWidth
                      ? `min-w-[${column.minWidth}]`
                      : "min-w-[100px]"
                  )}
                >
                  {column.sortable ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleSortChange(column.key)}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1 h-auto font-semibold hover:bg-secondary-100",
                        column.align === "right" ? "ml-auto" : "",
                        column.align === "center" ? "mx-auto" : ""
                      )}
                    >
                      {column.header}
                      {sortField === column.key && (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            sortOrder === "desc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Button>
                  ) : (
                    <span className="px-2">{column.header}</span>
                  )}
                </TableHead>
              ))}
              {(actions.length > 0 || renderActions) && (
                <TableHead className="w-[80px] text-center py-4 font-semibold text-secondary-700">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={keyExtractor(item)}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  "border-b border-secondary-100 transition-colors",
                  onRowClick && "cursor-pointer hover:bg-secondary-100"
                )}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${keyExtractor(item)}-${column.key}`}
                    className={cn(getAlignmentClass(column.align), "py-3 px-4")}
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
                {(actions.length > 0 || renderActions) && (
                  <TableCell className="text-center py-3 px-4">
                    {renderActions ? (
                      renderActions(item)
                    ) : (
                      <div className="flex justify-center space-x-2">
                        {actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className={action.className}
                            onClick={() => action.onClick(item)}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (actions.length > 0 || renderActions ? 1 : 0)
                  }
                  className="h-32 text-center text-secondary-500"
                >
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-secondary-200 sm:px-6 mt-4 rounded-b-lg shadow-sm">
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
                  filteredAndSortedData.length
                )}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(page * perPage, filteredAndSortedData.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {filteredAndSortedData.length}
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
