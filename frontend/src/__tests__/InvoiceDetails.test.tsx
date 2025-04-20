// src/__tests__/InvoiceDetails.test.tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import InvoiceDetails from "@/components/invoice/InvoiceDetails"
import { InvoiceFormValues } from "@/types/invoice"

describe("InvoiceDetails", () => {
  it("renders Reference Code and Invoice Discount fields", () => {
    const Wrapper = () => {
      const methods = useForm<InvoiceFormValues>({
        defaultValues: {
          referenceCode: "ABC123",
          invoiceDiscount: "10%",
        },
      })

      return (
        <FormProvider {...methods}>
          <InvoiceDetails form={methods} />
        </FormProvider>
      )
    }

    render(<Wrapper />)

    expect(screen.getByLabelText(/Reference code/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Invoice discount/i)).toBeInTheDocument()
  })
})
