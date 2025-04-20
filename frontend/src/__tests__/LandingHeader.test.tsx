import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import LandingHeader from "@/components/common/LandingHeader"

// Mock内部组件
vi.mock("@/components/common/LogoTextGroup", () => ({
  __esModule: true,
  default: () => <div>MockLogoTextGroup</div>,
}))

vi.mock("@/components/auth/AuthButtonGroup", () => ({
  __esModule: true,
  default: () => <div>MockAuthButtonGroup</div>,
}))

describe("LandingHeader", () => {
  it("renders logo and auth button group", () => {
    render(<LandingHeader />)

    expect(screen.getByText("MockLogoTextGroup")).toBeInTheDocument()
    expect(screen.getByText("MockAuthButtonGroup")).toBeInTheDocument()
  })

  it("renders all navigation links", () => {
    render(<LandingHeader />)

    expect(screen.getByText("Features")).toBeInTheDocument()
    expect(screen.getByText("How It Works")).toBeInTheDocument()
    expect(screen.getByText("FAQ")).toBeInTheDocument()
    expect(screen.getByText("Contact")).toBeInTheDocument()
  })
})
