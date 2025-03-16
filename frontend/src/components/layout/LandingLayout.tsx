import React from "react"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Footer from "../common/Footer"
import LandingHeader from "../common/LandingHeader"

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
  )
}

export default Layout
