import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import ProtectedWithBookidRoute from "@/components/auth/ProtectedWithBookidRoute"

vi.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({ isLoaded: false, isSignedIn: false }),
  RedirectToSignIn: () => <div>RedirectToSignIn</div>,
}))
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/test" }),
  Navigate: ({ to }: { to: string }) => <div>Navigate to {to}</div>,
}))
vi.mock("@/pages/LoadingPage", () => ({
  __esModule: true,
  default: () => <div>LoadingPage</div>,
}))

describe("ProtectedWithBookidRoute", () => {
  it("renders LoadingPage when not loaded", () => {
    render(
      <ProtectedWithBookidRoute>
        <div>children</div>
      </ProtectedWithBookidRoute>
    )
    expect(screen.getByText("LoadingPage")).toBeInTheDocument()
  })
})
