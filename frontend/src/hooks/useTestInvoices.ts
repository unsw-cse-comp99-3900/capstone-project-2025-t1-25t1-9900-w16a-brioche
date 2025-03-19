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
