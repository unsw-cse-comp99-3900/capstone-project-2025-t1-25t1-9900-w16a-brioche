import { z } from "zod"

// Define enum types
export const AmountTaxStatus = {
  NonTaxed: "NonTaxed",
  Inclusive: "Inclusive",
  Exclusive: "Exclusive",
} as const

export const InvoiceStatus = {
  Draft: "Draft",
  Approved: "Approved",
  Paid: "Paid",
  Overdue: "Overdue", // Added for UI purposes
  Pending: "Pending", // Added for UI purposes
} as const

export const EmailStatus = {
  Unsent: "Unsent",
  Processing: "Processing",
  Processed: "Processed",
  Sent: "Sent",
  Failed: "Failed",
} as const

export const LineItemRowType = {
  Data: "Data",
  Group: "Group",
} as const

// Define nullable reference schemas
const referenceSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
  })
  .nullable()
  .optional()

// ContactRef
const contactRefSchema = referenceSchema

// LedgerAccountRef
const ledgerAccountRefSchema = referenceSchema

// ClassificationRef
const classificationRefSchema = referenceSchema

// TemplateRef
const templateRefSchema = referenceSchema

// ProjectRef
const projectRefSchema = referenceSchema

// ItemRef
const itemRefSchema = referenceSchema

// PaymentTermRef
const paymentTermRefSchema = referenceSchema

// RecurringTemplateRef
const recurringTemplateRefSchema = referenceSchema

// TaxRateRef with percent
const taxRateRefSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    percent: z.number().optional(),
  })
  .nullable()
  .optional()

// Address schemas
const addressSchema = z
  .object({
    id: z.string().optional(),
    type: referenceSchema,
    line1: z.string().nullable().optional(),
    line2: z.string().nullable().optional(),
    line3: z.string().nullable().optional(),
    suburb: z.string().nullable().optional(),
    town: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    postcode: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
  })
  .nullable()
  .optional()

// Transaction Link schema
const transactionLinkSchema = z
  .object({
    // Define according to your actual data structure
    id: z.string().optional(),
    type: z.string().optional(),
    reference: z.string().optional(),
  })
  .nullable()
  .optional()

// Invoice line item account details
const invoiceLineItemAccountDetailsSchema = z
  .object({
    ledgerAccount: ledgerAccountRefSchema,
    quantity: z.number().nullable().optional(),
    amount: z.number().nullable().optional(),
  })
  .nullable()
  .optional()

// Invoice line item item details
const invoiceLineItemItemDetailsSchema = z
  .object({
    item: itemRefSchema,
    price: z.number().nullable().optional(),
    quantity: z.number().nullable().optional(),
    discountAmount: z.number().nullable().optional(),
    discountPercent: z.number().nullable().optional(),
  })
  .nullable()
  .optional()

// Invoice line item
const invoiceLineItemSchema = z
  .object({
    lineNumber: z.number().optional(),
    lineId: z.string().nullable().optional(),
    parentLineId: z.string().nullable().optional(),
    serviceDate: z.string().nullable().optional(),
    project: projectRefSchema,
    itemDetails: invoiceLineItemItemDetailsSchema,
    accountDetails: invoiceLineItemAccountDetailsSchema,
    description: z.string().nullable().optional(),
    taxRate: taxRateRefSchema,
    taxAmount: z.number().nullable().optional(),
    taxIsModified: z.boolean().nullable().optional(),
    isFullWidthDescription: z.boolean().nullable().optional(),
    transactionLinks: z.array(transactionLinkSchema).optional(),
    groupPrintAsSingleLine: z.boolean().nullable().optional(),
    rowType: z.string().nullable().optional(),
  })
  .nullable()
  .optional()

// Main invoice schema
export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  customer: contactRefSchema,
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  invoiceDate: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
  totalAmount: z.number().nullable().optional(),
  invoiceDiscountAmount: z.number().nullable().optional(),
  invoiceDiscountPercent: z.number().nullable().optional(),
  balance: z.number().nullable().optional(),
  amountTaxStatus: z.string().nullable().optional(),
  totalTaxAmount: z.number().nullable().optional(),
  status: z.string().nullable().optional(),
  paymentTerms: paymentTermRefSchema,
  reference: z.string().nullable().optional(),
  purchaseOrderNumber: z.string().nullable().optional(),
  accountsReceivableLedgerAccount: ledgerAccountRefSchema,
  classification: classificationRefSchema,
  template: templateRefSchema,
  recurringTemplate: recurringTemplateRefSchema,
  transactionLinks: z.array(transactionLinkSchema).nullable().optional(),
  lineItems: z.array(invoiceLineItemSchema).nullable().optional(),
  notes: z.string().nullable().optional(),
  paymentDetails: z.string().nullable().optional(),
  emailStatus: z.string().nullable().optional(),
  createdDateTime: z.string().nullable().optional(),
  lastModifiedDateTime: z.string().nullable().optional(),
  includeInInvoiceReminders: z.boolean().nullable().optional(),
  reminderStatus: z.string().nullable().optional(),
  lastReminderSentDate: z.string().nullable().optional(),
})

// Define the type from the schema
export type Invoice = z.infer<typeof invoiceSchema>

// Define the response schema for the API with a more relaxed validation
export const invoiceResponseSchema = z.object({
  list: z.array(
    // Use .passthrough() to ignore extra fields and .partial() to make all fields optional
    invoiceSchema.passthrough().partial()
  ),
})

export type InvoiceResponse = z.infer<typeof invoiceResponseSchema>

// Query parameters type
export interface InvoiceQueryParams {
  page?: number
  perPage?: number
  filter?: string
  orderby?: string
  select?: string
}

// Simplified Invoice Form Schema for Create/Edit
export const invoiceFormSchema = z.object({
  // Basic information
  invoiceNumber: z.string().optional(),
  customerId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().default(InvoiceStatus.Draft),

  // Dates
  invoiceDate: z.string().optional(),
  dueDate: z.string().optional(),

  // Amounts
  totalAmount: z.number().min(0).default(0),
  balance: z.number().min(0).optional(),

  // Additional information
  notes: z.string().optional(),
  reference: z.string().optional(),
  purchaseOrderNumber: z.string().optional(),

  // Line items would typically be handled separately in a more complex form
})

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

// Transform schema to convert API data to form data
export const apiToFormSchema = z
  .function()
  .args(invoiceSchema)
  .returns(invoiceFormSchema)
  .implement((invoice) => {
    return {
      invoiceNumber: invoice.invoiceNumber || "",
      customerId: invoice.customer?.id,
      status: invoice.status || InvoiceStatus.Draft,
      dueDate: invoice.dueDate || "",
      balance: invoice.balance || 0,
      notes: invoice.notes || "",
      reference: invoice.reference || "",
      purchaseOrderNumber: invoice.purchaseOrderNumber || "",
    }
  })
