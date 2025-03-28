import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
//import { customerResponseSchema } from "@/types/customer" // 直接复用已有的 schema

/**
 * Custom hook to fetch customer names and IDs from the API
 * @param page - The page number to fetch (default: 1)
 * @param perPage - The number of customers per page (default: 0 to get all customers)
 * @returns The React Query result containing all customer data, loading state, and error
 */
export const useBookCustomer = (page = 1, perPage = 9999) => {
  return useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      console.log("Fetching book customer from API...")

      const response = await api.get(`/books`, {
        params: {
          page,
          perPage,
        },
      })

      console.log("Raw API response:", response)

      // Parse and validate the response
      //const parsedData = customerResponseSchema.parse(response.data)
      console.log("Parsed and validated customer data:", response)

      // Return the list of book customers
      return response.list
    },
  })
}

export default useBookCustomer
