import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import PageHeader from "@/components/common/PageHeader"
import { Users } from "lucide-react"

const ProductContentHeader: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Product Management"
        description="Manage your Products(items) efficiently"
        icon={Users}
        gradient={true}
      />

      <div className="flex justify-end mb-4">
        <Link to="/products/create">
          <Button className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white">
            Add Product
          </Button>
        </Link>
      </div>
    </>
  )
}

export default ProductContentHeader
