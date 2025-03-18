import React from "react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import ProductContentHeader from "@/containers/Products/ProductContentHeader"
import ProductTableContainer from "@/containers/Products/ProductTableContainer"

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 ">
        <ProductContentHeader />
        <ProductTableContainer />
      </div>
    </div>
  )
}

export default ProductsPage
