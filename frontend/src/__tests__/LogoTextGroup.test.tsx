import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import LogoTextGroup from "@/components/common/LogoTextGroup"
import { MemoryRouter } from "react-router-dom"

vi.mock("@/components/common/Logo", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-logo" />,
}))

describe("LogoTextGroup", () => {
  it("renders logo and brand text", () => {
    render(
      <MemoryRouter>
        <LogoTextGroup />
      </MemoryRouter>
    )

    expect(screen.getByTestId("mock-logo")).toBeInTheDocument()
    expect(screen.getByText("Invoice")).toBeInTheDocument()
    expect(screen.getByText("Flow")).toBeInTheDocument()
  })

  it("wraps content with link to home", () => {
    render(
      <MemoryRouter>
        <LogoTextGroup />
      </MemoryRouter>
    )

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/")
  })
})
