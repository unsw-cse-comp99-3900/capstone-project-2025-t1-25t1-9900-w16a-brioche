/**
 * @file useCustomer.ts - Defines the `useCustomer` hook for retrieving a single customer's details from the Reckon API.
 * * This hook fetches customer data based on the provided customer ID and the current book context.
 * * Uses React Query for caching and async handling.
 * * Utilizes a Zod schema (`customerSchema`) to validate the structure of the API response.
 */

/**
 * useCustomer Hook
 *
 * * Fetches the details of a specific customer using a dynamically resolved book ID.
 * * Performs a GET request to `/books/{bookId}/customers/{customerId}`.
 * * Response is validated using a Zod schema to ensure type safety.
 * * Automatically disables the query if `customerId` is falsy.
 *
 * @param {string} customerId - The unique ID of the customer to retrieve.
 * @returns {UseQueryResult<Customer>} - React Query result with customer data, loading state, and error handling.
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { customerSchema, type Customer } from "@/types/customer"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to fetch a single customer using the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param customerId - The ID of the customer to fetch
 * @returns The React Query result containing customer data, loading state, and error
 */
const useCustomer = (customerId: string) => {
  const authApi = useAuthApi()

  return useQuery<Customer>({
    queryKey: ["customers", customerId] as const,
    queryFn: async () => {
      if (!customerId) throw new Error("Customer ID is required")

      console.log("Fetching customer from Reckon API...", customerId)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.get(`/${bookId}/customers/${customerId}`)

      console.log("Raw Reckon API response:", response)

      // Parse and validate the response
      const parsedData = customerSchema.parse(response)
      console.log("Parsed and validated customer data:", parsedData)

      return parsedData
    },
    enabled: !!customerId,
  })
}

export default useCustomer
