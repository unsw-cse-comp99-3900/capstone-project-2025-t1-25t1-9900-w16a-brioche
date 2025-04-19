import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FeatureItem from "@/components/landing/FeatureItem"

describe("FeatureItem", () => {
  it("renders without crashing", () => {
    const { container } = render(<FeatureItem text="Fast and Reliable" />)
    expect(container).toBeInTheDocument()
  })

  it("displays the correct text content", () => {
    const { getByText } = render(<FeatureItem text="Fast and Reliable" />)
    expect(getByText("Fast and Reliable")).toBeInTheDocument()
  })

  it("renders the checkmark icon", () => {
    const { container } = render(<FeatureItem text="Fast and Reliable" />)
    const iconElement = container.querySelector("svg")
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass("h-5")
    expect(iconElement).toHaveClass("w-5")
    expect(iconElement).toHaveClass("text-primary-500")
  })

  it("applies the correct styling classes", () => {
    const { container } = render(<FeatureItem text="Fast and Reliable" />)
    const wrapperElement = container.firstChild

    expect(wrapperElement).toHaveClass("flex")
    expect(wrapperElement).toHaveClass("items-center")
  })

  it("applies text styling to the description", () => {
    const { getByText } = render(<FeatureItem text="Fast and Reliable" />)
    const textElement = getByText("Fast and Reliable")
    expect(textElement).toHaveClass("text-sm")
    expect(textElement).toHaveClass("text-secondary-700")
  })
})
