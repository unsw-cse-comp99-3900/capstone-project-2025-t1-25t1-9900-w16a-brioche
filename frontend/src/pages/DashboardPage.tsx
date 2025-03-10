import React from "react"
import DashboardHeaderContainer from "@/containers/Dashboard/DashboardHeaderContainer"
import DashboardStatsContainer from "@/containers/Dashboard/DashboardStatsContainer"
import DashboardActionsContainer from "@/containers/Dashboard/DashboardActionsContainer"

const DashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <DashboardHeaderContainer />
      <DashboardStatsContainer />
      <DashboardActionsContainer />
      <div className="bg-white p-4 rounded-lg shadow">
        <p>Dashboard content will be implemented here</p>
      </div>
    </div>
  )
}

export default DashboardPage
