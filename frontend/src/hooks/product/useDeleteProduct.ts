import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await api.delete(
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
