import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SectionHeader from "@/components/common/SectionHeader"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Calendar as CalendarIcon,
  Plus,
  Save,
  X,
  User,
  CalendarDays,
  Clock,
  Hash,
  Percent,
  Send,
  FileText,
} from "lucide-react"
import { toast } from "sonner"
import { Trash } from "lucide-react"
import useCreateInvoice from "@/hooks/invoice/useCreateInvoice"

// Import types from invoice.ts
import { invoiceFormSchema, InvoiceFormValues } from "@/types/invoice"
import useProducts from "@/hooks/product/useProducts"
import useCustomers from "@/hooks/customer/useCustomers"
import usePaymentTerms from "@/hooks/payment/usePaymentTerms"
import { useDueDate } from "@/hooks/payment/useDueDate"

interface CreateInvoiceContainerProps {
  initialData?: InvoiceFormValues
}

const CreateInvoiceContainer: React.FC<CreateInvoiceContainerProps> = ({
  initialData,
}) => {
  const navigate = useNavigate()
  const [isSending] = useState(false)

  const { data: products = [] } = useProducts()
  const { data: customers = [], isLoading: isLoadingCustomers } = useCustomers()
  const { data: paymentTerms = [], isLoading: isLoadingPaymentTerms } =
    usePaymentTerms()

  // Use the createInvoice mutation hook
  const createInvoice = useCreateInvoice()

  const [totals, setTotals] = useState({
    subtotal: "0.00",
    discount: "0.00",
    totalExclTax: "0.00",
    tax: "0.00",
    total: "0.00",
  })

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: initialData || {
      customer: "",
      invoiceDate: new Date(),
      dueDate: undefined,
      referenceCode: "",
      invoiceDiscount: "",
      items: [
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
    },
  })

  const paymentTermId = useWatch({
    control: form.control,
    name: "paymentTerms",
  })
  const invoiceDate = useWatch({ control: form.control, name: "invoiceDate" })

  const formattedInvoiceDate = invoiceDate
    ? format(new Date(invoiceDate), "yyyy-MM-dd")
    : ""

  const { data: dueDateData } = useDueDate(
    paymentTermId || "",
    formattedInvoiceDate
  )

  useEffect(() => {
    if (!dueDateData?.dueDate) {
      console.log("⚠️ API did not return a valid dueDate, using invoiceDate.")
      return
    }

    form.setValue("dueDate", new Date(dueDateData.dueDate))
    console.log("📆 Due Date updated:", new Date(dueDateData.dueDate))
  }, [dueDateData, form])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      const items = value.items || []
      const discountInput = value.invoiceDiscount || ""

      let subtotal = 0
      let lineItemTotalTax = 0

      items.forEach((item, index) => {
        if (!item) return

        const qty = parseFloat(item.qty || "0")
        const price = parseFloat(item.itemPrice || "0")
        const discountPercent = parseFloat(item.discount || "0")
        const taxPercent = (() => {
          const selected = products.find((p) => p.id === item.item)
          return selected?.sale?.taxRate?.percent || 0
        })()

        const lineGross = qty * price
        const lineDiscounted = lineGross * (1 - discountPercent / 100)
        const tax = lineDiscounted - lineDiscounted / (1 + taxPercent / 100)

        // Update line item tax when discount changes
        if (name?.includes(`items.${index}.discount`)) {
          form.setValue(`items.${index}.tax`, tax.toFixed(2))
        }

        subtotal += lineDiscounted
        lineItemTotalTax += tax
      })

      // Invoice-level discount
      let invoiceDiscount = 0
      if (discountInput.includes("%")) {
        invoiceDiscount =
          (subtotal * parseFloat(discountInput.replace("%", ""))) / 100
      } else if (discountInput.includes("$")) {
        invoiceDiscount = parseFloat(discountInput.replace("$", ""))
      } else {
        invoiceDiscount = parseFloat(discountInput || "0")
      }

      const grandTotal = subtotal - invoiceDiscount
      const finalTotalTax =
        subtotal !== 0 ? lineItemTotalTax * (grandTotal / subtotal) : 0
      const totalExclTax = subtotal - invoiceDiscount - lineItemTotalTax

      setTotals({
        subtotal: subtotal.toFixed(2),
        discount: invoiceDiscount.toFixed(2),
        totalExclTax: totalExclTax.toFixed(2),
        tax: finalTotalTax.toFixed(2),
        total: grandTotal.toFixed(2),
      })
    })

    return () => subscription.unsubscribe()
  }, [form, products])

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (!name?.includes("items")) return

      const indexMatch = name.match(/^items\.(\d+)\.qty$/)
      if (!indexMatch) return

      const index = Number(indexMatch[1])
      const itemId = value.items?.[index]?.item
      const qty = Number(value.items?.[index]?.qty || 0)

      const selected = products.find((p) => p.id === itemId)
      const price = selected?.sale?.price || 0
      const percent = selected?.sale?.taxRate?.percent || 0

      if (qty && price && percent) {
        const gross = qty * price
        const discountPercent = parseFloat(
          value.items?.[index]?.discount || "0"
        )
        const discounted = gross * (1 - discountPercent / 100)
        const taxAmount = discounted - discounted / (1 + percent / 100)
        form.setValue(`items.${index}.tax`, taxAmount.toFixed(2))
      }
    })

    return () => subscription.unsubscribe()
  }, [form, products])

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  })

  const onSubmit = async (data: InvoiceFormValues) => {
    try {
      // Use the mutation to create the invoice
      console.log(data)
      await createInvoice.mutateAsync(data)

      toast.success("Invoice created successfully")
      navigate("/invoices")
    } catch (error) {
      toast.error("Failed to create invoice", {
        description: `Error: ${error}`,
      })
      console.error("Error creating invoice:", error)
    }
  }

  const sendInvoice = async () => {
    console.log("e")
  }

  const addNewRow = () => {
    append({
      item: "",
      itemPrice: "",
      description: "",
      qty: "",
      discount: "",
      taxCode: "",
      tax: "",
      amount: "",
    })
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
      <div className="px-4 py-5 sm:p-6">
        {/* Top Action Buttons */}
        <div className="flex justify-end mb-4 space-x-2">
          <Button
            type="button"
            onClick={sendInvoice}
            disabled={isSending}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
          >
            <Send className="h-4 w-4" />
            {isSending ? "Sending..." : "Send"}
          </Button>
          <Button
            type="button"
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={createInvoice.isPending}
            className="bg-primary-600 hover:bg-primary-700 text-white flex items-center gap-1"
          >
            <Save className="h-4 w-4" />
            {createInvoice.isPending ? "Saving..." : "Save"}
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Invoice Information */}
            <div>
              <SectionHeader title="Invoice Information" icon={FileText} />
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Customer */}
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <User className="h-4 w-4 text-secondary-500" />
                        Customer <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={isLoadingCustomers}
                        >
                          <option value="">None</option>
                          {customers.map((customer) => (
                            <option key={customer.id} value={customer.name}>
                              {customer.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Invoice Date */}
                <FormField
                  control={form.control}
                  name="invoiceDate"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-secondary-500" />
                        Invoice date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>dd/MM/yyyy</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Payment Terms */}
                <FormField
                  control={form.control}
                  name="paymentTerms"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-secondary-500" />
                        Payment terms
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={isLoadingPaymentTerms}
                        >
                          <option value="">None</option>
                          {paymentTerms.map((term) => (
                            <option key={term.id} value={term.id}>
                              {term.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Due Date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-secondary-500" />
                        Due date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>dd/MM/yyyy</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Additional Invoice Information */}
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

            {/* Invoice Items */}
            <div>
              <SectionHeader title="Invoice Items" icon={FileText} />
              <div className="mt-6">
                {/* Invoice Items Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Item price
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Qty
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Discount(%)
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Tax code
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Tax
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fields.map((field, index) => (
                        <tr key={field.id}>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.item`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <select
                                      className="w-48 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                      value={field.value || ""}
                                      onChange={(e) => {
                                        const selectedProductId = e.target.value
                                        field.onChange(selectedProductId)

                                        const selectedProduct = products.find(
                                          (p) => p.id === selectedProductId
                                        )
                                        console.log(
                                          "🎯 selectedProduct",
                                          selectedProduct
                                        )

                                        if (selectedProduct?.sale) {
                                          const price =
                                            selectedProduct.sale.price || 0
                                          const taxPercent =
                                            selectedProduct.sale.taxRate
                                              ?.percent || 0

                                          form.setValue(
                                            `items.${index}.itemPrice`,
                                            price.toString()
                                          )
                                          form.setValue(
                                            `items.${index}.taxCode`,
                                            selectedProduct.sale.taxRate?.id ||
                                              ""
                                          )

                                          const qty = Number(
                                            form.getValues(
                                              `items.${index}.qty`
                                            ) || 0
                                          )

                                          if (qty && price && taxPercent) {
                                            const grossTotal = price * qty
                                            const taxAmount =
                                              grossTotal -
                                              grossTotal /
                                                (1 + taxPercent / 100)
                                            form.setValue(
                                              `items.${index}.tax`,
                                              taxAmount.toFixed(2)
                                            )
                                          }
                                        }
                                      }}
                                    >
                                      <option value="">None</option>
                                      {products.map((product) => (
                                        <option
                                          key={product.id}
                                          value={product.id}
                                        >
                                          {product.name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.itemPrice`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="w-24"
                                      readOnly
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.description`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      {...field}
                                      className="min-h-10 w-32"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.qty`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} className="w-16" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.discount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} className="w-20" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.taxCode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <select
                                      className="w-24 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                      value={field.value || ""}
                                      onChange={(e) =>
                                        field.onChange(e.target.value)
                                      }
                                    >
                                      <option value="">None</option>
                                      {Array.from(
                                        new Map(
                                          products
                                            .map((p) => p.sale?.taxRate)
                                            .filter(
                                              (
                                                tr
                                              ): tr is NonNullable<typeof tr> =>
                                                !!tr?.id
                                            )
                                            .map((taxRate) => [
                                              taxRate.id,
                                              taxRate,
                                            ])
                                        ).values()
                                      ).map((taxRate) => (
                                        <option
                                          key={taxRate.id}
                                          value={taxRate.id}
                                        >
                                          {taxRate.name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.tax`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} className="w-20" />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2">
                            <FormField
                              control={form.control}
                              name={`items.${index}.amount`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="w-24"
                                      value={(
                                        Number(
                                          form.watch(`items.${index}.qty`) || 0
                                        ) *
                                        Number(
                                          form.watch(
                                            `items.${index}.itemPrice`
                                          ) || 0
                                        ) *
                                        (1 -
                                          Number(
                                            form.watch(
                                              `items.${index}.discount`
                                            ) || 0
                                          ) /
                                            100)
                                      ).toFixed(2)}
                                      readOnly
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </td>
                          <td className="px-1 py-2 text-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => remove(index)}
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add New Row Button */}
                <div className="mt-4">
                  <Button
                    type="button"
                    onClick={addNewRow}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add new row
                  </Button>
                </div>
              </div>
            </div>

            {/* Note and Totals */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Notes */}
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
                      <FormLabel className="font-bold">
                        PAYMENT DETAILS:
                      </FormLabel>
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

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <div className="flex items-center gap-2">
                    <span>$</span>
                    <span className="text-right min-w-16">
                      {totals.subtotal}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Discount</span>
                  <div className="flex items-center gap-2">
                    <span>$</span>
                    <span className="text-right min-w-16">
                      {totals.discount}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total (excluding tax)</span>
                  <div className="flex items-center gap-2">
                    <span>$</span>
                    <span className="text-right min-w-16">
                      {totals.totalExclTax}
                    </span>
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

            {/* Form Actions */}
            <div className="pt-5">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/invoices")}
                  className="bg-white py-2 px-4 border border-secondary-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createInvoice.isPending}
                  className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {createInvoice.isPending ? "Creating..." : "Create Invoice"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateInvoiceContainer
