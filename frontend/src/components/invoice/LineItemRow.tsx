import React from "react";
import { Controller, Control } from "react-hook-form";
import { InvoiceFormData } from "./invoiceSchema";

interface LineItemRowProps {
  index: number;
  control: Control<InvoiceFormData>;
  remove: (index: number) => void;
}

const LineItemRow: React.FC<LineItemRowProps> = ({ index, control, remove }) => {
  return (
    <div className="grid grid-cols-6 gap-2 items-center mt-2 border-b pb-2">
      {/* 行号 */}
      <span className="font-semibold">{index + 1}</span>

      {/* 描述 */}
      <Controller
        name={`lineItems.${index}.description`}
        control={control}
        render={({ field }) => (
          <input {...field} placeholder="Description" className="border p-2 rounded w-full focus:outline-none" />
        )}
      />

      {/* 数量 */}
      <Controller
        name={`lineItems.${index}.quantity`}
        control={control}
        render={({ field }) => (
          <input type="number" {...field} className="border p-2 rounded w-full focus:outline-none" />
        )}
      />

      {/* 单价 */}
      <Controller
        name={`lineItems.${index}.unitPrice`}
        control={control}
        render={({ field }) => (
          <input type="number" {...field} className="border p-2 rounded w-full focus:outline-none" />
        )}
      />

      {/* 税率 */}
      <Controller
        name={`lineItems.${index}.taxRate`}
        control={control}
        render={({ field }) => (
          <select {...field} className="border p-2 rounded w-full focus:outline-none">
            <option value="">Select Tax</option>
            <option value="GST">GST (10%)</option>
            <option value="VAT">VAT (5%)</option>
            <option value="None">None</option>
          </select>
        )}
      />

      {/* 删除 */}
      <button type="button" onClick={() => remove(index)} className="text-red-500 font-bold text-center">
        ✖
      </button>
    </div>
  );
};

export default LineItemRow;
