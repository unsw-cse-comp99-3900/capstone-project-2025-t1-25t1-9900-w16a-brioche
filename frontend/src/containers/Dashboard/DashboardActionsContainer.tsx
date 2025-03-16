import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const DashboardActionsContainer: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Link to="/invoice/upload">
        <Button className="w-full">Upload Invoices</Button>
      </Link>
      <Link to="/invoice/create">
        <Button variant="outline" className="w-full">
          Create Invoice
        </Button>
      </Link>
    </div>
  )
}

export default DashboardActionsContainer
