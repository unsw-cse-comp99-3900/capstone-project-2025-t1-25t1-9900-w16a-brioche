import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Footer from "@/components/common/Footer"
import { MemoryRouter } from "react-router-dom"

vi.mock("@/components/common/Logo", () => ({
  __esModule: true,
  default: () => <div>MockLogo</div>,
}))

vi.mock("react-icons/fa", () => ({
  FaGithub: () => <svg data-testid="github-icon" />,
}))

describe("Footer", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
  })

  it("renders Quick Links section", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText("Quick Links")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Features")).toBeInTheDocument()
    expect(screen.getByText("About Us")).toBeInTheDocument()
  })

  it("renders Resources section", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText("Resources")).toBeInTheDocument()
    expect(screen.getByText("Documentation")).toBeInTheDocument()
    expect(screen.getByText("API Reference")).toBeInTheDocument()
  })

  it("renders company name and GitHub icon", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(screen.getByText("InvoiceFlow")).toBeInTheDocument()
    expect(screen.getByTestId("github-icon")).toBeInTheDocument()
    expect(screen.getByText("MockLogo")).toBeInTheDocument()
  })

  it("renders copyright and policies", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    expect(
      screen.getByText(/© 2025 W16a-Brioche Development Team/i)
    ).toBeInTheDocument()
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument()
    expect(screen.getByText("Terms of Service")).toBeInTheDocument()
    expect(screen.getByText("Cookie Policy")).toBeInTheDocument()
  })
})
