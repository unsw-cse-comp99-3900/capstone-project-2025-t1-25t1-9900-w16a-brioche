import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FeatureList from "@/components/landing/KeyFeaturelist"

describe("FeatureList", () => {
  const mockFeatures = [
    "Real-time sync",
    "Auto validation",
    "Smart error detection",
  ]

  it("renders all feature items", () => {
    render(<FeatureList features={mockFeatures} />)
    mockFeatures.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it("renders a checkmark icon for each item", () => {
    const { container } = render(<FeatureList features={mockFeatures} />)
    const icons = container.querySelectorAll("svg")
    expect(icons.length).toBe(mockFeatures.length)
  })
})
