import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { accountResponseSchema, type Account } from "@/types/account"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to fetch accounts from the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param page - The page number to fetch (default: 1)
 * @param perPage - The number of accounts per page (default: 9999 to get all accounts)
 * @returns The React Query result containing accounts data, loading state, and error
 */
export const useAccounts = (page = 1, perPage = 9999) => {
  return useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: async () => {
      console.log("Fetching accounts from Reckon API...")

      // Include the bookId in the endpoint path
      const response = await api.get(`/${Demo_RECKON_BOOK_ID}/ledgeraccounts`, {
        params: {
          page,
          perPage,
        },
      })

      console.log("Raw Reckon API response:", response)

      // Parse and validate the response
      const parsedData = accountResponseSchema.parse(response)
      console.log("Parsed and validated account data:", parsedData)

      // Return the list of accounts
      return parsedData.list
    },
  })
}

export default useAccounts
