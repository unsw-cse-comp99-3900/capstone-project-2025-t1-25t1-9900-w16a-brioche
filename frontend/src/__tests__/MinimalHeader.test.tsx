import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import MinimalHeader from "@/components/common/MinimalHeader"

vi.mock("@/components/common/LogoTextGroup", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-logo" />,
}))

vi.mock("@clerk/clerk-react", () => ({
  UserButton: () => <div data-testid="mock-user-button" />,
}))

describe("MinimalHeader", () => {
  it("renders logo and user button", () => {
    render(<MinimalHeader />)

    expect(screen.getByTestId("mock-logo")).toBeInTheDocument()
    expect(screen.getByTestId("mock-user-button")).toBeInTheDocument()
  })
})
