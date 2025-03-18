import React from "react"
import { useNavigate, useParams } from "react-router-dom"
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
  apiToFormSchema,
} from "@/types/product"
import useEditProduct from "@/hooks/product/useEditProduct"
import useProduct from "@/hooks/product/useProduct"
import { toast } from "sonner"
import useProducts from "@/hooks/product/useProducts"
import useAccounts from "@/hooks/account/useAccounts"

export const EditProductContainer: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  console.log("productId in EditProductContainer", id)
  const { data: product, isLoading } = useProduct(id ?? "")
  const { mutate: editProduct, isPending: isEditing } = useEditProduct(id ?? "")
  const { data: products = [], isLoading: isLoadingProducts } = useProducts()
  const { data: accounts = [], isLoading: isLoadingAccounts } = useAccounts()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      parentItem: "",
      itemType: ItemType.Product,
      itemCode: "",
      status: ItemStatus.Active,
      amountTaxStatus: ItemAmountTaxStatus.Inclusive,
      price: 0,
      description: "",
      ledgerAccount: "",
      taxRate: "GST", 
    },
    values: product ? apiToFormSchema.parse(product) : undefined,
  })

  const onSubmit = async (data: ProductFormValues) => {
    try {
      await editProduct(data)
      toast.success("Product updated successfully")
      navigate("/products")
    } catch (error) {
      toast.error("Failed to update product", {
        description: `Error: ${error}`,
      })
      console.error("Error updating product:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    )
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

                {/* Parent Item */}
                <FormField
                  control={form.control}
                  name="parentItem"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-secondary-500" />
                        Parent Item
                      </FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          disabled={isLoadingProducts}
                        >
                          <option value="">No Parent</option>
                          {products
                            .filter((p) => p.id !== id) // Prevent self-reference
                            .map((product) => (
                              <option key={product.id} value={product.name}>
                                {product.name}
                              </option>
                            ))}
                        </select>
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
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                          value={field.value}
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
                  disabled={isEditing}
                  className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {isEditing ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default EditProductContainer