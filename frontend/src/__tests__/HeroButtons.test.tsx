import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HeroButtons from "./HeroButtons"

// Mock the HeroButton component
vi.mock("@/components/landing/HeroButton", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    variant,
    icon,
  }: {
    children: React.ReactNode
    href: string
    variant: string
    icon?: React.ReactNode
  }) => (
    <a href={href} className={variant}>
      {children}
      {icon}
    </a>
  ),
}))

// Mock the landingHero constant
vi.mock("@/constants/Landing/landingHero", () => ({
  landingHero: {
    buttons: {
      primaryButton: "Get Started",
      secondaryButton: "Learn More",
    },
  },
}))

describe("HeroButtons", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroButtons />)
    expect(container).toBeInTheDocument()
  })

  it("renders the primary button with correct text and href", () => {
    const { getByText } = render(<HeroButtons />)
    const primaryButton = getByText("Get Started")

    expect(primaryButton).toBeInTheDocument()
    expect(primaryButton.closest("a")).toHaveAttribute("href", "/dashboard")
  })

  it("renders the secondary button with correct text and href", () => {
    const { getByText } = render(<HeroButtons />)
    const secondaryButton = getByText("Learn More")

    expect(secondaryButton).toBeInTheDocument()
    expect(secondaryButton.closest("a")).toHaveAttribute(
      "href",
      "#how-it-works"
    )
  })

  it("renders the primary button with the correct variant", () => {
    const { container } = render(<HeroButtons />)
    const primaryButton = container.querySelector(".primary")

    expect(primaryButton).toBeInTheDocument()
    expect(primaryButton).toHaveClass("primary")
  })

  it("renders the secondary button with the correct variant", () => {
    const { container } = render(<HeroButtons />)
    const secondaryButton = container.querySelector(".secondary")

    expect(secondaryButton).toBeInTheDocument()
    expect(secondaryButton).toHaveClass("secondary")
  })

  it("renders the icons for both buttons", () => {
    const { container } = render(<HeroButtons />)

    const icons = container.querySelectorAll("svg")
    expect(icons).toHaveLength(2)

    // Check the primary button icon
    const primaryIcon = container.querySelector(".group-hover\\:translate-x-1")
    expect(primaryIcon).toBeInTheDocument()

    // Check the secondary button icon
    const secondaryIcon = container.querySelector(
      ".group-hover\\:translate-y-1"
    )
    expect(secondaryIcon).toBeInTheDocument()
  })

  it("applies the correct layout styles", () => {
    const { container } = render(<HeroButtons />)
    const wrapperElement = container.firstChild

    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass("mt-8")
    expect(wrapperElement).toHaveClass("flex")
    expect(wrapperElement).toHaveClass("flex-col")
    expect(wrapperElement).toHaveClass("sm:flex-row")
    expect(wrapperElement).toHaveClass("gap-4")
  })
})
