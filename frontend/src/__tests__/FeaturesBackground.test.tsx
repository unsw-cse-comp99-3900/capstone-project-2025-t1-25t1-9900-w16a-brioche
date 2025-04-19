import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import FeaturesBackground from "./FeaturesBackground"

// Mock the GridPatternOverlay component
vi.mock("@/components/common/GridPatternOverlay", () => ({
  __esModule: true,
  default: () => <div>MockGridPatternOverlay</div>,
}))

describe("FeaturesBackground", () => {
  it("renders without crashing", () => {
    const { container } = render(<FeaturesBackground />)
    expect(container).toBeInTheDocument()
  })

  it("renders the gradient background", () => {
    const { container } = render(<FeaturesBackground />)
    const backgroundElement = container.firstChild

    expect(backgroundElement).toBeInTheDocument()
    expect(backgroundElement).toHaveClass("absolute")
    expect(backgroundElement).toHaveClass("inset-0")
    expect(backgroundElement).toHaveClass("bg-gradient-to-b")
    expect(backgroundElement).toHaveClass("from-blue-50/50")
    expect(backgroundElement).toHaveClass("via-white")
    expect(backgroundElement).toHaveClass("to-white")
  })

  it("renders the grid pattern overlay", () => {
    const { getByText } = render(<FeaturesBackground />)
    expect(getByText("MockGridPatternOverlay")).toBeInTheDocument()
  })

  it("renders the blurred shapes with correct styles", () => {
    const { container } = render(<FeaturesBackground />)

    const blurredShapes = container.querySelectorAll(".absolute")
    expect(blurredShapes).toHaveLength(4) // Includes the gradient background + 3 blurred shapes

    const shape1 = container.querySelector(".top-40.-left-40")
    expect(shape1).toBeInTheDocument()
    expect(shape1).toHaveClass("w-96")
    expect(shape1).toHaveClass("h-96")
    expect(shape1).toHaveClass("bg-primary-100")
    expect(shape1).toHaveClass("rounded-full")
    expect(shape1).toHaveClass("mix-blend-multiply")
    expect(shape1).toHaveClass("opacity-30")
    expect(shape1).toHaveClass("blur-3xl")

    const shape2 = container.querySelector(".bottom-40.-right-40")
    expect(shape2).toBeInTheDocument()
    expect(shape2).toHaveClass("w-96")
    expect(shape2).toHaveClass("h-96")
    expect(shape2).toHaveClass("bg-blue-100")
    expect(shape2).toHaveClass("rounded-full")
    expect(shape2).toHaveClass("mix-blend-multiply")
    expect(shape2).toHaveClass("opacity-30")
    expect(shape2).toHaveClass("blur-3xl")

    const shape3 = container.querySelector(".top-1/2.left-1/3")
    expect(shape3).toBeInTheDocument()
    expect(shape3).toHaveClass("w-64")
    expect(shape3).toHaveClass("h-64")
    expect(shape3).toHaveClass("bg-gradient-to-r")
    expect(shape3).toHaveClass("from-yellow-200")
    expect(shape3).toHaveClass("to-pink-200")
    expect(shape3).toHaveClass("opacity-20")
    expect(shape3).toHaveClass("rounded-full")
    expect(shape3).toHaveClass("blur-[60px]")
  })
})
