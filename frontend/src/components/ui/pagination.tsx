/**
 * @file Pagination.tsx - Provides reusable pagination components including links, previous/next buttons, and ellipsis.
 */

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

/**
 * Pagination Component
 *
 * Acts as the root container for the pagination navigation bar.
 *
 * @param {React.ComponentProps<"nav">} props - Standard nav element props.
 * @returns {JSX.Element} - The navigation wrapper.
 */
const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

/**
 * PaginationContent Component
 *
 * Wraps pagination items inside an unordered list.
 *
 * @param {React.ComponentProps<"ul">} props - Standard ul element props.
 * @returns {JSX.Element} - The list of pagination items.
 */
const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

/**
 * PaginationItem Component
 *
 * Wraps a single pagination item (e.g. link, ellipsis).
 *
 * @param {React.ComponentProps<"li">} props - Standard li element props.
 * @returns {JSX.Element} - The pagination item.
 */
const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

/**
 * PaginationLink Component
 *
 * Renders a pagination link, optionally marked as active.
 *
 * @param {PaginationLinkProps} props - The props including active state.
 * @returns {JSX.Element} - The anchor element.
 */
const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

/**
 * PaginationPrevious Component
 *
 * Button to go to the previous page.
 *
 * @param {React.ComponentProps<typeof PaginationLink>} props - Link props.
 * @returns {JSX.Element} - The previous page button.
 */
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

/**
 * PaginationNext Component
 *
 * Button to go to the next page.
 *
 * @param {React.ComponentProps<typeof PaginationLink>} props - Link props.
 * @returns {JSX.Element} - The next page button.
 */
const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

/**
 * PaginationEllipsis Component
 *
 * Renders an ellipsis to indicate hidden pages in pagination.
 *
 * @param {React.ComponentProps<"span">} props - Span props.
 * @returns {JSX.Element} - The ellipsis item.
 */
const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
