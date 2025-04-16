/**
 * @file CreateProductContainer.tsx - Defines the CreateProductContainer component, which manages the creation of new products.
 * It includes form handling, validation, and submission logic.
 */

/**
 * CreateProductContainer Component
 *
 * This component renders the main container for creating a new product, including form fields for product details,
 * pricing, and tax information. It handles form submission and validation.
 *
 * @returns {JSX.Element} The product creation container.
 */

import React from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import SectionHeader from "@/components/common/SectionHeader"
import {
  Package,
  ToggleRight,
  FileText,
  Save,
  X,
  DollarSign,
  Layers,
  BarcodeIcon,
  LucideCircleDot,
} from "lucide-react"
import {
  productFormSchema,
  type ProductFormValues,
  ItemType,
  ItemStatus,
  ItemAmountTaxStatus,
} from "@/types/product"
import { useCreateProduct } from "@/hooks/product/useCreateProduct"
import { toast } from "sonner"
import useAccounts from "@/hooks/account/useAccounts"

const CreateProductContainer: React.FC = () => {
  const navigate = useNavigate()
  const createProduct = useCreateProduct()
  const { data: accounts = [], isLoading: isLoadingAccounts } = useAccounts()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      itemType: ItemType.Product,
      itemCode: "",
      status: ItemStatus.Active,
      amountTaxStatus: ItemAmountTaxStatus.Inclusive,
      price: undefined,
      description: "",
      ledgerAccount: "",
      taxRate: "GST", // Default to GST
    },
  })

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await createProduct.mutateAsync(data)
      toast.success("Product created successfully")
      navigate("/products")
    } catch (
      error: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
      let errorMessage = "Failed to create product."

      const backendMessage = error?.response?.data?.message
      if (backendMessage) {
        errorMessage = Array.isArray(backendMessage)
          ? backendMessage.join("; ")
          : backendMessage
      } else if (error?.message) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else {
        errorMessage = JSON.stringify(error)
      }

      toast.error("Failed to create product", {
        description: errorMessage,
      })
      console.error("Error creating product:", error)
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
      <div className="px-4 py-5 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Product Information */}
            <div>
              <SectionHeader title="Basic Product Information" icon={Package} />
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-secondary-500" />
                        Product Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Item Type */}
                <FormField
                  control={form.control}
                  name="itemType"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <LucideCircleDot className="h-4 w-4 text-secondary-500" />
                        Item Type
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value={ItemType.Product}>Product</option>
                          <option value={ItemType.Service}>Service</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Item Code */}
                <FormField
                  control={form.control}
                  name="itemCode"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <BarcodeIcon className="h-4 w-4 text-secondary-500" />
                        Item Code
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <div className="flex items-center justify-between">
                        <FormLabel className="flex items-center gap-1">
                          <ToggleRight className="h-4 w-4 text-secondary-500" />
                          Status (Active)
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value === ItemStatus.Active}
                            onCheckedChange={(checked) =>
                              field.onChange(
                                checked
                                  ? ItemStatus.Active
                                  : ItemStatus.Inactive
                              )
                            }
                          />
                        </FormControl>
                      </div>
                      <FormDescription className="ml-5">
                        Toggle to set product as active or inactive
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount Tax Status */}
                <FormField
                  control={form.control}
                  name="amountTaxStatus"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-secondary-500" />
                        Amount Tax Status{" "}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value={ItemAmountTaxStatus.Inclusive}>
                            Inclusive (Gross)
                          </option>
                          <option value={ItemAmountTaxStatus.Exclusive}>
                            Exclusive (Net)
                          </option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Sale Information */}
            <div>
              <SectionHeader title="Sale Information" icon={DollarSign} />
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-secondary-500" />
                        Sale Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? undefined
                                : parseFloat(e.target.value)
                            )
                          }
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        {form.watch("amountTaxStatus") ===
                        ItemAmountTaxStatus.Inclusive
                          ? "Price includes tax (gross)"
                          : "Price excludes tax (net)"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tax Code */}
                <FormField
                  control={form.control}
                  name="taxRate"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-secondary-500" />
                        Tax Code
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          <option value="GST">GST (10%)</option>
                          <option value="FRE">FRE (0%)</option>
                          <option value="WET">WET (29%)</option>
                          <option value="WGST">WGST (12.9%)</option>
                          <option value="">None</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ledger Account */}
                <FormField
                  control={form.control}
                  name="ledgerAccount"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Layers className="h-4 w-4 text-secondary-500" />
                        Ledger Account <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={isLoadingAccounts}
                        >
                          <option value="">Select an account</option>
                          {accounts.map((account) => (
                            <option key={account.id} value={account.name}>
                              {account.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-6">
                      <FormLabel className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-secondary-500" />
                        Sale Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add sale description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-5">
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/products")}
                  className="bg-white py-2 px-4 border border-secondary-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createProduct.isPending}
                  className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {createProduct.isPending ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateProductContainer
