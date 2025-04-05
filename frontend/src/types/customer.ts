import { z } from "zod"

/**
 * Customer data schema based on actual Reckon API response
 */
export const customerSchema = z.object({
  id: z.string(),
  name: z.string(),
  organisationName: z.string().optional().nullable(),
  branch: z.string().nullable(),
  notes: z.string().nullable(),
  businessNumber1: z.string().nullable(),
  businessNumber2: z.string().nullable(),
  businessNumber: z.string().nullable(),
  entityTypes: z.object({
    isCustomer: z.boolean(),
    isSupplier: z.boolean(),
    isEmployee: z.boolean(),
    isSuperfund: z.boolean(),
  }),
  status: z.string(),
  electronicAddresses: z
    .array(
      z.object({
        id: z.string().optional(),
        address: z.string().optional(),
        type: z.object({
          id: z.string().optional(),
          name: z.string(),
        }),
      })
    )
    .default([]),
  phoneNumbers: z
    .array(
      z.object({
        id: z.string().optional(),
        countryCode: z.string().optional(),
        areaCode: z.string().optional(),
        number: z.string().optional(),
        extension: z.string().optional(),
        type: z.object({
          id: z.string().optional(),
          name: z.string(),
        }),
      })
    )
    .default([]),
  addresses: z.array(z.any()).default([]),
  contacts: z.array(z.any()).default([]),
  balance: z.number().nullable(),
  lastModifiedDateTime: z.string(),
  creditLimit: z.number().nullable(),
  paymentTerms: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
  }),
  invoiceCount: z.number().nullable(),
  transactionPassword: z.string().nullable(),
  excludeFromInvoiceReminders: z.boolean().nullable(),
})

// Define the type from the schema
export type Customer = z.infer<typeof customerSchema>

// Define the response schema for the API based on actual response
export const customerResponseSchema = z.object({
  list: z.array(customerSchema),
})

export type CustomerResponse = z.infer<typeof customerResponseSchema>

// Query parameters type
export interface CustomerQueryParams {
  page?: number
  perPage?: number
  filter?: string
  orderby?: string
  select?: string
}

// API Input Types as Zod Schemas
export const phoneNumberInputSchema = z.object({
  countryCode: z.string().optional(),
  areaCode: z.string().optional(),
  number: z.string().optional(),
  extension: z.string().optional(),
  type: z.string(),
})

export const electronicAddressInputSchema = z.object({
  type: z.string(),
  address: z.string().optional(),
})

export const customerInputSchema = z.object({
  name: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  organisationName: z.string().optional(),
  branch: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  phoneNumbers: z.array(phoneNumberInputSchema).optional(),
  electronicAddresses: z.array(electronicAddressInputSchema).optional(),
})

export type PhoneNumberInput = z.infer<typeof phoneNumberInputSchema>
export type ElectronicAddressInput = z.infer<
  typeof electronicAddressInputSchema
>
export type CustomerInput = z.infer<typeof customerInputSchema>

// Form Schema
export const customerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  organisationName: z.string().optional(),
  branch: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["Active", "Inactive"]).default("Active"),
  // Electronic Addresses
  website: electronicAddressInputSchema.optional().default({
    type: "Web",
    address: "",
  }),
  emailAddress: electronicAddressInputSchema.optional().default({
    type: "Email",
    address: "",
  }),
  // Phone Numbers
  mobileNumber: phoneNumberInputSchema.optional().default({
    type: "Mobile",
    countryCode: "",
    number: "",
  }),
  phoneNumber: phoneNumberInputSchema.optional().default({
    type: "Phone",
    countryCode: "",
    areaCode: "",
    number: "",
    extension: "",
  }),
})

export type CustomerFormValues = z.infer<typeof customerFormSchema>

// Define the response schema for create customer
export const createCustomerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
})

// Define a transform schema to convert form values to API structure
export const apiRequestSchema = customerFormSchema.transform((data) => ({
  name: data.name,
  organisationName: data.organisationName || undefined,
  branch: data.branch || undefined,
  notes: data.notes || undefined,
  status: data.status,
  phoneNumbers: [
    ...(data.phoneNumber?.number ? [data.phoneNumber] : []),
    ...(data.mobileNumber?.number ? [data.mobileNumber] : []),
  ],
  electronicAddresses: [
    ...(data.emailAddress?.address ? [data.emailAddress] : []),
    ...(data.website?.address ? [data.website] : []),
  ],
}))

export type CreateCustomerResponse = z.infer<
  typeof createCustomerResponseSchema
>

// Transform schema to convert API data to form data
export const apiToFormSchema = customerSchema.transform(
  (data): CustomerFormValues => {
    // Find email and website from electronic addresses
    const emailAddress = data.electronicAddresses?.find(
      (addr) => addr.type.name === "Email"
    ) || { type: "Email", address: "" }
    const website = data.electronicAddresses?.find(
      (addr) => addr.type.name === "Web"
    ) || { type: "Web", address: "" }

    // Find mobile and phone numbers
    const mobileNumber = data.phoneNumbers?.find(
      (phone) => phone.type.name === "Mobile"
    ) || { type: "Mobile", countryCode: "", number: "" }
    const phoneNumber = data.phoneNumbers?.find(
      (phone) => phone.type.name === "Phone"
    ) || {
      type: "Phone",
      countryCode: "",
      areaCode: "",
      number: "",
      extension: "",
    }

    return {
      name: data.name,
      organisationName: data.organisationName || undefined,
      branch: data.branch || undefined,
      notes: data.notes || undefined,
      status: data.status as "Active" | "Inactive",
      website: {
        type: "Web",
        address: website.address || "",
      },
      emailAddress: {
        type: "Email",
        address: emailAddress.address || "",
      },
      mobileNumber: {
        type: "Mobile",
        countryCode: mobileNumber.countryCode || "",
        number: mobileNumber.number || "",
      },
      phoneNumber: {
        type: "Phone",
        countryCode: phoneNumber.countryCode || "",
        areaCode: phoneNumber.areaCode || "",
        number: phoneNumber.number || "",
        extension: phoneNumber.extension || "",
      },
    }
  }
)

export const customBook = z.object({
  id: z.string(),
  name: z.string(),
})

export const customerBooksResponseSchema = z.object({
  list: z.array(customBook),
})

export type CustomerBook = z.infer<typeof customBook>
