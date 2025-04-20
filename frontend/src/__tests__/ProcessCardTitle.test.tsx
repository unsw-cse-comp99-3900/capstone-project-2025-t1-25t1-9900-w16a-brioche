import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessCardTitle from "@/components/landing/ProcessCardTitle"

describe("ProcessCardTitle", () => {
  it("renders title and step number (even)", () => {
    render(<ProcessCardTitle title="Transform" stepNumber={2} isEven={true} />)
    expect(screen.getByText("Transform")).toBeInTheDocument()
    expect(screen.getByText((c) => c === "2")).toBeInTheDocument()
  })

  it("renders title and step number (odd)", () => {
    render(<ProcessCardTitle title="Create" stepNumber={1} isEven={false} />)
    expect(screen.getByText("Create")).toBeInTheDocument()
    expect(screen.getByText((c) => c === "1")).toBeInTheDocument()
  })

  it("renders different icons for stepNumber", () => {
    const { container } = render(
      <ProcessCardTitle title="Sign" stepNumber={3} isEven={true} />
    )
    const svg = container.querySelector("svg")
    expect(svg).not.toBeNull()
  })
})
