import { useMutation } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import { toast } from "sonner"
import { Demo_RECKON_BOOK_ID } from "@/constants/config"

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
      console.log(
        "Sending invoice email to URL:",
        `/${Demo_RECKON_BOOK_ID}/invoices/${invoiceId}/email`
      )

      const response = await authApi.post(
        `/${Demo_RECKON_BOOK_ID}/invoices/${invoiceId}/email`,
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
