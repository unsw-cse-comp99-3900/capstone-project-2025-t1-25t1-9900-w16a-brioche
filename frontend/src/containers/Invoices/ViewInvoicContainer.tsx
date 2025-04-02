import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Send, Download, Edit } from "lucide-react"

import useInvoice from "@/hooks/invoice/useInvoice"
import useDownloadInvoice from "@/hooks/invoice/useDownloadInvoice"

const ViewInvoiceContainer: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isSending] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)

  // Fetch the invoice data
  const { data: invoice, isLoading } = useInvoice(id ?? "")

  // Use the download hook inside the component
  const { mutate: downloadInvoice, isPending } = useDownloadInvoice()

  // Load PDF preview automatically when invoice data is available
  useEffect(() => {
    if (invoice && id) {
      setIsLoadingPdf(true)
      downloadInvoice(
        { invoiceId: id, action: "preview" },
        {
          onSuccess: (data) => {
            if (data.url) {
              setPdfUrl(data.url)
            }
            setIsLoadingPdf(false)
          },
          onError: () => {
            setIsLoadingPdf(false)
          },
        }
      )
    }
  }, [invoice, id, downloadInvoice])

  // Clean up URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  const sendInvoice = async () => {
    console.log("e")
  }

  if (isLoading || isLoadingPdf) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 sm:p-6">
      {/* Top Action Buttons */}
      <div className="flex justify-end mb-4 space-x-2">
        <Button
          type="button"
          onClick={() => navigate(`/invoices/${id}/edit`)}
          className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>

        <Button
          type="button"
          onClick={() => downloadInvoice({ invoiceId: id ?? "" })}
          disabled={isPending}
          className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          {isPending ? "Downloading..." : "Download"}
        </Button>

        <Button
          type="button"
          onClick={sendInvoice}
          disabled={isSending}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
        >
          <Send className="h-4 w-4" />
          {isSending ? "Sending..." : "Send"}
        </Button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5 w-full">
        {/* Display PDF preview */}
        {pdfUrl && (
          <div className="mt-8 mx-4">
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={pdfUrl}
                width="100%"
                height="600"
                title={`Invoice ${id} Preview`}
                frameBorder="0"
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Display invoice details as fallback if PDF is not available */}
        {invoice && !pdfUrl && <div className="mt-4">{}</div>}
      </div>
    </div>
  )
}

export default ViewInvoiceContainer
