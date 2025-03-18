import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/axios"
import {
  type ProductFormValues,
  apiRequestSchema,
} from "@/types/product"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * product hook to create a product using the Reckon API
 * Uses React Query mutation and automatically invalidates the products query
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: ProductFormValues) => {
      console.log("Creating product with data:", data)

      // Transform form data to API structure
      const apiData = apiRequestSchema.parse(data)

      const response = await api.post(
        `/${Demo_RECKON_BOOK_ID}/items`,
        apiData
      )

      console.log("Create product response:", response)

      // Return the response data
      return response.data
    },
    onSuccess: () => {
      // Invalidate the products query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export default useCreateProduct