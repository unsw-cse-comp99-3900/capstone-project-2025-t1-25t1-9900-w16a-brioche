import { useMutation } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { toast } from "sonner"
import { getBookId } from "@/constants/config"

interface SendInvoiceEmailData {
  toAddresses: string[]
  ccAddresses?: string[]
  bccAddresses?: string[]
  subject: string
  body: string
  documentNumber?: string
}

const useSendInvoice = (invoiceId: string) => {
  const authApi = useAuthApi()

  console.log("Auth API base URL:", authApi.defaults.baseURL)

  return useMutation<void, Error, SendInvoiceEmailData>({
    mutationFn: async (emailData: SendInvoiceEmailData) => {
      if (!emailData.toAddresses || emailData.toAddresses.length === 0) {
        throw new Error("No valid recipient addresses provided.")
      }

      console.log("Sending invoice email with data:", emailData)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.post(
        `/${bookId}/invoices/${invoiceId}/email`,
        emailData
      )

      console.log("Invoice email sent response:", response)
      return response.data
    },
    onSuccess: () => {
      toast.success("Invoice sent successfully")
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })
}

export default useSendInvoice
