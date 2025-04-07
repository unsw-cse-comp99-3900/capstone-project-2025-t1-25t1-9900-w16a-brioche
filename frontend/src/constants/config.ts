export const BACKEND_PORT = 5080

export const PRODUCT_BACKEND_URL = "http://localhost:5080/api"

export const Demo_RECKON_BOOK_ID = "09174240-c462-4564-9181-8cf1d4c2319f"

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
