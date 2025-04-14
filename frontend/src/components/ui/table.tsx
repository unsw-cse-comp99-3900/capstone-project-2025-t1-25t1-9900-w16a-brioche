/**
 * @file Table.tsx - Defines a set of styled table components for use in UI layouts, including Table, TableHeader, TableBody, and others.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * TableHeader Component
 *
 * A wrapper for the `<thead>` section of a table.
 *
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - Thead attributes.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/**
 * TableHeader Component
 *
 * A wrapper for the `<thead>` section of a table.
 *
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - Thead attributes.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

/**
 * TableBody Component
 *
 * A wrapper for the `<tbody>` section of a table.
 *
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - Tbody attributes.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/**
 * TableFooter Component
 *
 * A wrapper for the `<tfoot>` section of a table.
 *
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - Tfoot attributes.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/**
 * TableRow Component
 *
 * A wrapper for the `<tr>` element with interactive row behavior.
 *
 * @param {React.HTMLAttributes<HTMLTableRowElement>} props - Tr attributes.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/**
 * TableHead Component
 *
 * A wrapper for `<th>` with styling for table headers.
 *
 * @param {React.ThHTMLAttributes<HTMLTableCellElement>} props - Th attributes.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/**
 * TableCell Component
 *
 * A wrapper for `<td>` with consistent cell styling.
 *
 * @param {React.TdHTMLAttributes<HTMLTableCellElement>} props - Td attributes.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

/**
 * TableCaption Component
 *
 * Displays a caption for the table.
 *
 * @param {React.HTMLAttributes<HTMLTableCaptionElement>} props - Caption attributes.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
