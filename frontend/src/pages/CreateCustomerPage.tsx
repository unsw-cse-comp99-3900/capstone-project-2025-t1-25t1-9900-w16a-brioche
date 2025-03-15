import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
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
  UserPlus,
} from "lucide-react"

const CreateCustomerPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
    // Implement form submission logic here
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader
              title="Create Customer"
              icon={UserPlus}
              gradient={true}
            />
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    {/* Basic Customer Information */}
                    <div>
                      <SectionHeader
                        title="Basic Customer Information"
                        icon={User}
                      />
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        {/* Customer Name (Required) */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="name"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <User className="h-4 w-4 text-secondary-500" />
                            Customer Name{" "}
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="mt-1">
                            <Input
                              id="name"
                              name="name"
                              required
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Organization Name */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="organisationName"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <Building className="h-4 w-4 text-secondary-500" />
                            Organization Name
                          </Label>
                          <div className="mt-1">
                            <Input
                              id="organisationName"
                              name="organisationName"
                              className="shadow-sm block w-full sm:text-sm border-secondary-300 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Branch */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="branch"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            Branch
                          </Label>
                          <div className="mt-1">
                            <Input
                              id="branch"
                              name="branch"
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Status (Switch) */}
                        <div className="sm:col-span-3">
                          <div className="flex items-center justify-between">
                            <Label
                              htmlFor="status"
                              className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                            >
                              <ToggleRight className="h-4 w-4 text-secondary-500" />
                              Status (Active)
                            </Label>
                            <Switch id="status" name="status" defaultChecked />
                          </div>
                          <p className="mt-1 text-sm text-secondary-500 ml-5">
                            Toggle to set customer as active or inactive
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <SectionHeader title="Contact Information" icon={Phone} />
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        {/* Mobile Number */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="mobileNumber"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <Smartphone className="h-4 w-4 text-secondary-500" />
                            Mobile Number
                          </Label>
                          <div className="mt-1 grid grid-cols-12 gap-2">
                            <div className="col-span-3">
                              <Input
                                id="mobileCountryCode"
                                name="mobileCountryCode"
                                placeholder="+1"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                              />
                            </div>
                            <div className="col-span-9">
                              <Input
                                id="mobileNumber"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Phone Number */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="phoneNumber"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <Phone className="h-4 w-4 text-secondary-500" />
                            Phone Number
                          </Label>
                          <div className="mt-1 grid grid-cols-12 gap-2">
                            <div className="col-span-3">
                              <Input
                                id="countryCode"
                                name="countryCode"
                                placeholder="+1"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                              />
                            </div>
                            <div className="col-span-3">
                              <Input
                                id="areaCode"
                                name="areaCode"
                                placeholder="Area"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                              />
                            </div>
                            <div className="col-span-4">
                              <Input
                                id="number"
                                name="number"
                                placeholder="Number"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                              />
                            </div>
                            <div className="col-span-2">
                              <Input
                                id="extension"
                                name="extension"
                                placeholder="Ext"
                                className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Email Address */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="emailAddress"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <Mail className="h-4 w-4 text-secondary-500" />
                            Email Address
                          </Label>
                          <div className="mt-1">
                            <Input
                              id="emailAddress"
                              name="emailAddress"
                              type="email"
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                            />
                          </div>
                        </div>

                        {/* Website */}
                        <div className="sm:col-span-3">
                          <Label
                            htmlFor="website"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <Globe className="h-4 w-4 text-secondary-500" />
                            Website
                          </Label>
                          <div className="mt-1">
                            <Input
                              id="website"
                              name="website"
                              type="url"
                              placeholder="https://example.com"
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <SectionHeader
                        title="Additional Information"
                        icon={FileText}
                      />
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                          <Label
                            htmlFor="notes"
                            className="text-sm font-medium text-secondary-700 flex items-center gap-1"
                          >
                            <FileText className="h-4 w-4 text-secondary-500" />
                            Notes
                          </Label>
                          <div className="mt-1">
                            <Textarea
                              id="notes"
                              name="notes"
                              placeholder="Add any additional notes about this customer"
                              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-secondary-300 rounded-md"
                            />
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
                          className="bg-white py-2 px-4 border border-secondary-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                        >
                          <X className="h-4 w-4" /> Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="ml-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center gap-1"
                        >
                          <Save className="h-4 w-4" /> Create Customer
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateCustomerPage
