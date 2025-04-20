import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FormField from "@/components/common/FormField"
import type { LucideIcon } from "lucide-react"

const MockIcon = ((props) => (
  <svg data-testid="mock-icon" {...props} />
)) as LucideIcon

describe("FormField", () => {
  it("renders label with required asterisk", () => {
    render(
      <FormField id="email" label="Email" required>
        <input id="email" />
      </FormField>
    )

    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("renders icon if provided", () => {
    render(
      <FormField id="name" label="Name" icon={MockIcon}>
        <input id="name" />
      </FormField>
    )

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
  })

  it("renders children properly", () => {
    render(
      <FormField id="password" label="Password">
        <input id="password" placeholder="Enter password" />
      </FormField>
    )

    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument()
  })

  it("does not render asterisk if not required", () => {
    render(
      <FormField id="username" label="Username">
        <input id="username" />
      </FormField>
    )

    expect(screen.queryByText("*")).not.toBeInTheDocument()
  })
})
