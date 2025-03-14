import React from "react";
import { Controller, Control } from "react-hook-form";
import SelectCustomer from "./SelectCustomer";
import SelectPaymentTerms from "./SelectPaymentTerms";

interface InvoiceFormHeaderProps {
  control: Control<any>;
  errors: any;
}

const InvoiceFormHeader: React.FC<InvoiceFormHeaderProps> = ({ control, errors }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* 客户选择 */}
      <div>
        <label className="block font-semibold text-lg">Customer</label>
        <Controller
          name="customer"
          control={control}
          render={({ field }) => <SelectCustomer {...field} />}
        />
        {errors.customer && <p className="text-red-500 text-sm">{errors.customer.message}</p>}
      </div>

      {/* 发票日期 */}
      <div>
        <label className="block font-semibold text-lg">Invoice Date</label>
        <Controller
          name="invoiceDate"
          control={control}
          render={({ field }) => (
            <input type="date" {...field} value={field.value || ""} className="w-full border-b-2 border-gray-400 bg-transparent focus:outline-none p-2" />
          )}
        />
        {errors.invoiceDate && <p className="text-red-500 text-sm">{errors.invoiceDate.message}</p>}
      </div>

      {/* 税务状态 */}
      <div>
        <label className="block font-semibold text-lg">Amount Tax Status</label>
        <Controller
          name="amountTaxStatus"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-full border-b-2 border-gray-400 bg-transparent focus:outline-none p-2">
              <option value="NonTaxed">Non-Taxed</option>
              <option value="Inclusive">Inclusive</option>
              <option value="Exclusive">Exclusive</option>
            </select>
          )}
        />
        {errors.amountTaxStatus && <p className="text-red-500 text-sm">{errors.amountTaxStatus.message}</p>}
      </div>

      {/* 付款条款 */}
      <div>
        <label className="block font-semibold text-lg">Payment Terms</label>
        <Controller
          name="paymentTerms"
          control={control}
          render={({ field }) => <SelectPaymentTerms {...field} />}
        />
        {errors.paymentTerms && <p className="text-red-500 text-sm">{errors.paymentTerms.message}</p>}
      </div>
    </div>
  );
};

export default InvoiceFormHeader;
