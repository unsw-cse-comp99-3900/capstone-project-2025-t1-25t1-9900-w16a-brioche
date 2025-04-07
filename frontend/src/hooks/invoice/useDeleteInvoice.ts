import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { getBookId } from "@/constants/config"

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.delete(`/${bookId}/invoices/${invoiceId}`)
      return response.status === 204
    },
    onSuccess: () => {
      // Invalidate and refetch invoices list
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
    },
  })
}

export default useDeleteInvoice
