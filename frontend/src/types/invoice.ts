/**
 * @file invoice.ts - Defines schemas for invoice-related data, validation, and transformations.
 *
 * ** Contains Zod schemas for invoice creation, validation, and transformation between form and API data.
 * ** Includes schemas for line items, customer, tax, payment terms, and more.
 * ** Provides helper functions to convert form data to API request format and vice versa.
 */

import { z } from "zod"

/**
 * AmountTaxStatus Enum
 *
 * Represents the tax status of an invoice, indicating whether taxes are included, excluded, or non-taxable.
 * Used to determine how tax is applied to the invoice.
 *
 * @returns {object} - Object with tax status options such as NonTaxed, Inclusive, and Exclusive.
 */
export const AmountTaxStatus = {
  NonTaxed: "NonTaxed",
  Inclusive: "Inclusive",
  Exclusive: "Exclusive",
} as const

/**
 * InvoiceStatus Enum
 *
 * Represents the various statuses that an invoice can have in the system.
 * Includes statuses like Draft, Approved, Paid, Overdue, and Pending.
 *
 * @returns {object} - Invoice status options such as Draft, Approved, Paid, etc.
 */
export const InvoiceStatus = {
  Draft: "Draft",
  Approved: "Approved",
  Paid: "Paid",
  Overdue: "Overdue", // Added for UI purposes
  Pending: "Pending", // Added for UI purposes
} as const

/**
 * EmailStatus Enum
 *
 * Represents the status of an email sent for invoice notifications.
 * Useful for tracking email delivery progress.
 *
 * @returns {object} - Email status options such as Unsent, Processing, Sent, etc.
 */
export const EmailStatus = {
  Unsent: "Unsent",
  Processing: "Processing",
  Processed: "Processed",
  Sent: "Sent",
  Failed: "Failed",
} as const

/**
 * LineItemRowType Enum
 *
 * Represents different types of rows in an invoice's line items.
 * Can either be "Data" or "Group".
 *
 * @returns {object} - Line item row types like Data and Group.
 */
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
// const ledgerAccountRefSchema = referenceSchema

// TemplateRef
const templateRefSchema = referenceSchema

// ItemRef
const itemRefSchema = referenceSchema

// PaymentTermRef
// PaymentTermRef Schema (update)
const paymentTermRefSchema = z
  .object({
    id: z.string(), // Payment Term ID
    name: z.string(), // Payment Term Name
    description: z.string().optional(),
    netDueDay: z.number().optional(),
  })
  .nullable()
  .optional()

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
// const invoiceLineItemAccountDetailsSchema = z
//   .object({
//     ledgerAccount: ledgerAccountRefSchema,
//     quantity: z.number().nullable().optional(),
//     amount: z.number().nullable().optional(),
//   })
//   .nullable()
//   .optional()

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
    itemDetails: invoiceLineItemItemDetailsSchema,
    // accountDetails: invoiceLineItemAccountDetailsSchema,
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
  // accountsReceivableLedgerAccount: ledgerAccountRefSchema,
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
    invoiceSchema.passthrough()
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

// Updated InvoiceFormLineItem schema for form input
export const invoiceFormLineItemSchema = z.object({
  item: z.string().optional(),
  itemPrice: z.string().optional(),
  // account: z.string().optional(),
  description: z.string().optional(),
  qty: z.string().optional(),
  discount: z.string().optional(),
  taxCode: z.string().optional(),
  tax: z.string().optional(),
  amount: z.string().optional(),
  calculatedDiscountAmount: z.string().optional(),
})

export type InvoiceFormLineItem = z.infer<typeof invoiceFormLineItemSchema>

// Updated Invoice Form Schema for Create/Edit based on the form
export const invoiceFormSchema = z.object({
  // Basic customer information
  customer: z.string().min(1, { message: "Customer is required" }),

  // Dates
  invoiceDate: z.date(),
  dueDate: z.date().optional(),

  // Invoice information
  paymentTerms: z.string().optional(),
  referenceCode: z.string().optional(),

  // Pricing information
  invoiceDiscount: z.string().optional(),

  // Line items
  items: z.array(invoiceFormLineItemSchema),

  // Additional information
  note: z.string().optional(),
  paymentDetails: z.string().optional(),
})

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

