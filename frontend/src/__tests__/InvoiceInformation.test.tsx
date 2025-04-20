import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { useForm, FormProvider } from "react-hook-form"
import InvoiceInformation from "@/components/invoice/InvoiceInformation"
import { InvoiceFormValues } from "@/types/invoice"

vi.mock("@/hooks/customer/useCustomers", () => ({
  __esModule: true,
  default: () => ({
    data: [{ id: "1", name: "Mock Customer" }],
    isLoading: false,
  }),
}))

vi.mock("@/hooks/payment/usePaymentTerms", () => ({
  __esModule: true,
  default: () => ({
    data: [{ id: "term-1", name: "30 Days" }],
    isLoading: false,
  }),
}))

const WrapperComponent = () => {
  const methods = useForm<InvoiceFormValues>({
    defaultValues: {
      customer: "",
      invoiceDate: new Date(),
      dueDate: new Date(),
      paymentTerms: "",
      items: [],
    },
  })

  return (
    <FormProvider {...methods}>
      <InvoiceInformation form={methods} />
    </FormProvider>
  )
}

describe("InvoiceInformation", () => {
  it("renders all required invoice metadata fields", () => {
    render(<WrapperComponent />)
    expect(screen.getByLabelText(/Customer/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Invoice date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Due date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Payment terms/i)).toBeInTheDocument()
  })
})
