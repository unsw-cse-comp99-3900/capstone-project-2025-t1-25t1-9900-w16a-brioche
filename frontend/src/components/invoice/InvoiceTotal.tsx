/**
 * @file InvoiceNotesAndTotals.tsx - Displays invoice notes and payment details input fields,
 * as well as a summary of calculated invoice totals including subtotal, discount, tax, and grand total.
 */

import React from "react"
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { InvoiceFormValues } from "@/types/invoice"

interface InvoiceNotesAndTotalsProps {
  form: UseFormReturn<InvoiceFormValues>
  totals: {
    subtotal: string
    discount: string
    totalExclTax: string
    tax: string
    total: string
  }
}

/**
 * InvoiceNotesAndTotals Component
 *
 * This component is used at the bottom of the invoice creation form.
 * It allows users to input notes and payment details, and displays calculated
 * invoice totals including subtotal, discounts, taxes, and the final total amount.
 *
 * @param {InvoiceNotesAndTotalsProps} props - Contains the form instance and computed total values.
 * @returns {JSX.Element} A UI section for notes and invoice total summary.
 */
const InvoiceNotesAndTotals: React.FC<InvoiceNotesAndTotalsProps> = ({
  form,
  totals,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Notes column */}
      <div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">NOTE:</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Note to customer"
                  className="min-h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">PAYMENT DETAILS:</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Payment details"
                  className="min-h-24"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Totals column */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <div className="flex items-center gap-2">
            <span>$</span>
            <span className="text-right min-w-16">{totals.subtotal}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Discount</span>
          <div className="flex items-center gap-2">
            <span>$</span>
            <span className="text-right min-w-16">{totals.discount}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total (excluding tax)</span>
          <div className="flex items-center gap-2">
            <span>$</span>
            <span className="text-right min-w-16">{totals.totalExclTax}</span>
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax</span>
          <div className="flex items-center gap-2">
            <span>$</span>
            <span className="text-right min-w-16">{totals.tax}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <div className="flex items-center gap-2">
            <span>$</span>
            <span className="text-right min-w-16">{totals.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceNotesAndTotals
