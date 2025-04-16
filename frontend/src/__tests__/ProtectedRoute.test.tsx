import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

vi.mock("@clerk/clerk-react", () => ({
  useAuth: () => ({ isLoaded: false, isSignedIn: false }),
  RedirectToSignIn: () => <div>RedirectToSignIn</div>,
}))
vi.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/test" }),
}))
vi.mock("@/pages/LoadingPage", () => ({
  __esModule: true,
  default: () => <div>LoadingPage</div>,
}))

describe("ProtectedRoute", () => {
  it("renders LoadingPage when not loaded", () => {
    render(
      <ProtectedRoute>
        <div>children</div>
      </ProtectedRoute>
    )
    expect(screen.getByText("LoadingPage")).toBeInTheDocument()
  })
})
