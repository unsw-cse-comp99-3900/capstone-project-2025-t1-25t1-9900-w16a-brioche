import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { type CustomerFormValues, apiRequestSchema } from "@/types/customer"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to edit a customer using the Reckon API
 * Uses React Query mutation and automatically invalidates the customers query
 */
export const useEditCustomer = (customerId: string) => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation<void, Error, CustomerFormValues>({
    mutationFn: async (data: CustomerFormValues) => {
      console.log("Editing customer with data:", data)

      // Transform form data to API structure using Zod
      const apiData = apiRequestSchema.parse(data)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.put(
        `/${bookId}/customers/${customerId}`,
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
