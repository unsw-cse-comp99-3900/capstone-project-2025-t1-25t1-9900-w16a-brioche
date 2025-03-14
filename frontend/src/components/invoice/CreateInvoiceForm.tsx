import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InvoiceFormHeader from "./InvoiceFormHeader";
import InvoiceLineItems from "./InvoiceLineItems";
import { invoiceSchema, InvoiceFormData } from "./invoiceSchema";

const CreateInvoiceForm: React.FC<{ onSubmit: (data: InvoiceFormData) => void }> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
      <InvoiceFormHeader control={control} errors={errors} />
      <InvoiceLineItems control={control} errors={errors} />
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700">
          Submit Invoice
        </button>
      </div>
    </form>
  );
};

export default CreateInvoiceForm;
