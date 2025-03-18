import { useQuery } from "@tanstack/react-query"
import api from "@/lib/axios"
import { productSchema, type Product } from "@/types/product"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

/**
 * Custom hook to fetch a single product using the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param productId - The ID of the product to fetch
 * @returns The React Query result containing product data, loading state, and error
 */
const useProduct = (productId: string) => {
  return useQuery<Product>({
    queryKey: ["products", productId] as const,
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required")

      console.log("Fetching product from Reckon API...", productId)

      const response = await api.get(
        `/${Demo_RECKON_BOOK_ID}/items/${productId}`
      )

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