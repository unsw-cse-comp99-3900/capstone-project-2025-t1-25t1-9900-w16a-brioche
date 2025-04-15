/**
 * @file useTestInvoices.ts - Defines the `useInvoices` hook to fetch invoice data from a mock/test endpoint.
 *
 * - Calls `/api/invoices/test` and parses the response using `invoiceResponseSchema`.
 * - Intended for testing or local development without requiring book context or authorization.
 */

/**
 * useInvoices Hook (Test Version)
 *
 * * Fetches invoice list from the test endpoint `/api/invoices/test`.
 * * Parses the response with Zod for type-safe validation.
 * * Uses `tanstack/react-query` for caching and re-fetching behavior.
 * * This version does NOT use auth headers or `bookId`.
 *
 * @returns {UseQueryResult<Invoice[]>} A list of validated invoices from test API.
 */

import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { invoiceResponseSchema, type Invoice } from "@/types/invoice"

/**
 * Custom hook to fetch invoices from the API
 * Uses Zod for runtime validation and type inference
 *
 * @returns The React Query result containing invoices data, loading state, and error
 */
export const useInvoices = () => {
  return useQuery<Invoice[]>({
    queryKey: ["invoicesTest"],
    queryFn: async () => {
      console.log("Fetching invoices from API...")
      const response = await api.get("/api/invoices/test")
      console.log("Raw API response:", response)

      // Parse and validate the response
      const parsedData = invoiceResponseSchema.parse(response)
      console.log("Parsed and validated data:", parsedData)

      // Return the list of invoices
      return parsedData.list
    },
  })
}

export default useInvoices
