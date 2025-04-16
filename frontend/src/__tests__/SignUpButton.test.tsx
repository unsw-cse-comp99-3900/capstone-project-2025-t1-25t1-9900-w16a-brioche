import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import SignUpButton from "@/components/auth/SignUpButton"

vi.mock("@clerk/clerk-react", () => ({
  SignUpButton: () => <button>MockSignUpButton</button>,
}))

describe("SignUpButton", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<SignUpButton />)
    expect(getByText("MockSignUpButton")).toBeInTheDocument()
  })
})
