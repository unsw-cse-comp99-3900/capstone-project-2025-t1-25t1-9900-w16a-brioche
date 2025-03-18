import React from "react"
import { PackagePlus } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import CreateProductContainer from "@/containers/Products/CreateProductContainer"

const CreateProductPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader
              title="Create Product"
              icon={PackagePlus}
              gradient={true}
            />
            <CreateProductContainer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateProductPage