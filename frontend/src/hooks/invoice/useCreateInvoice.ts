import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import {
  type InvoiceFormData,
  apiRequestSchema,
  createInvoiceResponseSchema,
} from "@/components/invoice/invoiceSchema"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to create an invoice using the Reckon API
 * Uses React Query mutation and automatically invalidates the invoices query
 */
export const useCreateInvoice = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: InvoiceFormData) => {
      console.log("📢 Invoices are being created:", data)

      if (!data.customer) {
        throw new Error("Customer ID is required")
      }

      const apiData = apiRequestSchema.parse({
        ...data,
        customer: data.customer,
      })

      const response = await api.post(
        `/${Demo_RECKON_BOOK_ID}/invoices`,
        apiData
      )

      console.log("Create Invoice Successfully:", response.data)

      return createInvoiceResponseSchema.parse(response)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
    },
  })
}

export default useCreateInvoice
