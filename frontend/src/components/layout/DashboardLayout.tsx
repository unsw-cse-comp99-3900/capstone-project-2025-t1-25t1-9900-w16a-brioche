import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"
import DashboardHeader from "../common/DashboardHeader"

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default DashboardLayout
