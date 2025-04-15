/**
 * @file useCreateCustomer.ts - Defines the `useCreateCustomer` hook for submitting new customer records to the Reckon API.
 * * Uses React Query's mutation API for side-effect handling.
 * * Input and output data are validated using Zod schemas.
 * * Automatically triggers a refetch of the customer list upon successful creation.
 */

/**
 * useCreateCustomer Hook
 *
 * * Sends a POST request to create a new customer for the current Reckon book.
 * * Parses and validates the input form data using `apiRequestSchema`.
 * * Parses and validates the response using `createCustomerResponseSchema`.
 * * On success, invalidates the `customers` query to refresh the list.
 *
 * @returns {UseMutationResult<CreateCustomerResponse, Error, CustomerFormValues>} Mutation object with state and mutate function.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthApi } from "@/lib/axios"
import {
  type CreateCustomerResponse,
  type CustomerFormValues,
  apiRequestSchema,
  createCustomerResponseSchema,
} from "@/types/customer"
import { getBookId } from "@/lib/utils"

/**
 * Custom hook to create a customer using the Reckon API
 * Uses React Query mutation and automatically invalidates the customers query
 */
export const useCreateCustomer = () => {
  const queryClient = useQueryClient()
  const authApi = useAuthApi()

  return useMutation<CreateCustomerResponse, Error, CustomerFormValues>({
    mutationFn: async (data: CustomerFormValues) => {
      console.log("Creating customer with data:", data)

      // Transform form data to API structure using Zod
      const apiData = apiRequestSchema.parse(data)

      // Dynamically get the bookId
      const bookId = getBookId()

      const response = await authApi.post(`/${bookId}/customers`, apiData)

      console.log("Create customer response:", response)

      // Parse and validate the response data
      const result = createCustomerResponseSchema.parse(response)
      return result
    },
    onSuccess: () => {
      // Invalidate the customers query to refetch the list
      queryClient.invalidateQueries({ queryKey: ["customers"] })
    },
  })
}

export default useCreateCustomer
