/**
 * @file customer.ts - Defines schemas for customer-related data, validation, and transformations.
 *
 * ** Contains data models and validation schemas for customer data.
 * ** Includes request and response schemas for interacting with the API, as well as form data handling.
 */

/**
 * Customer data schema based on actual Reckon API response
 *
 * This schema defines the structure of a customer object as returned by the Reckon API.
 * Validates fields such as name, status, and associated phone/electronic addresses.
 *
 * @returns {object} - Zod validation schema for customer data.
 */

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

/**
 * Customer Type Inference
 *
 * This type is inferred from the `customerSchema` using Zod's `infer` method.
 * It provides a TypeScript type representing a validated customer object.
 *
 * @returns {Customer} - Type for a valid customer object based on the schema.
 */
export type Customer = z.infer<typeof customerSchema>

/**
 * Customer Response Schema
 *
 * Defines the structure of the response object that contains a list of customers.
 * This schema expects an array of customers under the `list` key.
 *
 * @returns {object} - Zod schema for validating customer response with a list of customers.
 */
export const customerResponseSchema = z.object({
  list: z.array(customerSchema),
})

export type CustomerResponse = z.infer<typeof customerResponseSchema>

/**
 * CustomerQueryParams Interface
 *
 * Defines query parameters for customer data requests, such as pagination and filtering.
 *
 * @returns {CustomerQueryParams} - Interface representing the possible query parameters.
 */
export interface CustomerQueryParams {
  page?: number
  perPage?: number
  filter?: string
  orderby?: string
  select?: string
}

/**
 * Phone Number Input Schema
 *
 * Defines the validation schema for customer phone number inputs.
 * Ensures fields such as `countryCode`, `areaCode`, and `number` are properly validated.
 *
 * @returns {object} - Zod schema for validating phone number input.
 */
export const phoneNumberInputSchema = z.object({
  countryCode: z.string().optional(),
  areaCode: z.string().optional(),
  number: z.string().optional(),
  extension: z.string().optional(),
  type: z.string(),
})

/**
 * Electronic Address Input Schema
 *
 * Defines the validation schema for customer electronic address inputs.
 * Ensures that addresses such as websites and emails are properly formatted.
 *
 * @returns {object} - Zod schema for validating electronic address input.
 */
export const electronicAddressInputSchema = z.object({
  type: z.string(),
  address: z.string().optional(),
})

/**
 * Customer Input Schema
 *
 * Defines the structure for creating or updating customer data.
 * Validates fields such as `name`, `status`, and optional phone/electronic addresses.
 *
 * @returns {object} - Zod schema for customer input data.
 */
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

/**
 * Customer Form Schema
 *
 * Defines the structure for form-based customer data submission.
 * Handles form fields for customer information, electronic addresses, and phone numbers.
 *
 * @returns {object} - Zod schema for customer form data.
 */
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

/**
 * Customer Form Values Type
 *
 * Type representing the validated values from the customer form schema.
 * Used to infer the structure of customer data when submitting form data.
 *
 * @returns {CustomerFormValues} - Type for customer form submission data.
 */
export type CustomerFormValues = z.infer<typeof customerFormSchema>

/**
 * Create Customer Response Schema
 *
 * Defines the response schema when creating a customer.
 * Contains the `id` and `name` of the newly created customer.
 *
 * @returns {object} - Zod schema for the create customer response.
 */
export const createCustomerResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
})

/**
 * API Request Schema for Customer
 *
 * Transforms the customer form data into the required API request format.
 *
 * @returns {object} - Transformed data structure for API request.
 */
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

/**
 * Transform API Data to Customer Form Data
 *
 * This schema transforms API response data into form values for customer input.
 *
 * @returns {CustomerFormValues} - Customer form data inferred from API response.
 */
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

/**
 * Custom Book Schema
 *
 * Defines the structure for custom books in the Reckon API.
 * Represents a business entity that holds customer, invoice, and other data.
 *
 * @returns {object} - Zod schema for custom books.
 */
export const customBook = z.object({
  id: z.string(),
  name: z.string(),
})

/**
 * Customer Books Response Schema
 *
 * Defines the response schema when fetching customer books.
 * Contains an array of custom books.
 *
 * @returns {object} - Zod schema for customer books response.
 */
export const customerBooksResponseSchema = z.object({
  list: z.array(customBook),
})

/**
 * Customer Book Type
 *
 * Type inferred from the customBook schema, representing a valid customer book.
 *
 * @returns {CustomerBook} - Type representing a valid customer book object.
 */
export type CustomerBook = z.infer<typeof customBook>
