import React from "react";
import CreateInvoiceForm from "@/components/invoice/CreateInvoiceForm";

const InvoiceFormContainer: React.FC = () => {
  const handleSubmit = (data: Record<string, unknown>) => {
    console.log("✅ 模拟提交成功:", data);
    localStorage.setItem("mockInvoice", JSON.stringify(data)); 
    alert("Invoice saved successfully (mock)!");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <CreateInvoiceForm onSubmit={handleSubmit} />  
    </div>
  );
};

export default InvoiceFormContainer;
