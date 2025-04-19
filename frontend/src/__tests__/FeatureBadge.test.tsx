import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FeatureBadge from "@/components/landing/FeatureBadge"

describe("FeatureBadge", () => {
  it("renders without crashing", () => {
    const { container } = render(<FeatureBadge text="New Feature" />)
    expect(container).toBeInTheDocument()
  })

  it("displays the correct text content", () => {
    const { getByText } = render(<FeatureBadge text="New Feature" />)
    expect(getByText("New Feature")).toBeInTheDocument()
  })

  it("applies the correct styling classes", () => {
    const { container } = render(<FeatureBadge text="New Feature" />)
    const badgeElement = container.firstChild

    expect(badgeElement).toHaveClass("inline-block")
    expect(badgeElement).toHaveClass("mb-4")
    expect(badgeElement).toHaveClass("px-3")
    expect(badgeElement).toHaveClass("py-1")
    expect(badgeElement).toHaveClass("bg-gradient-to-r")
    expect(badgeElement).toHaveClass("rounded-full")
    expect(badgeElement).toHaveClass("backdrop-blur-sm")
    expect(badgeElement).toHaveClass("border")
    expect(badgeElement).toHaveClass("border-primary-200")
  })
})
