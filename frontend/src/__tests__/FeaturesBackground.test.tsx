import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import FeaturesBackground from "@/components/landing/FeaturesBackground"

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
    expect(blurredShapes.length).toBeGreaterThanOrEqual(4)

    const shape1 = container.querySelector(".top-40.-left-40")
    expect(shape1).toBeInTheDocument()
    expect(shape1).toHaveClass(
      "w-96",
      "h-96",
      "bg-primary-100",
      "rounded-full",
      "mix-blend-multiply",
      "opacity-30",
      "blur-3xl"
    )

    const shape2 = container.querySelector(".bottom-40.-right-40")
    expect(shape2).toBeInTheDocument()
    expect(shape2).toHaveClass(
      "w-96",
      "h-96",
      "bg-blue-100",
      "rounded-full",
      "mix-blend-multiply",
      "opacity-30",
      "blur-3xl"
    )

    const shape3 = Array.from(container.querySelectorAll("div")).find(
      (el) =>
        el.classList.contains("top-1/2") && el.classList.contains("left-1/3")
    )

    expect(shape3).toBeInTheDocument()
    expect(shape3).toHaveClass(
      "w-64",
      "h-64",
      "bg-gradient-to-r",
      "from-yellow-200",
      "to-pink-200",
      "opacity-20",
      "rounded-full",
      "blur-[60px]"
    )
  })
})
