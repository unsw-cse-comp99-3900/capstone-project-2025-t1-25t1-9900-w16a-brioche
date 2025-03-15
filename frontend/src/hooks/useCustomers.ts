import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { customerResponseSchema, type Customer } from "@/types/customer"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to fetch customers from the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param page - The page number to fetch (default: 1)
 * @param perPage - The number of customers per page (default: 0 to get all customers)
 * @returns The React Query result containing customers data, loading state, and error
 */
export const useCustomers = (page = 1, perPage = 0) => {
  return useQuery<Customer[]>({
    queryKey: ["customers", page, perPage],
    queryFn: async () => {
      console.log("Fetching customers from Reckon API...")

      // Include the bookId in the endpoint path
      const response = await api.get(`/${Demo_RECKON_BOOK_ID}/customers`, {
        params: {
          page,
          perPage,
        },
      })

      console.log("Raw Reckon API response:", response)

      // Parse and validate the response
      const parsedData = customerResponseSchema.parse(response)
      console.log("Parsed and validated customer data:", parsedData)

      // Return the list of customers
      return parsedData.list
    },
  })
}

export default useCustomers
