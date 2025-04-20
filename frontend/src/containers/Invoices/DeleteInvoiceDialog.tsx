/**
 * @file DeleteInvoiceDialog.tsx - Defines the DeleteInvoiceDialog component, which provides a confirmation dialog for deleting invoices.
 * It includes logic for handling the deletion process and user feedback.
 */

/**
 * DeleteInvoiceDialog Component
 *
 * This component renders a dialog that asks the user to confirm the deletion of an invoice. It handles the deletion
 * process and provides feedback to the user.
 *
 * @param {DeleteInvoiceDialogProps} props - The properties for the DeleteInvoiceDialog component.
 * @returns {JSX.Element} The delete invoice confirmation dialog.
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
import { useDeleteInvoice } from "@/hooks/invoice/useDeleteInvoice"
import { toast } from "sonner"

interface DeleteInvoiceDialogProps {
  invoiceId: string
  invoiceNumber: string
  isOpen: boolean
  onClose: () => void
}

const DeleteInvoiceDialog: React.FC<DeleteInvoiceDialogProps> = ({
  invoiceId,
  invoiceNumber,
  isOpen,
  onClose,
}) => {
  const deleteInvoice = useDeleteInvoice()

  const handleDelete = async () => {
    try {
      await deleteInvoice.mutateAsync(invoiceId)
      toast.success("Invoice deleted successfully")
      onClose()
    } catch (
      error: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
      let errorMessage = "Failed to delete invoice."

      const backendMessage = error?.response?.data?.message
      if (backendMessage) {
        errorMessage = Array.isArray(backendMessage)
          ? backendMessage.join("; ")
          : backendMessage
      } else if (error?.message) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else {
        errorMessage = JSON.stringify(error)
      }

      toast.error("Failed to delete invoice", {
        description: errorMessage,
      })
      console.error("Error deleting invoice:", error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete invoice "{invoiceNumber}". This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {deleteInvoice.isPending ? "Deleting..." : "Delete Invoice"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteInvoiceDialog
