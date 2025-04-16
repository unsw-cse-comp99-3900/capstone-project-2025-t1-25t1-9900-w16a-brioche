/**
 * @file EditProductPage.tsx - Defines the EditProductPage component, which renders the page layout for editing an existing product.
 * * It includes the page header and the EditProductContainer component.
 */

/**
 * EditProductPage Component
 *
 * * This component renders the main layout for the edit product page, including a decorative background,
 *   a header with title and icon, and the form container for product editing.
 *
 * @returns {JSX.Element} The full page structure for updating an existing product.
 */

import React from "react"
import { MessageCircle } from "lucide-react"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"
import PageHeader from "@/components/common/PageHeader"
import EditProductContainer from "@/containers/Products/EditProductContainer"

const CreateProductPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GridPatternOverlay />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <PageHeader
              title="Edit Product"
              icon={MessageCircle}
              gradient={true}
            />
            <EditProductContainer />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CreateProductPage
