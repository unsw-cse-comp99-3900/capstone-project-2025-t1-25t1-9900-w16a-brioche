import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const response = await authApi.delete(
        `/${Demo_RECKON_BOOK_ID}/invoices/${invoiceId}`
      )
      return response.status === 204
    },
    onSuccess: () => {
      // Invalidate and refetch invoices list
      queryClient.invalidateQueries({ queryKey: ["invoices"] })
    },
  })
}

export default useDeleteInvoice
