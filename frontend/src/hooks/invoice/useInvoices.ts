/**
 * @file useInvoices.ts - Defines the `useInvoices` hook for retrieving a paginated list of invoices from the Reckon API.
 * * Uses React Query to manage caching, async state, and data refetching.
 * * Validates the API response using a Zod schema to ensure data integrity.
 */

/**
 * useInvoices Hook
 *
 * * Fetches a list of invoices for the current Reckon book.
 * * Supports optional pagination via `page` and `perPage` parameters.
 * * Uses `invoiceResponseSchema` to validate the response format.
 * * Automatically resolves the current `bookId` from local context.
 *
 * @param {number} page - The page number to fetch (default: 1).
 * @param {number} perPage - The number of invoices per page (default: 9999 for all).
 * @returns {UseQueryResult<Invoice[]>} React Query result containing the invoice data, loading and error state.
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { invoiceResponseSchema, type Invoice } from "@/types/invoice"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to fetch invoices from the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param page - The page number to fetch (default: 1)
 * @param perPage - The number of invoices per page (default: 9999 to get all invoices)
 * @returns The React Query result containing invoices data, loading state, and error
 */
export const useInvoices = (page = 1, perPage = 9999) => {
  const authApi = useAuthApi()

  return useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      console.log("Fetching invoices from Reckon API...")

      // Dynamically get the bookId
      const bookId = getBookId()

      // Include the bookId in the endpoint path
      const response = await authApi.get(`/${bookId}/invoices`, {
        params: {
          page,
          perPage,
        },
      })

      console.log("Raw Reckon API response:", response)

      // Parse and validate the response
      const parsedData = invoiceResponseSchema.parse(response)
      console.log("Parsed and validated invoice data:", parsedData)

      // Return the list of invoices
      return parsedData.list
    },
  })
}

export default useInvoices
