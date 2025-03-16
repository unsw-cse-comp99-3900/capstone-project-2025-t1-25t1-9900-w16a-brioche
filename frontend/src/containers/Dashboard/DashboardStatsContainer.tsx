import React from "react"

const DashboardStatsContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Total Invoices</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Pending Validation</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Validated</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
    </div>
  )
}

export default DashboardStatsContainer
