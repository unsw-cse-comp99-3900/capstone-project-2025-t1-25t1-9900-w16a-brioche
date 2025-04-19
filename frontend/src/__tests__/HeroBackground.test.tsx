import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HeroBackground from "./HeroBackground"
import GridPatternOverlay from "@/components/common/GridPatternOverlay"

// Mock the GridPatternOverlay component
vi.mock("@/components/common/GridPatternOverlay", () => ({
  __esModule: true,
  default: () => <div>MockGridPatternOverlay</div>,
}))

describe("HeroBackground", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroBackground />)
    expect(container).toBeInTheDocument()
  })

  it("renders the gradient background", () => {
    const { container } = render(<HeroBackground />)
    const backgroundElement = container.firstChild

    expect(backgroundElement).toBeInTheDocument()
    expect(backgroundElement).toHaveClass("absolute")
    expect(backgroundElement).toHaveClass("inset-0")
    expect(backgroundElement).toHaveClass("bg-gradient-to-br")
    expect(backgroundElement).toHaveClass("from-indigo-50")
    expect(backgroundElement).toHaveClass("via-white")
    expect(backgroundElement).toHaveClass("to-blue-50")
  })

  it("renders the grid pattern overlay", () => {
    const { getByText } = render(<HeroBackground />)
    expect(getByText("MockGridPatternOverlay")).toBeInTheDocument()
  })

  it("renders the blurred shapes with correct styles", () => {
    const { container } = render(<HeroBackground />)

    const shape1 = container.querySelector(".top-0.right-0.-mr-20.-mt-20")
    expect(shape1).toBeInTheDocument()
    expect(shape1).toHaveClass("w-96")
    expect(shape1).toHaveClass("h-96")
    expect(shape1).toHaveClass("bg-gradient-to-br")
    expect(shape1).toHaveClass("from-primary-300")
    expect(shape1).toHaveClass("to-blue-300")
    expect(shape1).toHaveClass("opacity-20")
    expect(shape1).toHaveClass("rounded-full")
    expect(shape1).toHaveClass("blur-[80px]")

    const shape2 = container.querySelector(".bottom-0.left-0.-ml-20.-mb-20")
    expect(shape2).toBeInTheDocument()
    expect(shape2).toHaveClass("w-96")
    expect(shape2).toHaveClass("h-96")
    expect(shape2).toHaveClass("bg-gradient-to-tr")
    expect(shape2).toHaveClass("from-purple-300")
    expect(shape2).toHaveClass("to-primary-300")
    expect(shape2).toHaveClass("opacity-20")
    expect(shape2).toHaveClass("rounded-full")
    expect(shape2).toHaveClass("blur-[80px]")

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
