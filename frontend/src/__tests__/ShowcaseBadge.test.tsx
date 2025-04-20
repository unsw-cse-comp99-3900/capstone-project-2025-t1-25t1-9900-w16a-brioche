import { render } from "@testing-library/react"
import ShowcaseBadge from "@/components/landing/ShowcaseBadge"

describe("ShowcaseBadge", () => {
  it("renders the correct text", () => {
    const { container } = render(<ShowcaseBadge text="Beta" />)
    expect(container.textContent).toContain("Beta")
  })

  it("applies the correct variant class", () => {
    const { container } = render(<ShowcaseBadge text="New" variant="solid" />)
    const badge = container.querySelector("div")
    expect(badge?.className).toMatch(/bg-primary-100/)
  })

  it("uses custom position classes", () => {
    const { container } = render(
      <ShowcaseBadge text="Pinned" position="top-2 left-2" />
    )
    const badge = container.querySelector("div")
    expect(badge?.className).toMatch(/top-2/)
    expect(badge?.className).toMatch(/left-2/)
  })
})
