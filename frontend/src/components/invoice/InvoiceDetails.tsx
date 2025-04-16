/**
 * @file InvoiceDetails.tsx - Renders additional invoice input fields such as reference code and invoice discount.
 * It is a sub-section of the full invoice creation form and uses react-hook-form for controlled input management.
 */

import React from "react"
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Hash, Percent } from "lucide-react"
import SectionHeader from "@/components/common/SectionHeader"
import { UseFormReturn } from "react-hook-form"
import { InvoiceFormValues } from "@/types/invoice"

interface InvoiceDetailsProps {
  form: UseFormReturn<InvoiceFormValues>
}

/**
 * InvoiceDetails Component
 *
 * This component renders a section of the invoice creation form
 * that includes fields like reference code and invoice discount.
 *
 * @param {InvoiceDetailsProps} props - Contains react-hook-form instance with invoice form state.
 * @returns {JSX.Element} A JSX element that renders the additional invoice fields section.
 */
const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ form }) => {
  return (
    <div>
      <SectionHeader title="Additional Details" icon={Hash} />
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* Reference Code */}
        <FormField
          control={form.control}
          name="referenceCode"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="flex items-center gap-1">
                <Hash className="h-4 w-4 text-secondary-500" />
                Reference code
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Invoice Discount */}
        <FormField
          control={form.control}
          name="invoiceDiscount"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="flex items-center gap-1">
                <Percent className="h-4 w-4 text-secondary-500" />
                Invoice discount
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. 12.50% or $12.50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default InvoiceDetails
