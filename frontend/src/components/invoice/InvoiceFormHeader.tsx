import React from "react"
import { Controller, Control, FieldErrors } from "react-hook-form"
import { InvoiceFormData } from "./invoiceSchema"
import SelectCustomer from "./SelectCustomer"
import SelectPaymentTerms from "./SelectPaymentTerms"
import InvoiceDate from "./InvoiceDate"
import DueDate from "./DueDate" // ✅ 现在使用组件
import TaxStatusSelect from "./TaxStatusSelect"
import ReferenceInput from "./ReferenceInput" // ✅ 现在使用组件
import PurchaseOrderInput from "./PurchaseOrderInput" // ✅ 现在使用组件
import NotesTextarea from "./NotesTextarea"
import InvoiceNumber from "./InvoiceNumber"
import { useCustomers } from "@/hooks/customer/useCustomers"

interface InvoiceFormHeaderProps {
  control: Control<InvoiceFormData>
  errors: FieldErrors<InvoiceFormData>
  paymentTermsOptions: { id: string; name: string }[]
}

const InvoiceFormHeader: React.FC<InvoiceFormHeaderProps> = ({
  control,
  errors,
  paymentTermsOptions,
}) => {
  const { data: customers = [], isLoading } = useCustomers()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <div>
        <Controller
          name="customer"
          control={control}
          rules={{
            validate: (value) =>
              customers.some((customer) => customer.id === value)
                ? true
                : "Invalid Customer ID",
          }}
          render={({ field }) => (
            <SelectCustomer
              {...field}
              customers={customers}
              isLoading={isLoading}
            />
          )}
        />
        {errors.customer && (
          <p className="mt-1 text-red-500 text-sm">{errors.customer.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="invoiceNumber"
          control={control}
          rules={{ required: "Invoice number is required" }}
          render={({ field }) => <InvoiceNumber {...field} />}
        />
      </div>

      <div>
        <Controller
          name="invoiceDate"
          control={control}
          render={({ field }) => <InvoiceDate {...field} />}
        />
        {errors.invoiceDate && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.invoiceDate.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => <DueDate {...field} />}
        />
        {errors.dueDate && (
          <p className="mt-1 text-red-500 text-sm">{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <Controller
          name="amountTaxStatus"
          control={control}
          render={({ field }) => <TaxStatusSelect {...field} />}
        />
        {errors.amountTaxStatus && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.amountTaxStatus.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="paymentTerms"
          control={control}
          rules={{ required: "Payment terms are required" }}
          render={({ field }) => (
            <SelectPaymentTerms
              {...field}
              paymentTermsOptions={paymentTermsOptions}
            />
          )}
        />
        {errors.paymentTerms && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.paymentTerms.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="purchaseOrderNumber"
          control={control}
          render={({ field }) => (
            <PurchaseOrderInput {...field} value={field.value ?? ""} />
          )}
        />
        {errors.purchaseOrderNumber && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.purchaseOrderNumber.message}
          </p>
        )}
      </div>

      <div>
        <Controller
          name="reference"
          control={control}
          render={({ field }) => (
            <ReferenceInput {...field} value={field.value ?? ""} />
          )}
        />
        {errors.reference && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.reference.message}
          </p>
        )}
      </div>

      <div className="col-span-2">
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <NotesTextarea {...field} value={field.value ?? ""} />
          )}
        />
        {errors.notes && (
          <p className="mt-1 text-red-500 text-sm">{errors.notes.message}</p>
        )}
      </div>
    </div>
  )
}

export default InvoiceFormHeader
