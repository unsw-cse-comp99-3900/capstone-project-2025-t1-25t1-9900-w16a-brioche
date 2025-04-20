import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import GlowHoverEffect from "@/components/common/GlowHoverEffect"

describe("GlowHoverEffect", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <GlowHoverEffect>
        <span>Hello Glow</span>
      </GlowHoverEffect>
    )

    expect(getByText("Hello Glow")).toBeInTheDocument()
  })

  it("applies group and hover classes", () => {
    const { container } = render(
      <GlowHoverEffect>
        <span>Hover Test</span>
      </GlowHoverEffect>
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain("group")
    expect(wrapper.className).toContain("relative")

    const overlay = wrapper.firstChild as HTMLElement
    expect(overlay.className).toContain("group-hover:opacity-70")
    expect(overlay.className).toContain("blur-lg")
  })
})
