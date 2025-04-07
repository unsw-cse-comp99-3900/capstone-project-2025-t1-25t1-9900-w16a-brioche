/**
 * Utility functions for formatting values
 */

/**
 * Formats a price string to a standard format with 2 decimal places
 * Cleans non-numeric characters (except decimal point), converts to number,
 * and formats to 2 decimal places
 *
 * @param priceStr - The price string to format
 * @returns Formatted price string with 2 decimal places
 */
export const formatPrice = (priceStr: string): string => {
  if (!priceStr) return ""

  // Remove all non-numeric characters except decimal point
  const cleanedStr = priceStr.replace(/[^0-9.]/g, "")

  // Convert to number and handle potential parsing errors
  const price = parseFloat(cleanedStr)
  if (isNaN(price)) return ""

  // Format to 2 decimal places
  return price.toFixed(2)
}
