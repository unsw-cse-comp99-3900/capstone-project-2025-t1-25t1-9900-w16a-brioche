/**
 * @file useCreateProduct.ts - Defines the `useCreateProduct` hook for creating a product via the Reckon API.
 * * Sends a POST request to `/items` with validated product data.
 * * Parses form values using Zod (`apiRequestSchema`).
 * * On success, invalidates the `products` query to refresh the product list.
 */

/**
 * useCreateProduct Hook
 *
 * * Submits a new product to the Reckon backend using the current book ID.
 * * Transforms form data into the expected API schema using Zod validation.
 * * Invalidates the cached list of products after successful creation.
 *
 * @returns {UseMutationResult<any, Error, ProductFormValues>} React Query mutation object for creating a product.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { type ProductFormValues, apiRequestSchema } from "@/types/product"
import { getBookId } from "@/lib/utils"

/**
 * product hook to create a product using the Reckon API
 * Uses React Query mutation and automatically invalidates the products query
 */
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation({
    mutationFn: async (data: ProductFormValues) => {
      console.log("Creating product with data:", data)

      // Transform form data to API structure
      const apiData = apiRequestSchema.parse(data)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.post(`/${bookId}/items`, apiData)

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
