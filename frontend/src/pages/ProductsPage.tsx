/**
 * @file ProductsPage.tsx - Defines the ProductsPage component, which renders the main page for managing products.
 * * It includes the header and table components for displaying product data.
 */

/**
 * ProductsPage Component
 *
 * * This component renders the main layout for the products page, including a decorative background,
 *   a content header, and the table that displays product records.
 *
 * @returns {JSX.Element} The full page layout for viewing and managing products.
 */

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
