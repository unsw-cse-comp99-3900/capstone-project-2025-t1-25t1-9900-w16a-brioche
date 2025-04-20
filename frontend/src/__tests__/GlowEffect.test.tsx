import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import GlowEffect from "@/components/common/GlowEffect"

describe("GlowEffect", () => {
  it("renders with default styles", () => {
    const { container } = render(<GlowEffect />)
    const div = container.firstChild as HTMLElement

    expect(div).toBeInTheDocument()
    expect(div.className).toContain("from-primary-600")
    expect(div.className).toContain("opacity-30")
    expect(div.className).toContain("blur-lg")
  })

  it("renders with custom gradient and opacity", () => {
    const { container } = render(
      <GlowEffect
        colors="from-red-500 via-yellow-400 to-green-500"
        opacity="opacity-50"
      />
    )
    const div = container.firstChild as HTMLElement

    expect(div.className).toContain("from-red-500")
    expect(div.className).toContain("opacity-50")
    expect(div.className).toContain("blur-lg")
  })
})
