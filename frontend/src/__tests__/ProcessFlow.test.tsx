import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import ProcessFlow from "@/components/landing/ProcessFlow"
import { landingHero } from "@/constants/Landing/landingHero"

describe("ProcessFlow", () => {
  it("renders all three process steps", () => {
    render(<ProcessFlow />)
    expect(screen.getByText(landingHero.processFlow.step1)).toBeInTheDocument()
    expect(screen.getByText(landingHero.processFlow.step2)).toBeInTheDocument()
    expect(screen.getByText(landingHero.processFlow.step3)).toBeInTheDocument()
  })

  it("renders two arrow icons between steps", () => {
    const { container } = render(<ProcessFlow />)
    const arrows = container.querySelectorAll("svg.h-4.w-4")
    expect(arrows.length).toBe(2)
  })

  it("renders flow description text", () => {
    render(<ProcessFlow />)
    expect(
      screen.getByText(landingHero.processFlow.flowText)
    ).toBeInTheDocument()
  })
})
