/**
 * @file useDeleteProduct.ts - Defines the `useDeleteProduct` hook to remove a product via the Reckon API.
 * * Sends a DELETE request to `/items/{productId}` with dynamic book context.
 * * Invalidates product list on success to ensure UI reflects latest data.
 */

/**
 * useDeleteProduct Hook
 *
 * * Triggers a DELETE request to remove a product from Reckon backend.
 * * Dynamically injects current `bookId` into API path.
 * * On successful deletion (`204 No Content`), invalidates `products` query.
 *
 * @returns {UseMutationResult<boolean, Error, string>} Mutation result containing deletion status.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/lib/utils"

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async (productId: string) => {
      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.delete(`/${bookId}/items/${productId}`)
      return response.status === 204
    },
    onSuccess: async () => {
      // Invalidate and refetch products list
      await new Promise((resolve) => setTimeout(resolve, 1000))
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
