/**
 * @file useCreateInvoice.ts - Defines the `useCreateInvoice` hook for submitting a new invoice to the Reckon API.
 * * Uses React Query's mutation API to handle the invoice creation process.
 * * Transforms form input to API format using `formToApiSchema`.
 * * Automatically triggers a refetch of the invoice list on successful creation.
 */

/**
 * useCreateInvoice Hook
 *
 * * Sends a POST request to the Reckon API to create a new invoice.
 * * Converts form input to the API structure via a helper transformer (`formToApiSchema`).
 * * Dynamically inserts the book ID based on current session context.
 * * On success, invalidates the `invoices` query to refresh the invoice table.
 *
 * @returns {UseMutationResult<Invoice, Error, InvoiceFormValues>} Mutation result object containing mutate, state, and error fields.
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
 * Custom hook to create an invoice using the Reckon API
 * Uses React Query mutation and automatically invalidates the invoices query
 */
export const useCreateInvoice = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation<Invoice, Error, InvoiceFormValues>({
    mutationFn: async (data: InvoiceFormValues) => {
      console.log("Creating invoice with data:", data)

      // Transform form data to API structure
      const apiData = formToApiSchema(data)

      console.log("API request data:", apiData)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.post(`/${bookId}/invoices`, apiData)

      console.log("Create invoice response:", response)

      // Parse and validate the response data
      return response.data
    },
    onSuccess: async () => {
      // Invalidate the invoices query to refetch the list
      await new Promise((resolve) => setTimeout(resolve, 1000))
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      console.log("Invoices list invalidated")
    },
  })
}

export default useCreateInvoice
