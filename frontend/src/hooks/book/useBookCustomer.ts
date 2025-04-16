/**
 * @file useBookCustomer.ts - Defines the `useBookCustomer` hook for fetching customer books from the Reckon API.
 * * Uses React Query for async data fetching and caching.
 * * Validates the response using Zod schema for runtime safety.
 * * Suitable for rendering book selection lists or managing customer-book associations.
 */

/**
 * useBookCustomer Hook
 *
 * * Fetches a paginated list of customer books using an authenticated GET request to `/books`.
 * * Parses and validates the response using a Zod schema (`customerBooksResponseSchema`).
 * * Intended to support book-switching functionality in multi-book Reckon integrations.
 *
 * @param {number} page - The page number to fetch (default: 1).
 * @param {number} perPage - Number of customer books per page (default: 9999 for fetching all).
 * @returns {UseQueryResult<CustomerBook[]>} - React Query result with data, loading, and error state.
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { CustomerBook, customerBooksResponseSchema } from "@/types/customer"

export const useBookCustomer = (page = 1, perPage = 9999) => {
  const authApi = useAuthApi()

  return useQuery<CustomerBook[]>({
    queryKey: ["books"],
    queryFn: async () => {
      console.log("Fetching book customer from API...")

      // Fetch API response
      const response = await authApi.get("/books", {
        params: {
          page,
          perPage,
        },
      })

      const customerBooks = customerBooksResponseSchema.parse(response)
      console.log("response:", response)
      console.log("customerBooks:", customerBooksResponseSchema)

      return customerBooks.list
    },
  })
}

export default useBookCustomer
