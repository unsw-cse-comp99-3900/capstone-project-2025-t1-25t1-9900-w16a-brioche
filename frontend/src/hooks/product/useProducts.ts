import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { productResponseSchema, type Product } from "@/types/product"
import { getBookId } from "@/constants/config"

/**
 * product hook to fetch products from the Reckon API
 * Uses Zod for runtime validation and type inference
 *
 * @param page - The page number to fetch (default: 1)
 * @param perPage - The number of products per page (default: 0 to get all products)
 * @returns The React Query result containing products data, loading state, and error
 */
export const useProducts = (page = 1, perPage = 9999) => {
  const authApi = useAuthApi()

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      console.log("Fetching products from Reckon API...")

      // Dynamically get the bookId
      const bookId = getBookId();

      // Include the bookId in the endpoint path
      const response = await authApi.get(`/${bookId}/items`, {
        params: {
          page,
          perPage,
        },
      })

      console.log("Raw Reckon API response:", response)

      // Parse and validate the response
      const parsedData = productResponseSchema.parse(response)
      console.log("Parsed and validated product data:", parsedData)

      // Return the list of products
      return parsedData.list
    },
  })
}

export default useProducts
