/**
 * @file useDeleteCustomer.ts - Defines the `useDeleteCustomer` hook for deleting a customer in the Reckon API.
 * * Uses React Query's mutation API to send a DELETE request.
 * * Automatically triggers refetching of the customer list on successful deletion.
 */

/**
 * useDeleteCustomer Hook
 *
 * * Sends an authenticated DELETE request to remove a specific customer from the Reckon system.
 * * Dynamically injects the current `bookId` into the API path.
 * * On success, invalidates the `customers` query to ensure the UI reflects the updated state.
 *
 * @returns {UseMutationResult<boolean, Error, string>} React Query mutation object with mutate function and mutation state.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/lib/utils"

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()
  return useMutation({
    mutationFn: async (customerId: string) => {
      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.delete(
        `/${bookId}/customers/${customerId}`
      )
      return response.status === 204
    },
    onSuccess: async () => {
      // Invalidate and refetch customers list
      await new Promise((resolve) => setTimeout(resolve, 500))
      queryClient.invalidateQueries({ queryKey: ["customers"] })
    },
  })
}
