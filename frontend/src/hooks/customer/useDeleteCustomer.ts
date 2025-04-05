import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/constants/config"

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()
  return useMutation({
    mutationFn: async (customerId: string) => {
      // Dynamically get the bookId
      const bookId = getBookId();

      const response = await authApi.delete(
        `/${bookId}/customers/${customerId}`
      )
      return response.status === 204
    },
    onSuccess: () => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: ["customers"] })
    },
  })
}
