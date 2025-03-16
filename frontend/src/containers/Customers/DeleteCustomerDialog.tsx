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
import { useDeleteCustomer } from "@/hooks/useDeleteCustomer"
import { toast } from "sonner"

interface DeleteCustomerDialogProps {
  customerId: string
  customerName: string
  isOpen: boolean
  onClose: () => void
}

const DeleteCustomerDialog: React.FC<DeleteCustomerDialogProps> = ({
  customerId,
  customerName,
  isOpen,
  onClose,
}) => {
  const deleteCustomer = useDeleteCustomer()

  const handleDelete = async () => {
    try {
      await deleteCustomer.mutateAsync(customerId)
      toast.success("Customer deleted successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to delete customer", {
        description: `Error: ${error}`,
      })
      console.error("Error deleting customer:", error)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the customer "{customerName}". This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {deleteCustomer.isPending ? "Deleting..." : "Delete Customer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCustomerDialog
