import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import InvoiceNotesAndTotals from "@/components/invoice/InvoiceTotal"
import { useForm, FormProvider } from "react-hook-form"
import { InvoiceFormValues } from "@/types/invoice"

describe("InvoiceNotesAndTotals", () => {
  it("renders notes, payment details and totals correctly", () => {
    const Wrapper = () => {
      const methods = useForm<InvoiceFormValues>({
        defaultValues: {
          note: "",
          paymentDetails: "",
        },
      })

      return (
        <FormProvider {...methods}>
          <InvoiceNotesAndTotals
            form={methods}
            totals={{
              subtotal: "200.00",
              discount: "10.00",
              totalExclTax: "190.00",
              tax: "19.00",
              total: "209.00",
            }}
          />
        </FormProvider>
      )
    }

    render(<Wrapper />)

    // Check for label presence
    expect(screen.getByText("NOTE:")).toBeInTheDocument()
    expect(screen.getByText("PAYMENT DETAILS:")).toBeInTheDocument()

    // Check totals
    expect(screen.getByText("Subtotal")).toBeInTheDocument()
    expect(screen.getByText("Discount")).toBeInTheDocument()
    expect(screen.getByText("Total (excluding tax)")).toBeInTheDocument()
    expect(screen.getByText("Tax")).toBeInTheDocument()
    expect(screen.getByText("Total")).toBeInTheDocument()

    // Check numeric values
    expect(screen.getByText("200.00")).toBeInTheDocument()
    expect(screen.getByText("10.00")).toBeInTheDocument()
    expect(screen.getByText("190.00")).toBeInTheDocument()
    expect(screen.getByText("19.00")).toBeInTheDocument()
    expect(screen.getByText("209.00")).toBeInTheDocument()
  })
})
