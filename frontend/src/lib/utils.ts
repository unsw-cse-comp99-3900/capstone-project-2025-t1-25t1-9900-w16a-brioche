import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the current bookId.
 * Throws an error if bookId is not found in localStorage.
 * @returns {string} The bookId to use.
 * @throws {Error} If bookId is not found in localStorage.
 */
export const getBookId = (): string => {
  const bookId = localStorage.getItem("bookId")
  if (!bookId) {
    throw new Error(
      "bookId is not set in localStorage. Please select an integration."
    )
  }
  return bookId
}
