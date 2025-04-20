import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HeroHeading from "@/components/landing/HeroHeading"
import { landingHero } from "@/constants/Landing/landingHero"

describe("HeroHeading", () => {
  it("renders main, highlighted, and suffix text correctly", () => {
    render(<HeroHeading />)

    expect(
      screen.getByText((content) =>
        content.includes(landingHero.heading.mainText)
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText((content) =>
        content.includes(landingHero.heading.highlightedText)
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText((content) =>
        content.includes(landingHero.heading.suffixText)
      )
    ).toBeInTheDocument()
  })
})
