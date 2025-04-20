import { render, cleanup } from "@testing-library/react"
import { describe, it, expect, afterEach } from "vitest"
import IconWrapper from "@/components/landing/IconWrapper"

describe("IconWrapper", () => {
  afterEach(cleanup)

  it("renders exactly one SVG icon for any index", () => {
    const testIndexes = [0, 1, 2, 3, 99, 999]

    testIndexes.forEach((index) => {
      const { container } = render(<IconWrapper index={index} />)
      const svgs = container.querySelectorAll("svg")
      expect(svgs.length).toBe(1)
    })
  })

  it("renders an SVG with expected Tailwind classes", () => {
    const { container } = render(<IconWrapper index={1} />)
    const svg = container.querySelector("svg")

    expect(svg).not.toBeNull()
    expect(svg?.classList.contains("h-6")).toBe(true)
    expect(svg?.classList.contains("w-6")).toBe(true)
    expect(svg?.classList.contains("text-white")).toBe(true)
  })

  it("renders icon inside a circular gradient container", () => {
    const { container } = render(<IconWrapper index={2} />)
    const wrapper = container.firstChild as HTMLElement

    expect(wrapper).not.toBeNull()
    expect(wrapper.className).toContain("rounded-full")
    expect(wrapper.className).toContain("bg-gradient-to-br")
    expect(wrapper.className).toContain("flex")
    expect(wrapper.className).toContain("items-center")
    expect(wrapper.className).toContain("justify-center")
  })
})
