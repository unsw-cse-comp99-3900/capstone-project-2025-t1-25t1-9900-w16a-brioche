import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import SendInvoiceModal from "@/components/invoice/SendInvoiceModal"
import { FormProvider, useForm } from "react-hook-form"
import { CustomerFormValues } from "@/types/customer"

vi.mock("@/hooks/invoice/useSendInvoice", () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}))
vi.mock("@/hooks/customer/useEditCustomer", () => ({
  default: () => ({ mutate: vi.fn() }),
}))
vi.mock("@/hooks/customer/useCustomer", () => ({
  default: () => ({ data: null }),
}))

describe("SendInvoiceModal", () => {
  it("renders modal content and handles cancel", () => {
    const mockOnClose = vi.fn()
    const mockOnSuccess = vi.fn()

    const Wrapper = () => {
      const form = useForm<CustomerFormValues>()
      return (
        <FormProvider {...form}>
          <SendInvoiceModal
            customerId="customer-1"
            invoiceId="invoice-1"
            customerEmail="test@example.com"
            customerName="Test Customer"
            invoiceNumber="INV-001"
            totalAmount="$100"
            dueDate="2025-05-01"
            onClose={mockOnClose}
            onSuccess={mockOnSuccess}
          />
        </FormProvider>
      )
    }

    render(<Wrapper />)

    expect(screen.getByText("Send Invoice via Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Recipient Email")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Email message")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Send")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Cancel"))
    expect(mockOnClose).toHaveBeenCalled()
  })
})
