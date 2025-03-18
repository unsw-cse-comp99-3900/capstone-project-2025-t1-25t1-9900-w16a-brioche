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
import DeleteProductDialog from "./DeleteProductDialog"
import { useNavigate } from "react-router-dom"

import useProducts from "@/hooks/product/useProducts"
import {
  type Product,
  ProductWithPriceGross,
  productWithPriceGrossSchema,
} from "@/types/product"

const ProductTableContainer: React.FC = () => {
  const navigate = useNavigate()

  // State for delete dialog
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean
    productId: string
    productName: string
  }>({
    isOpen: false,
    productId: "",
    productName: "",
  })

  // Fetch all products
  const { data: products = [], isLoading, error } = useProducts()

  // Make priceGross a top-level property
  const transformedProducts = products.map((product) =>
    productWithPriceGrossSchema.parse(product)
  )

  // Update handleEdit to navigate
  const handleEdit = (id: string) => {
    navigate(`/products/${id}/edit`)
  }

  const handleDelete = (product: Product) => {
    setDeleteDialogState({
      isOpen: true,
      productId: product.id,
      productName: product.name,
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
  const columns: ColumnConfig<ProductWithPriceGross>[] = [
    {
      key: "name",
      header: "Name",
      render: (product) => <div className="font-medium">{product.name}</div>,
      sortable: true,
      searchable: true,
      align: "left",
      minWidth: "180px",
    },
    {
      key: "itemType",
      header: "Type",
      render: (product) => <div>{product.itemType || "-"}</div>,
      sortable: true,
      searchable: true,
      align: "left",
      minWidth: "200px",
    },
    {
      key: "status",
      header: "Status",
      render: (product) => (
        <Badge className={getStatusBadge(product.status)}>
          {product.status}
        </Badge>
      ),
      sortable: true,
      searchable: true,
      align: "center",
      width: "120px",
    },
    {
      key: "priceGross",
      header: "Gross sale price",
      render: (product) => (
        <div>
          {new Intl.NumberFormat("en-AU", {
            style: "currency",
            currency: "AUD",
          }).format(product.priceGross)}
        </div>
      ),
      sortable: true,
      align: "right",
      width: "150px",
    },
  ]

  // Define actions with dropdown menu
  const renderActionsDropdown = (product: Product) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-secondary-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEdit(product.id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleDelete(product)}
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
          <h3 className="text-lg font-semibold">Error loading products</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <DataTable
        data={transformedProducts}
        columns={columns}
        keyExtractor={(product) => product.id}
        defaultSortField="name"
        searchPlaceholder="Search products..."
        noDataMessage="No products found."
        renderActions={renderActionsDropdown}
      />

      <DeleteProductDialog
        productId={deleteDialogState.productId}
        productName={deleteDialogState.productName}
        isOpen={deleteDialogState.isOpen}
        onClose={() =>
          setDeleteDialogState({
            isOpen: false,
            productId: "",
            productName: "",
          })
        }
      />
    </>
  )
}

export default ProductTableContainer
