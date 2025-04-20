import FeatureCard from "@/components/landing/KeyFeatureCard"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"

describe("FeatureCard", () => {
  const mockProps = {
    title: "Automated Validation",
    description: "Validate invoices instantly using Gemini 2.0.",
    features: [
      "Real-time feedback",
      "Highlight missing fields",
      "Smart error detection",
    ],
    index: 1,
  }

  it("renders title, description, and feature items", () => {
    render(<FeatureCard {...mockProps} />)
    expect(screen.getByText(mockProps.title)).toBeInTheDocument()
    expect(screen.getByText(mockProps.description)).toBeInTheDocument()
    mockProps.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it("renders svg icon and top gradient bar", () => {
    const { container } = render(<FeatureCard {...mockProps} />)
    expect(container.querySelector("svg")).not.toBeNull()
    expect(container.querySelector("div.bg-gradient-to-r")).not.toBeNull()
  })

  it("has correct animation delay", () => {
    const { container } = render(<FeatureCard {...mockProps} />)
    const root = container.querySelector("[data-aos-delay]")
    expect(root?.getAttribute("data-aos-delay")).toBe(
      String(mockProps.index * 100)
    )
  })
})
