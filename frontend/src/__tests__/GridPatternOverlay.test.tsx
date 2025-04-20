import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

describe("GridPatternOverlay", () => {
  it("renders with default styles and classes", () => {
    const { container } = render(<GridPatternOverlay />)
    const grid = container.firstChild as HTMLElement

    expect(grid).toBeInTheDocument()
    expect(grid.className).toContain("absolute")
    expect(grid.className).toContain("inset-0")
    expect(grid.className).toContain("opacity-[0.06]")
    expect(grid.style.backgroundImage).toContain("linear-gradient(#4F46E5")
    expect(grid.style.backgroundSize).toBe("40px 40px")
  })

  it("renders with custom props", () => {
    const { container } = render(
      <GridPatternOverlay
        color="#00FF00"
        opacity="opacity-20"
        gridSize="50px 50px"
      />
    )
    const grid = container.firstChild as HTMLElement

    expect(grid.className).toContain("opacity-20")
    expect(grid.style.backgroundImage).toContain("linear-gradient(#00FF00")
    expect(grid.style.backgroundSize).toBe("50px 50px")
  })
})
