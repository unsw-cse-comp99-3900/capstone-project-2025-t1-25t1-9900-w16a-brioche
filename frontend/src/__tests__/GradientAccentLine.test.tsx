import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import GradientAccentLine from "@/components/common/GradientAccentLine"

describe("GradientAccentLine", () => {
  it("renders with default classes", () => {
    const { container } = render(<GradientAccentLine />)
    const line = container.firstChild as HTMLElement

    expect(line).toHaveClass("absolute")
    expect(line.className).toContain("top-0")
    expect(line.className).toContain("right-0")
    expect(line.className).toContain("left-0")
    expect(line.className).toContain("h-1")
    expect(line.className).toContain("bg-gradient-to-r")
    expect(line.className).toContain("from-primary-500")
    expect(line.className).toContain("to-blue-500")
    expect(line.className).toContain("rounded-t-2xl")
  })

  it("accepts custom props", () => {
    const { container } = render(
      <GradientAccentLine
        colors="from-red-500 to-yellow-500"
        position="bottom-0"
        height="h-2"
        borderRadius="rounded-full"
      />
    )
    const line = container.firstChild as HTMLElement

    expect(line.className).toContain("bottom-0")
    expect(line.className).toContain("h-2")
    expect(line.className).toContain("from-red-500")
    expect(line.className).toContain("to-yellow-500")
    expect(line.className).toContain("rounded-full")
  })
})
