import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import SignInButton from "@/components/auth/SignInButton"

vi.mock("@clerk/clerk-react", () => ({
  SignInButton: () => <button>MockSignInButton</button>,
}))

describe("SignInButton", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<SignInButton />)
    expect(getByText("MockSignInButton")).toBeInTheDocument()
  })
})
