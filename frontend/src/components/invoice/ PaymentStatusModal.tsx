import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import useUpdateInvoiceStatus from "@/hooks/invoice/usePayInvoice"

interface PaymentStatusModalProps {
  invoiceId: string
  onClose: () => void

}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({
  invoiceId,
  onClose,

}) => {
  const navigate = useNavigate()

  const { mutate: updateStatus, isPending } = useUpdateInvoiceStatus(
    invoiceId,
    "Paid"
  )

  const handlePaymentStatus = (paid: boolean) => {
    if (paid) {
      updateStatus(undefined, {
        onSuccess: () => {
          toast.success("Invoice marked as Paid")
      
          onClose()       
          navigate("/invoices")
        },
        onError: (error) => {
          toast.error("Failed to update status", {
            description: error.message,
          })
        },
      })
    } else {
      toast.info("Invoice marked as Unpaid (no changes made)")
  
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg w-250 shadow-lg">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <p className="text-base text-gray-700  mb-6">
          Please confirm the payment status of this invoice:
        </p>

        <div className="flex justify-center gap-6">
          <Button
            variant="outline"
            onClick={() => handlePaymentStatus(false)}
            className="px-5 py-2"
          >
            Not Paid
          </Button>
          <Button
            onClick={() => handlePaymentStatus(true)}
            className="px-5 py-2 bg-primary-600 text-white"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Paid"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentStatusModal
