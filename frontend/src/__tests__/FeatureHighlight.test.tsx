import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import FeatureHighlight from "@/components/landing/KeyFeatureHighlight"

describe("FeatureHighlight", () => {
  it("renders highlight for index 0", () => {
    render(<FeatureHighlight index={0} />)
    expect(screen.getByText("Reckon One API Integration")).toBeInTheDocument()
  })

  it("renders highlight for index 1", () => {
    render(<FeatureHighlight index={1} />)
    expect(screen.getByText("ESS Validator Integration")).toBeInTheDocument()
  })

  it("renders highlight for index 2", () => {
    render(<FeatureHighlight index={2} />)
    expect(screen.getByText("ESS PEPPOL Network Support")).toBeInTheDocument()
  })

  it("wraps around to index 0 for index 3", () => {
    render(<FeatureHighlight index={3} />)
    expect(screen.getByText("Reckon One API Integration")).toBeInTheDocument()
  })

  it("renders svg icon", () => {
    const { container } = render(<FeatureHighlight index={0} />)
    expect(container.querySelector("svg")).not.toBeNull()
  })
})
