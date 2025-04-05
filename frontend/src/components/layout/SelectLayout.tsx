import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"
import MinimalHeader from "../common/MinimalHeader"

const SelectLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MinimalHeader />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default SelectLayout
