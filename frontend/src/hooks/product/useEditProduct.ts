/**
 * @file useEditProduct.ts - Defines the `useEditProduct` hook for updating product details in the Reckon API.
 * * Sends a PUT request to `/items/{productId}` with form data validated by Zod.
 * * Automatically invalidates the `products` query on success.
 */

/**
 * useEditProduct Hook
 *
 * * Accepts a product ID and form values to update an existing product.
 * * Transforms form data into the correct API format using `apiRequestSchema`.
 * * Sends a PUT request to update product details in the Reckon backend.
 * * On success, invalidates the cached list of products to refresh UI.
 *
 * @param {string} productId - The ID of the product to be edited.
 * @returns {UseMutationResult<void, Error, ProductFormValues>} A mutation hook for editing a product.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { type ProductFormValues, apiRequestSchema } from "@/types/product"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to edit a product using the Reckon API
 * Uses React Query mutation and automatically invalidates the products query
 */
const useEditProduct = (productId: string) => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation<void, Error, ProductFormValues>({
    mutationFn: async (data: ProductFormValues) => {
      console.log("Editing product with data:", data)

      // Transform form data to API structure using Zod
      const apiData = apiRequestSchema.parse(data)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.put(
        `/${bookId}/items/${productId}`,
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
