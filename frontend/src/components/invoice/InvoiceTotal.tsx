// src/components/invoice/InvoiceNotesAndTotals.tsx
import React from "react"
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

interface InvoiceNotesAndTotalsProps {
  form: any // Replace with the correct form type
  totals: {
    subtotal: string
    discount: string
    totalExclTax: string
    tax: string
    total: string
  }
}

const InvoiceNotesAndTotals: React.FC<InvoiceNotesAndTotalsProps> = ({ form, totals }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {/* Notes column */}
      <div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }: any) => (
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
          render={({ field }: any) => (
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