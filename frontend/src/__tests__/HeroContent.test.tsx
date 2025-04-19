import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HeroContent from "./HeroContent"

// 定义类型替代 `any`
interface FeatureBadgeProps {
  text: string
}

// Mock the FeatureBadge component
vi.mock("@/components/landing/FeatureBadge", () => ({
  __esModule: true,
  default: ({ text }: FeatureBadgeProps) => <div>MockFeatureBadge: {text}</div>,
}))

// Mock the HeroHeading component
vi.mock("@/components/landing/HeroHeading", () => ({
  __esModule: true,
  default: () => <div>MockHeroHeading</div>,
}))

// Mock the HeroButtons component
vi.mock("@/components/landing/HeroButtons", () => ({
  __esModule: true,
  default: () => <div>MockHeroButtons</div>,
}))

// Mock the FeatureList component
vi.mock("@/components/landing/FeatureList", () => ({
  __esModule: true,
  default: () => <div>MockFeatureList</div>,
}))

// Mock the landingHero constant
vi.mock("@/constants/Landing/landingHero", () => ({
  landingHero: {
    content: {
      badgeText: "Badge Text",
      description: "This is the Hero section description.",
    },
  },
}))

describe("HeroContent", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroContent />)
    expect(container).toBeInTheDocument()
  })

  it("renders the FeatureBadge with correct text", () => {
    const { getByText } = render(<HeroContent />)
    expect(getByText("MockFeatureBadge: Badge Text")).toBeInTheDocument()
  })

  it("renders the HeroHeading component", () => {
    const { getByText } = render(<HeroContent />)
    expect(getByText("MockHeroHeading")).toBeInTheDocument()
  })

  it("renders the description text correctly", () => {
    const { getByText } = render(<HeroContent />)
    expect(
      getByText("This is the Hero section description.")
    ).toBeInTheDocument()
  })

  it("renders the HeroButtons component", () => {
    const { getByText } = render(<HeroContent />)
    expect(getByText("MockHeroButtons")).toBeInTheDocument()
  })

  it("renders the FeatureList component", () => {
    const { getByText } = render(<HeroContent />)
    expect(getByText("MockFeatureList")).toBeInTheDocument()
  })

  it("applies the correct layout and AOS attributes", () => {
    const { container } = render(<HeroContent />)
    const wrapperElement = container.firstChild

    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass("lg:w-1/2")
    expect(wrapperElement).toHaveClass("lg:pr-12")
    expect(wrapperElement).toHaveAttribute("data-aos", "fade-right")
    expect(wrapperElement).toHaveAttribute("data-aos-duration", "1000")
  })

  it("applies the correct styling to the description text", () => {
    const { container } = render(<HeroContent />)
    const descriptionElement = container.querySelector("p")

    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveClass("mt-6")
    expect(descriptionElement).toHaveClass("text-xl")
    expect(descriptionElement).toHaveClass("text-secondary-600")
    expect(descriptionElement).toHaveClass("max-w-2xl")
  })
})
