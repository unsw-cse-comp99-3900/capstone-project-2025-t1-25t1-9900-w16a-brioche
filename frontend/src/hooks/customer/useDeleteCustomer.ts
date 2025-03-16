import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (customerId: string) => {
      const response = await api.delete(
        `/${Demo_RECKON_BOOK_ID}/customers/${customerId}`
      )
      return response.status === 204
    },
    onSuccess: () => {
      // Invalidate and refetch customers list
      queryClient.invalidateQueries({ queryKey: ["customers"] })
    },
  })
}
