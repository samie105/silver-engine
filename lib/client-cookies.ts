// Client-side cookie utilities

// Get a cookie value by name
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null // Check if running in browser

  const cookies = document.cookie.split(";")
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    // Check if this cookie starts with the name we want
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1))
    }
  }
  return null
}

// Set a cookie with the given name, value, and expiration days
export function setCookie(name: string, value: string, days = 1): void {
  if (typeof document === "undefined") return // Check if running in browser

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax` // Changed from Strict to Lax
}

// Delete a cookie by name
export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return // Check if running in browser

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
}

// Get the access token from cookies
export function getAccessToken(): string | null {
  // First try to get the dedicated access_token cookie
  const tokenFromCookie = getCookie("access_token")
  if (tokenFromCookie) return tokenFromCookie

  // If not found, try to extract it from the user session
  const userSessionStr = getCookie("user_session")
  if (userSessionStr) {
    try {
      const userSession = JSON.parse(userSessionStr)
      return userSession.accessToken || null
    } catch (error) {
      console.error("Error parsing user session cookie:", error)
    }
  }

  return null
}

// Get user data from cookies
export function getUserFromCookie(): any {
  const userSessionStr = getCookie("user_session")
  if (!userSessionStr) return null

  try {
    return JSON.parse(userSessionStr)
  } catch (error) {
    console.error("Error parsing user session cookie:", error)
    return null
  }
}

// Set user data in the client-side cookie
export function setUserInCookie(userData: any): void {
  if (!userData) return

  const userSessionStr = getCookie("user_session")
  if (userSessionStr) {
    try {
      const currentSession = JSON.parse(userSessionStr)
      // Merge the new user data with the existing session
      const updatedSession = { ...currentSession, ...userData }
      setCookie("user_session", JSON.stringify(updatedSession))
    } catch (error) {
      console.error("Error updating user session cookie:", error)
    }
  }
}

