import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { landingFeature } from "@/constants/Landing/landingFeature"
import FeaturesShowcase from "@/components/landing/KeyFeaturesShowcase"

describe("FeaturesShowcase", () => {
  it("renders a FeatureCard for each item in landingFeature.showcase", () => {
    const { container } = render(<FeaturesShowcase />)
    const cards = container.querySelectorAll("div.relative.bg-white")
    expect(cards.length).toBe(landingFeature.showcase.length)
  })
})
