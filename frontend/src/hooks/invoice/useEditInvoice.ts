/**
 * @file useEditInvoice.ts - Defines the `useEditInvoice` hook for updating an existing invoice via the Reckon API.
 * * Uses React Query's mutation API to manage async state.
 * * Converts user input via schema transformation and sends a PUT request.
 * * Invalidates both the invoice list and specific invoice detail queries on success.
 */

/**
 * useEditInvoice Hook
 *
 * * Sends a PUT request to update invoice details for a given invoice ID.
 * * Uses Zod schema transformer (`formToApiSchema`) to shape data into API format.
 * * Injects the bookId dynamically based on local session state.
 * * On success, triggers:
 *   - A refetch of the entire invoice list (`["invoices"]`)
 *   - A refetch of the updated invoice detail (`["invoice", invoiceId]`)
 *
 * @param {string} invoiceId - The ID of the invoice to update.
 * @returns {UseMutationResult<Invoice, Error, InvoiceFormValues>} React Query mutation result with state and handlers.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import {
  type Invoice,
  type InvoiceFormValues,
  formToApiSchema,
} from "@/types/invoice"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to edit an existing invoice using the Reckon API
 * Uses React Query mutation and automatically invalidates the invoices query
 */
const useEditInvoice = (invoiceId: string) => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation<Invoice, Error, InvoiceFormValues>({
    mutationFn: async (data: InvoiceFormValues) => {
      console.log("Updating invoice with data:", data)

      // Transform form data to API structure
      const apiData = formToApiSchema(data)

      console.log("API request data:", apiData)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.put(
        `/${bookId}/invoices/${invoiceId}`,
        apiData
      )

      console.log("Update invoice response:", response)

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

export default useEditInvoice
