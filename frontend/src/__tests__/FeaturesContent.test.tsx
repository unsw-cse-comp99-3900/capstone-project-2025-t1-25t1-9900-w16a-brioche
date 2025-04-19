import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import FeaturesContent from "./FeaturesContent"
import { landingFeature } from "@/constants/Landing/landingFeature"

// Mock the landingFeature constant
vi.mock("@/constants/Landing/landingFeature", () => ({
  landingFeature: {
    content: {
      tagText: "Our Features",
      headingText: "Discover the Benefits",
      subheadingText: "Explore the unique advantages we bring to your business.",
    },
  },
}))

describe("FeaturesContent", () => {
  it("renders without crashing", () => {
    const { container } = render(<FeaturesContent />)
    expect(container).toBeInTheDocument()
  })

  it("displays the correct section label", () => {
    const { getByText } = render(<FeaturesContent />)
    expect(getByText("Our Features")).toBeInTheDocument()
  })

  it("displays the correct heading text", () => {
    const { getByText } = render(<FeaturesContent />)
    expect(getByText("Discover the Benefits")).toBeInTheDocument()
  })

  it("displays the correct subheading text", () => {
    const { getByText } = render(<FeaturesContent />)
    expect(getByText("Explore the unique advantages we bring to your business.")).toBeInTheDocument()
  })

  it("applies the correct styling classes to the section label", () => {
    const { container } = render(<FeaturesContent />)
    const sectionLabel = container.querySelector(".bg-gradient-to-r")

    expect(sectionLabel).toBeInTheDocument()
    expect(sectionLabel).toHaveClass("inline-block")
    expect(sectionLabel).toHaveClass("mb-4")
    expect(sectionLabel).toHaveClass("px-3")
    expect(sectionLabel).toHaveClass("py-1")
    expect(sectionLabel).toHaveClass("rounded-full")
    expect(sectionLabel).toHaveClass("backdrop-blur-sm")
    expect(sectionLabel).toHaveClass("border")
    expect(sectionLabel).toHaveClass("border-primary-200")
  })

  it("applies the correct styling classes to the heading text", () => {
    const { container } = render(<FeaturesContent />)
    const headingElement = container.querySelector("h2")

    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveClass("text-3xl")
    expect(headingElement).toHaveClass("scale-105")
    expect(headingElement).toHaveClass("font-bold")
    expect(headingElement).toHaveClass("text-gray-900")
    expect(headingElement).toHaveClass("sm:text-4xl")
    expect(headingElement).toHaveClass("mb-4")
  })

  it("applies the correct styling classes to the subheading text", () => {
    const { container } = render(<FeaturesContent />)
    const subheadingElement = container.querySelector("p")

    expect(subheadingElement).toBeInTheDocument()
    expect(subheadingElement).toHaveClass("max-w-2xl")
    expect(subheadingElement).toHaveClass("mx-auto")
    expect(subheadingElement).toHaveClass("text-lg")
    expect(subheadingElement).toHaveClass("text-gray-600")
  })

  it("applies the correct AOS attributes for animations", () => {
    const { container } = render(<FeaturesContent />)
    const wrapperElement = container.firstChild

    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveAttribute("data-aos", "fade-up")
  })
})
