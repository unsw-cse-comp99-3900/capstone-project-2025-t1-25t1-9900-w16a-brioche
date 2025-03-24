import React from "react"
import PageHeader from "@/components/common/PageHeader"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FilePlus2 } from "lucide-react"

const DashboardHeaderContainer: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <PageHeader
        title="Dashboard"
        description="Welcome to your invoice management dashboard"
      ></PageHeader>
      <Link to="/invoice/create">
        <Button size="lg" className="flex items-center text-md">
          <FilePlus2 /> Create Invoice
        </Button>
      </Link>
    </div>
  )
}

export default DashboardHeaderContainer
