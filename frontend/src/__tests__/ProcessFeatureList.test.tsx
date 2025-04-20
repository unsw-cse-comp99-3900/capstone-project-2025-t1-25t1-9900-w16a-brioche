import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessFeatureList from "@/components/landing/ProcessFeatureList"

describe("ProcessFeatureList", () => {
  const mockFeatures = ["Fast upload", "Secure format", "Auto conversion"]

  it("renders all feature texts", () => {
    render(<ProcessFeatureList features={mockFeatures} isEven={true} />)
    mockFeatures.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it("renders icons on the left when isEven is true", () => {
    const { container } = render(
      <ProcessFeatureList features={mockFeatures} isEven={true} />
    )
    const items = container.querySelectorAll("div.flex")
    items.forEach((item) => {
      const svg = item.querySelector("svg")
      expect(svg?.classList.contains("mr-2")).toBe(true)
    })
  })

  it("renders icons on the right when isEven is false", () => {
    const { container } = render(
      <ProcessFeatureList features={mockFeatures} isEven={false} />
    )
    const items = container.querySelectorAll("div.flex")
    items.forEach((item) => {
      const svg = item.querySelector("svg")
      expect(svg?.classList.contains("ml-2")).toBe(true)
    })
  })
})
