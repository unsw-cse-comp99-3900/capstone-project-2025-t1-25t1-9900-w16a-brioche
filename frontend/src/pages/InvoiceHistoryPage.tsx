import React, { useState } from "react";
import { FiPlus } from "react-icons/fi"; 
import { HiOutlineDotsVertical } from "react-icons/hi"; 

const mockInvoices = [
  { id: "INV-2023-001", recipient: "Fredrik Inc", organization: "Fredrik Inc", status: "Active", balance: "$0.00" },
  { id: "INV-2023-002", recipient: "J", organization: "-", status: "Active", balance: "$0.00" },
  { id: "INV-2023-003", recipient: "Jill Joan Abrahams", organization: "Jill Joan Abrahams", status: "Active", balance: "$0.00" },
  { id: "INV-2023-004", recipient: "John Doe", organization: "InvoiceFlow", status: "Active", balance: "$0.00" },
  { id: "INV-2023-005", recipient: "Johnathon Smith Contractor", organization: "Johnathon Smith Contractor", status: "Active", balance: "$0.00" },
];

const InvoiceHistoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // 过滤搜索结果
  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 页面标题 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-700 flex items-center">
          <span className="mr-2">📄</span> Invoice Management
        </h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center">
          <FiPlus className="mr-2" /> Add Invoice
        </button>
      </div>

      {/* 搜索框 */}
      <input
        type="text"
        placeholder="Search invoices..."
        className="w-full max-w-lg p-2 border border-gray-300 rounded-md mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 表格 */}
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-100">
            <tr className="text-gray-600">
              <th className="p-4">Name</th>
              <th className="p-4">Organization</th>
              <th className="p-4">Status</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{invoice.recipient}</td>
                <td className="p-4">{invoice.organization}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{invoice.status}</span>
                </td>
                <td className="p-4">{invoice.balance}</td>
                <td className="p-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <HiOutlineDotsVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceHistoryPage;
