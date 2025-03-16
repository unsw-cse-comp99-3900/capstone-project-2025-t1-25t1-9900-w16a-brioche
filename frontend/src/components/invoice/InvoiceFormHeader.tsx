import React from "react"
import { Controller, Control, FieldErrors } from "react-hook-form"
import { InvoiceFormData } from "./invoiceSchema"
import SelectCustomer from "./SelectCustomer"
import SelectPaymentTerms from "./SelectPaymentTerms"
import InvoiceDate from "./InvoiceDate"
import TaxStatusSelect from "./TaxStatusSelect"

interface InvoiceFormHeaderProps {
  control: Control<InvoiceFormData>
  errors: FieldErrors<InvoiceFormData>
}

const InvoiceFormHeader: React.FC<InvoiceFormHeaderProps> = ({
  control,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* 客户选择 */}
      <div>
        <Controller
          name="customer"
          control={control}
          render={({ field }) => <SelectCustomer {...field} />}
        />
        {errors.customer && (
          <p className="mt-1 text-red-500 text-sm">{errors.customer.message}</p>
        )}
      </div>

      {/* 发票日期 */}
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

      {/* 税务状态 */}
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

      {/* 付款条款 */}
      <div>
        <Controller
          name="paymentTerms"
          control={control}
          render={({ field }) => <SelectPaymentTerms {...field} />}
        />
        {errors.paymentTerms && (
          <p className="mt-1 text-red-500 text-sm">
            {errors.paymentTerms.message}
          </p>
        )}
      </div>
    </div>
  )
}

export default InvoiceFormHeader
