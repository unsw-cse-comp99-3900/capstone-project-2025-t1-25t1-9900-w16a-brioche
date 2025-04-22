import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { type Invoice } from "@/types/invoice"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to update invoice status using the Reckon API
 * Uses React Query mutation and automatically invalidates the invoices query
 * @param invoiceId The ID of the invoice to update
 * @param status The status to set (either "Approve" or "Paid")
 */
const useUpdateInvoiceStatus = (
  invoiceId: string,
  status: "Approve" | "Paid"
) => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation<Invoice, Error, void>({
    mutationFn: async () => {
      console.log(`Updating invoice ${invoiceId} status to: ${status}`)

      // Single line JSON with just the status field
      const patchData = { purchaseOrderNumber: status }

      console.log("Patch data:", patchData)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.patch(
        `/${bookId}/invoices/${invoiceId}`,
        patchData
      )

      console.log("Status update response:", response)

      // Parse and validate the response data
      return response.data
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Invalidate the invoices query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      // Also invalidate the specific invoice query
      queryClient.invalidateQueries({ queryKey: ["invoice", invoiceId] })
    },
  })
}

export default useUpdateInvoiceStatus
