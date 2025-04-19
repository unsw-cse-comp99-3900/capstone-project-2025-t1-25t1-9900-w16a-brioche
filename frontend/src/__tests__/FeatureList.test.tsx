import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import FeatureList from "./FeatureList"
import FeatureItem from "@/components/landing/FeatureItem"
import { landingHero } from "@/constants/Landing/landingHero"

// Mock the FeatureItem component
vi.mock("@/components/landing/FeatureItem", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <div>{text}</div>,
}))

// Mock the landingHero constant
vi.mock("@/constants/Landing/landingHero", () => ({
  landingHero: {
    featureList: {
      heading: "Key Features",
      features: ["Feature A", "Feature B", "Feature C"],
    },
  },
}))

describe("FeatureList", () => {
  it("renders without crashing", () => {
    const { container } = render(<FeatureList />)
    expect(container).toBeInTheDocument()
  })

  it("displays the correct heading", () => {
    const { getByText } = render(<FeatureList />)
    expect(getByText("Key Features")).toBeInTheDocument()
  })

  it("renders all features from the feature list", () => {
    const { getByText } = render(<FeatureList />)

    // Check for each feature in the mocked data
    expect(getByText("Feature A")).toBeInTheDocument()
    expect(getByText("Feature B")).toBeInTheDocument()
    expect(getByText("Feature C")).toBeInTheDocument()
  })

  it("applies the correct styling classes", () => {
    const { container } = render(<FeatureList />)
    const wrapperElement = container.firstChild

    expect(wrapperElement).toHaveClass("bg-white")
    expect(wrapperElement).toHaveClass("p-4")
    expect(wrapperElement).toHaveClass("rounded-lg")
    expect(wrapperElement).toHaveClass("shadow-md")
    expect(wrapperElement).toHaveClass("border")
    expect(wrapperElement).toHaveClass("border-secondary-100")
  })

  it("renders features in a responsive grid layout", () => {
    const { container } = render(<FeatureList />)
    const gridElement = container.querySelector(".grid")

    expect(gridElement).toBeInTheDocument()
    expect(gridElement).toHaveClass("grid-cols-1")
    expect(gridElement).toHaveClass("sm:grid-cols-2")
    expect(gridElement).toHaveClass("gap-2")
  })
})
