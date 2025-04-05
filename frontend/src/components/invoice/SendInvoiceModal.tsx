import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import useSendInvoice from "@/hooks/invoice/useSendInvoice"

interface SendInvoiceModalProps {
  invoiceId: string
  customerEmail: string
  customerName: string
  invoiceNumber: string
  totalAmount: string
  dueDate: string
  onClose: () => void
  onSuccess: () => void
}

const SendInvoiceModal: React.FC<SendInvoiceModalProps> = ({
  invoiceId,
  customerEmail,
  customerName,
  invoiceNumber,
  totalAmount,
  dueDate,
  onClose,
  onSuccess,
}) => {
  const [emailData, setEmailData] = useState({
    toAddresses: [customerEmail],
    subject: `Invoice ${invoiceNumber} from Your Company`,
    body: `Dear ${customerName},\n\nPlease find attached Invoice ${invoiceNumber} for ${totalAmount} due on ${dueDate}.\n\nBest regards,\nYour Company`,
  })

  const { mutate: sendInvoiceEmail, isPending: isSending } =
    useSendInvoice(invoiceId)

  const handleSendInvoice = () => {
    if (!emailData.toAddresses[0]) {
      toast.error("Recipient email is required")
      return
    }

    if (!emailData.body.trim()) {
      toast.error("Message cannot be empty")
      return
    }

    sendInvoiceEmail(emailData, {
      onSuccess: () => {
        onSuccess()
        onClose()
      },
      onError: (error) => {
        toast.error(`Failed to send invoice: ${error.message}`)
      },
    })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Send Invoice via Email</h2>
        <div className="mb-4">
          <label className="block text-gray-700">To *</label>
          <Input
            placeholder="Recipient Email"
            className="w-full p-2 border rounded-md"
            value={emailData.toAddresses[0]}
            onChange={(e) =>
              setEmailData({ ...emailData, toAddresses: [e.target.value] })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message *</label>
          <Textarea
            placeholder="Email message"
            className="w-full p-2 border rounded-md min-h-[100px]"
            value={emailData.body}
            onChange={(e) =>
              setEmailData({ ...emailData, body: e.target.value })
            }
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSendInvoice}
            disabled={isSending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SendInvoiceModal
