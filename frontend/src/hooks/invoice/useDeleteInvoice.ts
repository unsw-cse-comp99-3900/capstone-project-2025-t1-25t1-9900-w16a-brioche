/**
 * @file useDeleteInvoice.ts - Defines the `useDeleteInvoice` hook for deleting an invoice through the Reckon API.
 * * Utilizes React Query's mutation API to perform the delete operation.
 * * Automatically triggers a refetch of the invoice list upon successful deletion.
 */

/**
 * useDeleteInvoice Hook
 *
 * * Sends an authenticated DELETE request to remove an invoice from the Reckon system.
 * * Dynamically injects the current book ID into the API path.
 * * On success, invalidates the `invoices` query to ensure UI updates correctly.
 *
 * @returns {UseMutationResult<boolean, Error, string>} Mutation object for handling deletion state and effects.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/lib/utils"

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.delete(`/${bookId}/invoices/${invoiceId}`)
      return response.status === 204
    },
    onSuccess: async () => {
      // Invalidate and refetch invoices list
      await new Promise((resolve) => setTimeout(resolve, 500))
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      console.log("Invoices query invalidated successfully.")
    },
  })
}

export default useDeleteInvoice
