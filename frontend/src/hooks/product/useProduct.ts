/**
 * @file useProduct.ts - Defines the `useProduct` hook for fetching a single product's details from the Reckon API.
 * * Sends a GET request to `/items/{productId}` within the active book scope.
 * * Uses Zod (`productSchema`) to validate the API response.
 * * Enables conditional fetching via `enabled` flag.
 */

/**
 * useProduct Hook
 *
 * * Accepts a `productId` to fetch details for a specific product from Reckon.
 * * Automatically resolves the current book ID for scoped API access.
 * * Uses React Query to manage fetching, caching, and error handling.
 * * Parses and validates the response using Zod schema.
 * * Disabled by default if `productId` is falsy.
 *
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {UseQueryResult<Product>} React Query result with validated product data or loading/error states.
 */

import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { productSchema, type Product } from "@/types/product"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to fetch a single product using the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param productId - The ID of the product to fetch
 * @returns The React Query result containing product data, loading state, and error
 */
const useProduct = (productId: string) => {
  const authApi = useAuthApi()

  return useQuery<Product>({
    queryKey: ["products", productId] as const,
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required")

      console.log("Fetching product from Reckon API...", productId)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.get(`/${bookId}/items/${productId}`)

      console.log("Raw Reckon API response:", response)

      // Parse and validate the response
      const parsedData = productSchema.parse(response)
      console.log("Parsed and validated product data:", parsedData)

      return parsedData
    },
    enabled: !!productId,
  })
}

export default useProduct
