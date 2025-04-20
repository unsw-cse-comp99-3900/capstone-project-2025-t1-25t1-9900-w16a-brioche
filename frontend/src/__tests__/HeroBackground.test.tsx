import { render } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import HeroBackground from "@/components/landing/HeroBackground"

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
    expect(shape1).toHaveClass(
      "w-96",
      "h-96",
      "bg-gradient-to-br",
      "from-primary-300",
      "to-blue-300",
      "opacity-20",
      "rounded-full",
      "blur-[80px]"
    )

    const shape2 = container.querySelector(".bottom-0.left-0.-ml-20.-mb-20")
    expect(shape2).toBeInTheDocument()
    expect(shape2).toHaveClass(
      "w-96",
      "h-96",
      "bg-gradient-to-tr",
      "from-purple-300",
      "to-primary-300",
      "opacity-20",
      "rounded-full",
      "blur-[80px]"
    )

    // Fix the invalid selector here by using classList check
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
