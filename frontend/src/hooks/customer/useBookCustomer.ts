import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { apiToBookCustomer } from "@/types/customer" // 假设你的 zod schema 位于这个路径


// Define the schema for the API response
interface BookCustomerResponse {
  list: Array<{
    id: string
    name: string
  }>
}

export const useBookCustomer = (page = 1, perPage = 9999) => {
  const authApi = useAuthApi()

  return useQuery<BookCustomerResponse["list"]>({
    queryKey: ["books"],
    queryFn: async () => {
      console.log("Fetching book customer from API...")

      // Fetch API response
      const response = await authApi.get("/books", {
        params: {
          page,
          perPage,
        },
      })

      console.log("Full response:", response)
      console.log("response.data:", response.data)

      // Ensure that response.list is an array, even if it's undefined
      const list = response.list ?? []

      console.log("response.list:", list)

      // 使用 apiToBookCustomer 转换数据，只保留 id 和 name
      const extractedData = apiToBookCustomer.parse(list)

      console.log("Extracted data:", extractedData)

      return extractedData 
    },
  })
}

export default useBookCustomer
