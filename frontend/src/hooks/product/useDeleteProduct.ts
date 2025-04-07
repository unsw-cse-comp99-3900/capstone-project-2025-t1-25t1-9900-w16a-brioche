import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/constants/config"

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
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}
