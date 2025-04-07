import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { invoiceSchema, type Invoice } from "@/types/invoice"
import { getBookId } from "@/constants/config"

/**
 * Custom hook to fetch a single invoice by ID from the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param id - The invoice ID to fetch
 * @returns The React Query result containing invoice data, loading state, and error
 */
const useInvoice = (invoiceId: string) => {
  const authApi = useAuthApi()
  return useQuery<Invoice>({
    queryKey: ["invoice", invoiceId],
    queryFn: async () => {
      if (!invoiceId) {
        throw new Error("Invoice ID is required")
      }

      console.log(`Fetching invoice ${invoiceId} from Reckon API...`)

      // Dynamically get the bookId
      const bookId = getBookId()

      // Include the bookId in the endpoint path
      const response = await authApi.get(`/${bookId}/invoices/${invoiceId}`)

      console.log("Raw invoice API response:", response)

      // Parse and validate the response
      const parsedData = invoiceSchema.parse(response)
      console.log("Parsed and validated invoice data:", parsedData)

      return parsedData
    },
    // Don't attempt to fetch with an empty ID
    enabled: !!invoiceId,
  })
}

export default useInvoice
