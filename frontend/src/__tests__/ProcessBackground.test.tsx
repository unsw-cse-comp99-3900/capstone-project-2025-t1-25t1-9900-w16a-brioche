import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessBackground from "@/components/landing/ProcessBackground"

describe("ProcessBackground", () => {
  it("renders background with two blurred circle layers", () => {
    const { container } = render(<ProcessBackground />)
    const blurredCircles = container.querySelectorAll("div.blur-3xl")
    expect(blurredCircles.length).toBe(2)
  })
})
