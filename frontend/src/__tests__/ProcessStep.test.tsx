import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessStep from "@/components/landing/ProcessStep"

describe("ProcessStep", () => {
  it("renders image, card and timeline node content", () => {
    const { container } = render(<ProcessStep stepIndex={0} />)

    const img = container.querySelector("img")
    const card = container.querySelector("[class*='shadow-xl']") // ProcessCard outer container
    const timeline = container.querySelector("svg") // TimelineNode likely renders a dot or line with svg

    expect(img).not.toBeNull()
    expect(card).not.toBeNull()
    expect(timeline).not.toBeNull()
  })
})
