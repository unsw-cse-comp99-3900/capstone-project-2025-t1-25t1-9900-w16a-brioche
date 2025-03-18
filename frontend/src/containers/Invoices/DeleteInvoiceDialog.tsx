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
    } catch (error) {
      toast.error("Failed to delete invoice", {
        description: `Error: ${error}`,
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
