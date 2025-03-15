import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import PageHeader from "@/components/common/PageHeader"
import { Users } from "lucide-react"

const CustomerContentHeader: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Customer Management"
        description="Manage your customer relationships efficiently"
        icon={Users}
        gradient={true}
      />

      <div className="flex justify-end mb-4">
        <Link to="/customers/create">
          <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white">
            Add Customer
          </Button>
        </Link>
      </div>
    </>
  )
}

export default CustomerContentHeader
