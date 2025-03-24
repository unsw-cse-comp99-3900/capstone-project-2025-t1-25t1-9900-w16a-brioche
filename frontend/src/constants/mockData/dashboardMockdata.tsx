import { InvoiceStatus } from "@/types/invoice"

export const sampleData = {
  invoices: [
    {
      id: "inv-1",
      invoiceNumber: "INV-001",
      status: InvoiceStatus.Draft,
      totalAmount: 1200,
      createdDateTime: new Date().toISOString(),
      customer: { id: "c-1", name: "Sample Customer 1" },
      lineItems: [
        {
          itemDetails: {
            item: { id: "p-1", name: "Sample Product 1" },
            price: 1200,
            quantity: 1,
          },
        },
      ],
    },
    {
      id: "inv-2",
      invoiceNumber: "INV-002",
      status: InvoiceStatus.Pending,
      totalAmount: 2400,
      createdDateTime: new Date().toISOString(),
      customer: { id: "c-2", name: "Sample Customer 2" },
      lineItems: [
        {
          itemDetails: {
            item: { id: "p-2", name: "Sample Product 2" },
            price: 2400,
            quantity: 1,
          },
        },
      ],
    },
    {
      id: "inv-3",
      invoiceNumber: "INV-003",
      status: InvoiceStatus.Approved,
      totalAmount: 3600,
      createdDateTime: new Date().toISOString(),
      customer: { id: "c-3", name: "Sample Customer 3" },
      lineItems: [
        {
          itemDetails: {
            item: { id: "p-3", name: "Sample Product 3" },
            price: 3600,
            quantity: 1,
          },
        },
      ],
    },
    {
      id: "inv-4",
      invoiceNumber: "INV-004",
      status: InvoiceStatus.Paid,
      totalAmount: 4800,
      createdDateTime: new Date().toISOString(),
      customer: { id: "c-4", name: "Sample Customer 4" },
      lineItems: [
        {
          itemDetails: {
            item: { id: "p-4", name: "Sample Product 4" },
            price: 4800,
            quantity: 1,
          },
        },
      ],
    },
    {
      id: "inv-5",
      invoiceNumber: "INV-005",
      status: InvoiceStatus.Overdue,
      totalAmount: 1500,
      createdDateTime: new Date().toISOString(),
      customer: { id: "c-5", name: "Sample Customer 5" },
      lineItems: [
        {
          itemDetails: {
            item: { id: "p-5", name: "Sample Product 5" },
            price: 1500,
            quantity: 1,
          },
        },
      ],
    },
  ],
  customers: Array.from({ length: 15 }, (_, i) => ({
    id: `c-${i + 1}`,
    name: `Customer ${i + 1}`,
  })),
  products: Array.from({ length: 10 }, (_, i) => ({
    id: `p-${i + 1}`,
    name: `Product ${i + 1}`,
  })),
}
