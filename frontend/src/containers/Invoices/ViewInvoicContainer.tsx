/**
 * @file ViewInvoiceContainer.tsx - Displays an invoice view page with preview, download, and send options.
 */

import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Send, Download, Edit } from "lucide-react"

import useInvoice from "@/hooks/invoice/useInvoice"
import useDownloadInvoice from "@/hooks/invoice/useDownloadInvoice"
import useCustomers from "@/hooks/customer/useCustomers"

import SendInvoiceModal from "@/components/invoice/SendInvoiceModal"

import { format } from "date-fns"
import { toast } from "sonner"

/**
 * ViewInvoiceContainer Component
 *
 * A page that loads and displays a single invoice. It shows the invoice preview PDF (if available),
 * and provides actions to edit, download, or send the invoice.
 *
 * @returns {JSX.Element} The rendered invoice viewing page.
 */
const ViewInvoiceContainer: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isSending, setIsSending] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)

  const { data: invoice, isLoading } = useInvoice(id ?? "")

  const { mutate: downloadInvoice, isPending } = useDownloadInvoice()

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
            toast.error("Failed to load invoice preview")
          },
        }
      )
    }
  }, [invoice, id, downloadInvoice])

  // Clean up preview blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl && pdfUrl.startsWith("blob:")) {
        window.URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  const { data: customers = [], refetch } = useCustomers()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [emailData, setEmailData] = useState({
    toAddresses: [""],
    subject: "Invoice from Your Company",
    body: "Dear Customer,\n\nPlease find the attached invoice.\n\nBest regards,\nYour Company",
  })

  const openSendInvoiceModal = async () => {
    if (invoice?.customer?.id) {
      setIsSending(true)
      try {
        let customer = customers.find((c) => c.id === invoice.customer?.id)
        if (!customer) {
          await refetch()
          customer = customers.find((c) => c.id === invoice.customer?.id)
        }
        if (!customer) {
          throw new Error("Customer information could not be found")
        }

        const customerEmail =
          customer?.electronicAddresses?.find((ea) => ea.type.name === "Email")
            ?.address || ""

        const invoiceNumber = invoice.invoiceNumber || "Unknown"
        const totalAmount = invoice.totalAmount
        const dueDate = invoice.dueDate
          ? format(new Date(invoice.dueDate), "dd MMM yyyy")
          : "Unknown"

        setEmailData({
          toAddresses: [customerEmail],
          subject: `Invoice ${invoiceNumber} from Your Company`,
          body: `Dear ${customer?.name || "Customer"},\n\nPlease find attached Invoice ${invoiceNumber} for ${totalAmount} due on ${dueDate}.\n\nBest regards,\nYour Company`,
        })
        setIsModalOpen(true)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Failed to prepare email. Please try again.")
        }
      } finally {
        setIsSending(false)
      }
    } else {
      toast.error("Customer information is missing. Cannot send invoice.")
    }
  }

  const closeSendInvoiceModal = () => setIsModalOpen(false)

  if (isLoading || isLoadingPdf) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 sm:p-6">
      {/* Action buttons */}
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
          onClick={openSendInvoiceModal}
          disabled={isSending}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
        >
          <Send className="h-4 w-4" />
          {isSending ? "Preparing..." : "Send"}
        </Button>
      </div>

      {isModalOpen && (
        <SendInvoiceModal
          customerId={invoice?.customer?.id ?? ""}
          invoiceId={id ?? ""}
          customerEmail={emailData.toAddresses[0]}
          customerName={invoice?.customer?.name || "Customer"}
          invoiceNumber={invoice?.invoiceNumber || "Unknown"}
          totalAmount={
            typeof invoice?.totalAmount === "number"
              ? invoice.totalAmount.toFixed(2)
              : "0.00"
          }
          dueDate={
            invoice?.dueDate
              ? format(new Date(invoice.dueDate), "dd MMM yyyy")
              : "Unknown"
          }
          onClose={closeSendInvoiceModal}
          onSuccess={() => {
            toast.success("Invoice sent successfully")
            navigate("/invoices")
          }}
        />
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5 w-full">
        {/* PDF Preview */}
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

        {/* Fallback summary if PDF failed */}
        {invoice && !pdfUrl && (
          <div className="mt-4 p-4">
            <p className="text-sm text-gray-500">Unable to load PDF preview.</p>
            <p className="mt-2">
              Invoice #{invoice.invoiceNumber || "N/A"} | Amount:{" "}
              {invoice.totalAmount
                ? `$${invoice.totalAmount.toFixed(2)}`
                : "N/A"}{" "}
              | Date:{" "}
              {invoice.invoiceDate
                ? new Date(invoice.invoiceDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewInvoiceContainer
