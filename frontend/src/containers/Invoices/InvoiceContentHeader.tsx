import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import PageHeader from "@/components/common/PageHeader"
import { FileText } from "lucide-react"

const InvoiceContentHeader: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Invoice Management"
        description="Manage your invoices efficiently"
        icon={FileText}
        gradient={true}
      />

      <div className="flex justify-end mb-4">
        <Link to="/invoices/create">
          <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white">
            Create Invoice
          </Button>
        </Link>
      </div>
    </>
  )
}

export default InvoiceContentHeader
