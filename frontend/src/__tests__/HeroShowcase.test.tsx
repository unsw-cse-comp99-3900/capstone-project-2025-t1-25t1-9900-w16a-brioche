import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HeroShowcase from "@/components/landing/HeroShowcase"
import { landingHero } from "@/constants/Landing/landingHero"

describe("HeroShowcase", () => {
  it("renders the showcase image, badge, and process flow", () => {
    render(<HeroShowcase />)

    expect(
      screen.getByAltText(landingHero.showcase.imageAlt)
    ).toBeInTheDocument()

    expect(screen.getByText(landingHero.showcase.badgeText)).toBeInTheDocument()

    const image = screen.getByAltText(
      landingHero.showcase.imageAlt
    ) as HTMLImageElement
    expect(image.src).toContain(landingHero.showcase.imageUrl)
  })
})
