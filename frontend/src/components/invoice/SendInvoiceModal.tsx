import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import useSendInvoice from "@/hooks/invoice/useSendInvoice"
import useEditCustomer from "@/hooks/customer/useEditCustomer"
import {
  apiToFormSchema,
  customerFormSchema,
  CustomerFormValues,
} from "@/types/customer"
import useCustomer from "@/hooks/customer/useCustomer"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface SendInvoiceModalProps {
  customerId: string
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
  customerId,
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
  const { mutate: editCustomer } = useEditCustomer(customerId ?? "")
  const { data: customer } = useCustomer(customerId ?? "")

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      status: "Active",
      website: { type: "Web", address: "" },
      emailAddress: { type: "Email", address: "" },
      mobileNumber: { type: "Mobile", countryCode: "", number: "" },
      phoneNumber: {
        type: "Phone",
        countryCode: "",
        areaCode: "",
        number: "",
        extension: "",
      },
    },
  })

  useEffect(() => {
    if (customer) {
      const formData = apiToFormSchema.parse(customer)
      form.reset(formData)
    }
  }, [customer, form])

  const handleSendInvoice = async () => {
    if (!emailData.toAddresses[0]) {
      toast.error("Recipient email is required")
      return
    }

    if (!emailData.body.trim()) {
      toast.error("Message cannot be empty")
      return
    }

    try {
      const formData = form.getValues()
      await editCustomer(formData, {
        onSuccess: () => {
          // After customer is updated, send the invoice email
          sendInvoiceEmail(emailData, {
            onSuccess: () => {
              onSuccess()
              onClose()
            },
            onError: (error) => {
              toast.error(`Failed to send invoice: ${error.message}`)
            },
          })
        },
        onError: (error) => {
          toast.error("Failed to update customer", {
            description: `Error: ${error}`,
          })
          console.error("Error updating customer:", error)
        },
      })
    } catch (error) {
      console.error("Error in send invoice process:", error)
      toast.error("Failed to process your request")
    }
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
            className="px-4 py-2 bg-primary-600 text-white rounded-md"
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SendInvoiceModal
