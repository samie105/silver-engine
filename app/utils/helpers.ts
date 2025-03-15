/**
 * Utility functions for the application
 */

/**
 * Extracts the browser name from the user agent string
 * @param userAgent - The user agent string from the request
 * @returns The name of the browser
 */
export function getBrowserName(userAgent: string): string {
  if (!userAgent) return "Unknown"

  // Check for common browsers
  if (userAgent.indexOf("Firefox") > -1) {
    return "Firefox"
  } else if (userAgent.indexOf("SamsungBrowser") > -1) {
    return "Samsung Browser"
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    return "Opera"
  } else if (userAgent.indexOf("Trident") > -1) {
    return "Internet Explorer"
  } else if (userAgent.indexOf("Edge") > -1) {
    return "Edge"
  } else if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome"
  } else if (userAgent.indexOf("Safari") > -1) {
    return "Safari"
  } else {
    return "Unknown"
  }
}

/**
 * Formats a date to a readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param length - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
  if (!str) return ""
  if (str.length <= length) return str
  return str.substring(0, length) + "..."
}

