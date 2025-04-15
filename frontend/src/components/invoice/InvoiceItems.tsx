import React from "react"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Trash, Plus, FileText } from "lucide-react"
import SectionHeader from "@/components/common/SectionHeader"
import { InvoiceFormValues } from "@/types/invoice"
import useProducts from "@/hooks/product/useProducts"
import { toast } from "sonner"

interface InvoiceItemsProps {
  form: UseFormReturn<InvoiceFormValues>
  isInvoiceReady?: boolean
}

/**
 * InvoiceItems Component
 *
 * This component renders a line-item table for invoice entry. Each row corresponds to
 * a single item selected from the product list. It supports auto-filling price and tax
 * based on product selection, dynamic calculations of tax and total amount, and the
 * ability to add or remove rows.
 *
 * @param {InvoiceItemsProps} props - Contains react-hook-form's form instance and optional flags.
 * @returns {JSX.Element} A responsive table with invoice item inputs.
 */
const InvoiceItems: React.FC<InvoiceItemsProps> = ({ form }) => {
  const { data: products = [] } = useProducts()
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  })

  const addNewRow = () => {
    // Check if we have at least one row and the last row has an item selected
    const currentRows = form.getValues("items") || []

    if (currentRows.length > 0) {
      const lastRow = currentRows[currentRows.length - 1]

      if (!lastRow.item) {
        // Show error toast if the last row doesn't have an item selected
        toast.error(
          "Please select an item for the current row before adding a new one."
        )
        return
      }
    }

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
    <div>
      <SectionHeader title="Invoice Items" icon={FileText} />
      <div className="mt-6">
        {/* Invoice Items Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Item <span className="text-red-500">*</span>
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
                                console.log("selectedProduct", selectedProduct)

                                if (selectedProduct?.sale) {
                                  const price = selectedProduct.sale.price || 0
                                  const taxPercent =
                                    selectedProduct.sale.taxRate?.percent || 0

                                  form.setValue(
                                    `items.${index}.itemPrice`,
                                    price.toString()
                                  )
                                  form.setValue(
                                    `items.${index}.description`,
                                    selectedProduct.sale?.description || ""
                                  )
                                  form.setValue(
                                    `items.${index}.taxCode`,
                                    selectedProduct.sale.taxRate?.name || ""
                                  )

                                  const currentQty = form.getValues(
                                    `items.${index}.qty`
                                  )
                                  if (
                                    !currentQty ||
                                    currentQty === "" ||
                                    currentQty === "0"
                                  ) {
                                    form.setValue(`items.${index}.qty`, "1")
                                  }

                                  const qty = Number(
                                    form.getValues(`items.${index}.qty`) || 0
                                  )

                                  if (qty && price && taxPercent) {
                                    const grossTotal = price * qty
                                    const taxAmount =
                                      grossTotal -
                                      grossTotal / (1 + taxPercent / 100)
                                    form.setValue(
                                      `items.${index}.tax`,
                                      taxAmount.toFixed(2)
                                    )
                                  }
                                }
                              }}
                            >
                              {!field.value && <option value=""> </option>}
                              {products.map((product) => (
                                <option key={product.id} value={product.id}>
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
                            <Input {...field} className="w-24" readOnly />
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
                            <Textarea {...field} className="min-h-10 w-32" />
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
                            <Input {...field} className="w-24" readOnly />
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
                            <Input {...field} className="w-20" readOnly />
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
                                Number(form.watch(`items.${index}.qty`) || 0) *
                                Number(
                                  form.watch(`items.${index}.itemPrice`) || 0
                                ) *
                                (1 -
                                  Number(
                                    form.watch(`items.${index}.discount`) || 0
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
  )
}

export default InvoiceItems
