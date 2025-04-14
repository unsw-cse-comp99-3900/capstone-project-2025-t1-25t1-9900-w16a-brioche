/**
 * @file DeleteProductDialog.tsx - Dialog component for confirming product deletion
 *
 * This component provides a confirmation dialog when deleting products. It includes:
 * - A warning message with the product name
 * - Confirmation and cancel buttons
 * - Error handling and success notifications
 */

/**
 * DeleteProductDialog Component
 *
 * A dialog component that handles the product deletion confirmation flow.
 * It displays a warning message and manages the deletion process through an API call.
 *
 * @param {Object} props Component props
 * @param {string} props.productId - ID of the product to be deleted
 * @param {string} props.productName - Name of the product to be deleted
 * @param {boolean} props.isOpen - Controls dialog visibility
 * @param {() => void} props.onClose - Callback function to close the dialog
 * @returns {JSX.Element} The delete confirmation dialog
 */

import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteProduct } from "@/hooks/product/useDeleteProduct"
import { toast } from "sonner"

interface DeleteProductDialogProps {
  productId: string
  productName: string
  isOpen: boolean
  onClose: () => void
}

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({
  productId,
  productName,
  isOpen,
  onClose,
}) => {
  const deleteProduct = useDeleteProduct()

  const handleDelete = async () => {
    try {
      await deleteProduct.mutateAsync(productId)
      toast.success("Product deleted successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to delete product", {
        description: `Error: ${error}`,
      })
      console.error("Error deleting product:", error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the product "{productName}". This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {deleteProduct.isPending ? "Deleting..." : "Delete Product"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteProductDialog
