import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { customerSchema, type Customer } from "@/types/customer"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

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

      const response = await authApi.get(
        `/${Demo_RECKON_BOOK_ID}/customers/${customerId}`
      )

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
