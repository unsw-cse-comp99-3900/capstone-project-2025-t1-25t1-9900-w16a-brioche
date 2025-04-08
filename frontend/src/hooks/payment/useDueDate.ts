import { getBookId } from "@/lib/utils"
import { useAuthApi } from "@/lib/axios"
import { dueDateSchema } from "@/types/payment"
import { useQuery } from "@tanstack/react-query"

export const useDueDate = (termId: string, invoiceDate: string) => {
  const authApi = useAuthApi()

  return useQuery({
    queryKey: ["due-date", termId, invoiceDate],
    queryFn: async () => {
      if (!termId || !invoiceDate) return null

      // Dynamically get the bookId
      const bookId = getBookId()

      const url = `/${bookId}/terms/${termId}/duedate/basedate/${invoiceDate}`
      console.log(" Full API URL:", url)

      const response = await authApi.get(url)
      console.log("Raw API response:", response)

      const parsedData = dueDateSchema.parse(response)

      console.log(" Parsed and validated due date:", parsedData)
      return parsedData
    },
  })
}
