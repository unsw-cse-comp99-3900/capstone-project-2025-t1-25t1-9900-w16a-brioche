import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import { type ProductFormValues, apiRequestSchema } from "@/types/product"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to edit a product using the Reckon API
 * Uses React Query mutation and automatically invalidates the products query
 */
const useEditProduct = (productId: string) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ProductFormValues>({
    mutationFn: async (data: ProductFormValues) => {
      console.log("Editing product with data:", data)

      // Transform form data to API structure using Zod
      const apiData = apiRequestSchema.parse(data)

      const response = await api.put(
        `/${Demo_RECKON_BOOK_ID}/items/${productId}`,
        apiData
      )

      console.log("Edit product response:", response)
      // No need to parse response as it's 204 No Content
    },
    onSuccess: () => {
      // Invalidate the products query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export default useEditProduct