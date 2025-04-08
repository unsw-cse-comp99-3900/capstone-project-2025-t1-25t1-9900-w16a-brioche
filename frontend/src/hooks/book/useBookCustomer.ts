import { useQuery } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { CustomerBook, customerBooksResponseSchema } from "@/types/customer"

export const useBookCustomer = (page = 1, perPage = 9999) => {
  const authApi = useAuthApi()

  return useQuery<CustomerBook[]>({
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

      const customerBooks = customerBooksResponseSchema.parse(response)
      console.log("response:", response)
      console.log("customerBooks:", customerBooksResponseSchema)

      return customerBooks.list
    },
  })
}

export default useBookCustomer
