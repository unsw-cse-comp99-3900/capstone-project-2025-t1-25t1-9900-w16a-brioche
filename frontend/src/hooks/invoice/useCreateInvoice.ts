import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import {
  type Invoice,
  type InvoiceFormValues,
  formToApiSchema,
} from "@/types/invoice"
import { getBookId } from "@/constants/config"

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
    onSuccess: () => {
      // Invalidate the invoices query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
    },
  })
}

export default useCreateInvoice
