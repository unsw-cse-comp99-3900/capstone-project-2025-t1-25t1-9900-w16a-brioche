/**
 * @file usePaymentTerms.ts - Defines the `usePaymentTerms` hook for retrieving available payment terms from the Reckon API.
 * * Fetches `/terms` endpoint scoped to the current book.
 * * Validates the response using Zod (`paymentTermsResponseSchema`) for type safety.
 * * Filters out inactive or non-invoice-eligible terms.
 */

/**
 * usePaymentTerms Hook
 *
 * * Sends a GET request to fetch all available payment terms for the current book.
 * * Parses and validates the response using a Zod schema.
 * * Filters the result to only return payment terms that are:
 *   - Active (`status === "Active"`)
 *   - Intended for invoices (`useForInvoice === true`)
 *
 * @returns {UseQueryResult<PaymentTerm[]>} A list of validated, filtered payment terms.
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/lib/utils"
import { PaymentTerm } from "@/types/payment"
import { paymentTermsResponseSchema } from "@/types/payment"

export const usePaymentTerms = () => {
  const authApi = useAuthApi()

  return useQuery<PaymentTerm[]>({
    queryKey: ["payment-terms"],
    queryFn: async () => {
      console.log("Fetching payment terms from API...")

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.get(`/${bookId}/terms`)

      console.log(" API Full Response:", response)
      console.log(" API response.data:", response.data)

      const parsedData = paymentTermsResponseSchema.safeParse(response)

      if (!parsedData.success) {
        console.error(" Zod validation failed:", parsedData.error)
        return []
      }

      console.log(" Parsed and validated payment terms:", parsedData.data.list)

      if (!parsedData.data.list.length) {
        console.warn("⚠️ No payment terms returned from API")
      }

      return parsedData.data.list.filter(
        (term) => term.status === "Active" && term.useForInvoice
      )
    },
  })
}

export default usePaymentTerms
