import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await authApi.delete(
        `/${Demo_RECKON_BOOK_ID}/items/${productId}`
      )
      return response.status === 204
    },
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
