import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Logo from "@/components/common/Logo"

describe("Logo", () => {
  it("renders the logo container", () => {
    const { container } = render(<Logo />)
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).toBeInTheDocument()
    expect(wrapper.className).toContain("relative")
    expect(wrapper.className).toContain("h-10")
    expect(wrapper.className).toContain("w-10")
  })

  it("contains gradient background and white bars", () => {
    const { container } = render(<Logo />)

    const gradientDiv = container.querySelector(".bg-gradient-to-br")
    expect(gradientDiv).toBeInTheDocument()

    const whiteBars = container.querySelectorAll(".bg-white")
    // 5 bars: 2 vertical, 2 horizontal, 1 flow line
    expect(whiteBars.length).toBeGreaterThanOrEqual(5)
  })
})
