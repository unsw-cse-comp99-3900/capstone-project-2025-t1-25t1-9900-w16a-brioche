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
  User,
  ToggleRight,
  Phone,
  Smartphone,
  Mail,
  Globe,
  FileText,
  Save,
  X,
  Building,
} from "lucide-react"
import { customerFormSchema, type CustomerFormValues } from "@/types/customer"
import { useCreateCustomer } from "@/hooks/customer/useCreateCustomer"
import { toast } from "sonner"

const CreateCustomerContainer: React.FC = () => {
  const navigate = useNavigate()
  const createCustomer = useCreateCustomer()

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      status: "Active",
      website: { type: "Web", address: "" },
      emailAddress: { type: "Email", address: "" },
      mobileNumber: { type: "Mobile", countryCode: "", number: "" },
      phoneNumber: {
        type: "Phone",
        countryCode: "",
        areaCode: "",
        number: "",
        extension: "",
      },
    },
  })

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      await createCustomer.mutateAsync(data)
      toast.success("Customer created successfully")
      navigate("/customers")
    } catch (error) {
      toast.error("Failed to create customer", {
        description: `Error: ${error}`,
      })
      console.error("Error creating customer:", error)
    }
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
      <div className="px-4 py-5 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Customer Information */}
            <div>
              <SectionHeader title="Basic Customer Information" icon={User} />
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Customer Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <User className="h-4 w-4 text-secondary-500" />
                        Customer Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Organization Name */}
                <FormField
                  control={form.control}
                  name="organisationName"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-secondary-500" />
                        Organization Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Branch */}
                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel>Branch</FormLabel>
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
                            checked={field.value === "Active"}
                            onCheckedChange={(checked) =>
                              field.onChange(checked ? "Active" : "Inactive")
                            }
                          />
                        </FormControl>
                      </div>
                      <FormDescription className="ml-5">
                        Toggle to set customer as active or inactive
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <SectionHeader title="Contact Information" icon={Phone} />
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Mobile Number */}
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Smartphone className="h-4 w-4 text-secondary-500" />
                        Mobile Number
                      </FormLabel>
                      <div className="mt-1 grid grid-cols-12 gap-2">
                        <div className="col-span-3">
                          <Input
                            placeholder="+61"
                            {...field}
                            value={field.value?.countryCode}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                countryCode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-9">
                          <Input
                            placeholder="Mobile Number"
                            {...field}
                            value={field.value?.number}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                number: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-secondary-500" />
                        Phone Number
                      </FormLabel>
                      <div className="mt-1 grid grid-cols-12 gap-2">
                        <div className="col-span-3">
                          <Input
                            placeholder="+61"
                            {...field}
                            value={field.value?.countryCode}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                countryCode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            placeholder="Area"
                            {...field}
                            value={field.value?.areaCode}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                areaCode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-4">
                          <Input
                            placeholder="Number"
                            {...field}
                            value={field.value?.number}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                number: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            placeholder="Ext"
                            {...field}
                            value={field.value?.extension}
                            onChange={(e) =>
                              field.onChange({
                                ...field.value,
                                extension: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Address */}
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-secondary-500" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          {...field}
                          value={field.value?.address}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              address: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Website */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-3">
                      <FormLabel className="flex items-center gap-1">
                        <Globe className="h-4 w-4 text-secondary-500" />
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          {...field}
                          value={field.value?.address}
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              address: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <SectionHeader title="Additional Information" icon={FileText} />
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-6">
                      <FormLabel className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-secondary-500" />
                        Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add any additional notes about this customer"
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
                  onClick={() => navigate("/customers")}
                  className="bg-white py-2 px-4 border border-secondary-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createCustomer.isPending}
                  className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  {createCustomer.isPending ? "Creating..." : "Create Customer"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCustomerContainer
