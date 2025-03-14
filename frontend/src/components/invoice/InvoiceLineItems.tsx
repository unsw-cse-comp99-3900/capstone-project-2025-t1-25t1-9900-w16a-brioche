import React from "react";
import { useFieldArray, Control, FieldErrors } from "react-hook-form";
import LineItemRow from "./LineItemRow";
import { InvoiceFormData } from "./invoiceSchema";

interface InvoiceLineItemsProps {
  control: Control<InvoiceFormData>;
  errors: FieldErrors<InvoiceFormData>;
}

const InvoiceLineItems: React.FC<InvoiceLineItemsProps> = ({ control}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lineItems",
  });

  return (
    <div>
      <label className="block font-semibold text-lg">Line Items</label>
      <div className="border p-4 rounded-lg shadow-md">
        {/* 表头 */}
        <div className="grid grid-cols-6 gap-2 bg-gray-100 p-2 font-semibold rounded-t-md">
          <span>#</span>
          <span>Description</span>
          <span>Quantity</span>
          <span>Unit Price</span>
          <span>Tax Rate</span>
          <span className="text-center">Remove</span>
        </div>

        {/* 表格内容 */}
        {fields.map((item, index) => (
          <LineItemRow key={item.id} index={index} control={control} remove={remove} />
        ))}

        {/* 添加行按钮 */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() =>
              append({
                lineNumber: fields.length + 1,
                description: "",
                quantity: 1,
                unitPrice: 0,
                taxRate: "",
                taxAmount: 0,
                discountPercent: 0,
                isFullWidthDescription: false,
              })
            }
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600"
          >
            + Add Line Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceLineItems;
