import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { invoiceResponseSchema, type Invoice } from "@/types/invoice"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to fetch invoices from the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param page - The page number to fetch (default: 1)
 * @param perPage - The number of invoices per page (default: 9999 to get all invoices)
 * @returns The React Query result containing invoices data, loading state, and error
 */
export const useInvoices = (page = 1, perPage = 9999) => {
  return useQuery<Invoice[], Error, Invoice[]>({
    queryKey: ["invoices"],
    queryFn: async () => {
      console.log("Fetching invoices from Reckon API...")

      // Include the bookId in the endpoint path
      const response = await api.get(`/${Demo_RECKON_BOOK_ID}/invoices`, {
        params: {
          page,
          perPage,
          limit: 9999, // Add explicit limit parameter
        },
      })

      // Parse and validate the response
      const parsedData = invoiceResponseSchema.parse(response)

      // Map the data to ensure all required fields are present and to add UI convenience fields
      const processedInvoices: Invoice[] = parsedData.list.map((invoice) => ({
        // Ensure required fields have default values
        id: invoice.id || String(Math.random()), // Generate a random ID if not provided
        invoiceNumber: invoice.invoiceNumber || "Unknown",

        // Include all other fields from the API
        ...invoice,
      }))

      return processedInvoices
    },
  })
}

export default useInvoices
