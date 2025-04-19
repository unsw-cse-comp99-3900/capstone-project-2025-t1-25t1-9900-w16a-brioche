import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HeroButton from "@/components/landing/HeroButton"

describe("HeroButton", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <HeroButton href="/test" variant="primary">
        Click Me
      </HeroButton>
    )
    expect(container).toBeInTheDocument()
  })

  it("renders the correct children", () => {
    const { getByText } = render(
      <HeroButton href="/test" variant="primary">
        Click Me
      </HeroButton>
    )
    expect(getByText("Click Me")).toBeInTheDocument()
  })

  it("applies the primary variant styles correctly", () => {
    const { container } = render(
      <HeroButton href="/test" variant="primary">
        Primary Button
      </HeroButton>
    )
    const buttonElement = container.querySelector("a")

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass("group")
    expect(buttonElement).toHaveClass("inline-flex")
    expect(buttonElement).toHaveClass("justify-center")
    expect(buttonElement).toHaveClass("items-center")
    expect(buttonElement).toHaveClass("px-6")
    expect(buttonElement).toHaveClass("py-3")
    expect(buttonElement).toHaveClass("border-transparent")
    expect(buttonElement).toHaveClass("text-white")
    expect(buttonElement).toHaveClass("bg-gradient-to-r")
    expect(buttonElement).toHaveClass("from-primary-600")
    expect(buttonElement).toHaveClass("to-primary-500")
    expect(buttonElement).toHaveClass("hover:from-primary-700")
    expect(buttonElement).toHaveClass("hover:to-primary-600")
  })

  it("applies the secondary variant styles correctly", () => {
    const { container } = render(
      <HeroButton href="/test" variant="secondary">
        Secondary Button
      </HeroButton>
    )
    const buttonElement = container.querySelector("a")

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveClass("group")
    expect(buttonElement).toHaveClass("inline-flex")
    expect(buttonElement).toHaveClass("justify-center")
    expect(buttonElement).toHaveClass("items-center")
    expect(buttonElement).toHaveClass("px-6")
    expect(buttonElement).toHaveClass("py-3")
    expect(buttonElement).toHaveClass("border-secondary-300")
    expect(buttonElement).toHaveClass("text-secondary-700")
    expect(buttonElement).toHaveClass("bg-white")
    expect(buttonElement).toHaveClass("hover:bg-secondary-50")
  })

  it("renders with the correct href attribute", () => {
    const { container } = render(
      <HeroButton href="/test" variant="primary">
        Link Button
      </HeroButton>
    )
    const buttonElement = container.querySelector("a")

    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveAttribute("href", "/test")
  })

  it("renders an optional icon when provided", () => {
    const { getByText } = render(
      <HeroButton href="/test" variant="primary" icon={<span>Icon</span>}>
        Button with Icon
      </HeroButton>
    )
    expect(getByText("Icon")).toBeInTheDocument()
  })
})
