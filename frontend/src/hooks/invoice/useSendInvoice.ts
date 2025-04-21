/**
 * @file useSendInvoice.ts - Defines the `useSendInvoice` hook for emailing an invoice to recipients using the Reckon API.
 * * Sends invoice emails via POST request to `/invoices/{id}/email`.
 * * Validates recipient input and handles user feedback through toast notifications.
 */

/**
 * useSendInvoice Hook
 *
 * * Accepts recipient and email content information.
 * * Dynamically injects the current book ID and invoice ID into the API path.
 * * Sends a POST request to the Reckon email endpoint.
 * * On success, displays a toast confirmation.
 * * On failure, displays an error toast.
 *
 * @param {string} invoiceId - The ID of the invoice to be emailed.
 * @returns {UseMutationResult<void, Error, SendInvoiceEmailData>} Mutation result with success/error handling.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { toast } from "sonner"
import { getBookId } from "@/lib/utils"

interface SendInvoiceEmailData {
  toAddresses: string[]
  ccAddresses?: string[]
  bccAddresses?: string[]
  subject: string
  body: string
  documentNumber?: string
}

const useSendInvoice = (invoiceId: string) => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  console.log("Auth API base URL:", authApi.defaults.baseURL)

  return useMutation<void, Error, SendInvoiceEmailData>({
    mutationFn: async (emailData: SendInvoiceEmailData) => {
      if (!emailData.toAddresses || emailData.toAddresses.length === 0) {
        throw new Error("No valid recipient addresses provided.")
      }

      console.log("Sending invoice email with data:", emailData)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.post(
        `/${bookId}/invoices/${invoiceId}/email`,
        emailData
      )

      console.log("Invoice email sent response:", response)
      return response.data
    },
    onSuccess: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Invalidate the invoices query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
      // Also invalidate the specific invoice query
      queryClient.invalidateQueries({ queryKey: ["invoice", invoiceId] })
      toast.success("Invoice sent successfully")
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })
}

export default useSendInvoice
