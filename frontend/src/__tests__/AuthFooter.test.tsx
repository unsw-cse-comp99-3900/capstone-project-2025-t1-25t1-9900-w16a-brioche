import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import AuthFooter from "@/components/common/AuthFooter"
import { MemoryRouter } from "react-router-dom"

vi.mock("react-icons/fa", () => ({
  FaGithub: () => <svg data-testid="github-icon" />,
}))

vi.mock("@/components/auth/SignInButton", () => ({
  __esModule: true,
  default: () => <span>MockSignInButton</span>,
}))
vi.mock("@/components/auth/SignUpButton", () => ({
  __esModule: true,
  default: () => <span>MockSignUpButton</span>,
}))

describe("AuthFooter", () => {
  it("renders footer links and GitHub icon", () => {
    render(
      <MemoryRouter>
        <AuthFooter />
      </MemoryRouter>
    )
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument()
    expect(screen.getByText(/terms of service/i)).toBeInTheDocument()
    expect(screen.getByText(/cookie policy/i)).toBeInTheDocument()
    expect(screen.getByTestId("github-icon")).toBeInTheDocument()
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
  })
})
