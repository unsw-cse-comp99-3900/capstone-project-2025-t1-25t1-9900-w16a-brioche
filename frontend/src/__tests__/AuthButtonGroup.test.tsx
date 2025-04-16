import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import AuthButtonGroup from "@/components/auth/AuthButtonGroup"

vi.mock("@clerk/clerk-react", () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div>MockSignedIn{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div>MockSignedOut{children}</div>
  ),
  UserButton: () => <div>MockUserButton</div>,
}))

vi.mock("@/components/auth/SignInButton", () => ({
  __esModule: true,
  default: () => <button>MockSignInButton</button>,
}))
vi.mock("@/components/auth/SignUpButton", () => ({
  __esModule: true,
  default: () => <button>MockSignUpButton</button>,
}))

describe("AuthButtonGroup", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<AuthButtonGroup />)
    expect(getByText("MockSignedIn")).toBeInTheDocument()
    expect(getByText("MockSignedOut")).toBeInTheDocument()
    expect(getByText("MockSignInButton")).toBeInTheDocument()
    expect(getByText("MockSignUpButton")).toBeInTheDocument()
  })
})