// Helper function to convert form data to API model
export const formToApiSchema = (formData: InvoiceFormValues) => {
  // Parse invoice discount to get amount or percentage
  // let invoiceDiscountAmount: number | null = null
  // let invoiceDiscountPercent: number | null = null

  // if (formData.invoiceDiscount) {
  //   if (formData.invoiceDiscount.includes('%')) {
  //     invoiceDiscountPercent = parseFloat(formData.invoiceDiscount.replace('%', ''))
  //   } else if (formData.invoiceDiscount.includes('$')) {
  //     invoiceDiscountAmount = parseFloat(formData.invoiceDiscount.replace('$', ''))
  //   } else {
  //     // Assume it's an amount if no symbol
  //     invoiceDiscountAmount = parseFloat(formData.invoiceDiscount)
  //   }
  // }

  let invoiceDiscountAmount: number | null = null
  let invoiceDiscountPercent: number | null = null

  if (formData.invoiceDiscount) {
    if (formData.invoiceDiscount.includes("%")) {
      invoiceDiscountPercent = parseFloat(
        formData.invoiceDiscount.replace("%", "")
      )
    } else if (formData.invoiceDiscount.includes("$")) {
      invoiceDiscountAmount = parseFloat(
        formData.invoiceDiscount.replace("$", "")
      )
    } else {
      invoiceDiscountAmount = parseFloat(formData.invoiceDiscount)
    }
  }

  // Calculate totals from line items
  const lineItems = formData.items.map((item, index) => {
    const hasItem = !!item.item
    // const hasAccount = !!item.account

    return {
      lineNumber: index + 1,

      ...(hasItem && {
        itemDetails: {
          item: item.item,
          price: Number(item.itemPrice) || undefined,
          quantity: Number(item.qty) || undefined,
          discountPercent: item.discount
            ? parseFloat(item.discount)
            : undefined,
        },
      }),

      // ...(hasAccount &&
      //   !hasItem && {
      //     accountDetails: {
      //       ledgerAccount: item.account,
      //       quantity: Number(item.qty) || undefined,
      //       amount: (Number(item.itemPrice) || 0) * (Number(item.qty) || 0),
      //     },
      //   }),

      description: item.description,
      taxRate: item.taxCode || undefined,
      taxAmount: item.tax ? parseFloat(item.tax) : undefined,
    }
  })

  return {
    customer: formData.customer,
    invoiceDate: formData.invoiceDate.toISOString().split("T")[0],
    dueDate: formData.dueDate
      ? formData.dueDate.toISOString().split("T")[0]
      : null,
    paymentTerms: formData.paymentTerms,
    reference: formData.referenceCode || null,
    lineItems,
    notes: formData.note,
    paymentDetails: formData.paymentDetails,
    template: "Professional invoice", // required in update
    amountTaxStatus: AmountTaxStatus.Inclusive, // Default to inclusive tax
    ...(invoiceDiscountAmount !== null && { invoiceDiscountAmount }),
    ...(invoiceDiscountPercent !== null && { invoiceDiscountPercent }),
  }
}

// Helper function to convert API data to form data
export const apiToFormSchema = (invoice: Invoice): InvoiceFormValues => {
  // Format invoice discount
  let invoiceDiscount = ""
  if (invoice.invoiceDiscountPercent) {
    invoiceDiscount = `${invoice.invoiceDiscountPercent}%`
  } else if (invoice.invoiceDiscountAmount) {
    invoiceDiscount = `$${invoice.invoiceDiscountAmount}`
  }

  // Convert line items
  const items =
    invoice.lineItems?.map((lineItem) => {
      return {
        item: lineItem?.itemDetails?.item?.id || "",
        itemPrice: lineItem?.itemDetails?.price?.toString() || "",
        // account: lineItem?.accountDetails?.ledgerAccount?.id || "",
        description: lineItem?.description || "",
        qty: lineItem?.itemDetails?.quantity?.toString() || "",
        discount: lineItem?.itemDetails?.discountPercent?.toString() || "",
        taxCode: lineItem?.taxRate?.name || "",
        tax: lineItem?.taxAmount?.toString() || "",
        amount:
          lineItem?.itemDetails?.price && lineItem?.itemDetails?.quantity
            ? (
                lineItem.itemDetails.price * lineItem.itemDetails.quantity
              ).toString()
            : "",
      }
    }) || []

  return {
    customer: invoice.customer?.name || "",
    invoiceDate: invoice.invoiceDate
      ? new Date(invoice.invoiceDate)
      : new Date(),
    dueDate: invoice.dueDate ? new Date(invoice.dueDate) : undefined,
    paymentTerms: invoice.paymentTerms?.id || "",
    referenceCode: invoice.reference || "",
    invoiceDiscount,
    items:
      items.length > 0
        ? items
        : [
            {
              item: "",
              itemPrice: "",
              description: "",
              qty: "",
              discount: "",
              taxCode: "",
              tax: "",
              amount: "",
            },
          ],
    note: invoice.notes || "",
    paymentDetails: invoice.paymentDetails || "",
  }
}
// Add: Elevate some fields to the top level for easy DataTable searching and sorting
export const invoiceTopLevelSchema = invoiceSchema.transform((data) => ({
  ...data,
  customerName: data.customer?.name || "",
}))

export type InvoiceTopLevel = z.infer<typeof invoiceTopLevelSchema>
