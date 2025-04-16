import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import DashboardHeader from "@/components/common/DashboardHeader"

vi.mock("@clerk/clerk-react", () => ({
  UserButton: () => <div>UserButton</div>,
}))
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/dashboard" }),
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}))

describe("DashboardHeader", () => {
  it("renders and shows Dashboard link", () => {
    render(<DashboardHeader />)
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    expect(screen.getByText("UserButton")).toBeInTheDocument()
  })
})
