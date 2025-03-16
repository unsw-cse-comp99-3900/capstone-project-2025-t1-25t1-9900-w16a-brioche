import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { type CustomerFormValues, apiRequestSchema } from "@/types/customer"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to edit a customer using the Reckon API
 * Uses React Query mutation and automatically invalidates the customers query
 */
export const useEditCustomer = (customerId: string) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CustomerFormValues>({
    mutationFn: async (data: CustomerFormValues) => {
      console.log("Editing customer with data:", data)

      // Transform form data to API structure using Zod
      const apiData = apiRequestSchema.parse(data)

      const response = await api.put(
        `/${Demo_RECKON_BOOK_ID}/customers/${customerId}`,
        apiData
      )

      console.log("Edit customer response:", response)
      // No need to parse response as it's 204 No Content
    },
    onSuccess: () => {
      // Invalidate the customers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["customers"] })
    },
  })
}

export default useEditCustomer
