import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import InvoiceItems from "@/components/invoice/InvoiceItems"
import { InvoiceFormValues } from "@/types/invoice"

vi.mock("@/hooks/product/useProducts", () => ({
  default: () => ({
    data: [
      {
        id: "product-1",
        name: "Mock Product",
        sale: {
          price: 100,
          description: "Mock description",
          taxRate: { name: "GST", percent: 10 },
        },
      },
    ],
  }),
}))

describe("InvoiceItems", () => {
  it("renders one item row and allows adding a new row", () => {
    const Wrapper = () => {
      const methods = useForm<InvoiceFormValues>({
        defaultValues: {
          items: [
            {
              item: "product-1",
              itemPrice: "100",
              description: "Mock description",
              qty: "1",
              discount: "0",
              taxCode: "GST",
              tax: "9.09",
              amount: "100.00",
            },
          ],
        },
      })
      return (
        <FormProvider {...methods}>
          <InvoiceItems form={methods} />
        </FormProvider>
      )
    }

    render(<Wrapper />)
    const headers = screen.getAllByRole("columnheader", { name: /Item/i })
    expect(headers.length).toBeGreaterThanOrEqual(1)
    expect(
      screen.getByRole("button", { name: /Add new row/i })
    ).toBeInTheDocument()

    expect(screen.getAllByRole("combobox").length).toBe(1)

    fireEvent.click(screen.getByRole("button", { name: /Add new row/i }))

    expect(screen.getAllByRole("combobox").length).toBe(2)
  })
})
