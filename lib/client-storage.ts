// Client-side storage utilities using localStorage instead of cookies

// Get a value from localStorage by key
export function getStorageItem(key: string): string | null {
  if (typeof window === "undefined") return null // Check if running in browser

  try {
    return localStorage.getItem(key)
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error)
    return null
  }
}

// Set a value in localStorage
export function setStorageItem(key: string, value: string): void {
  if (typeof window === "undefined") return // Check if running in browser

  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error)
  }
}

// Remove a value from localStorage
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") return // Check if running in browser

  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
  }
}

// Get the access token from localStorage
export function getAccessToken(): string | null {
  return getStorageItem("access_token")
}

// Set the access token in localStorage
export function setAccessToken(token: string): void {
  setStorageItem("access_token", token)
}

// Remove the access token from localStorage
export function removeAccessToken(): void {
  removeStorageItem("access_token")
}

// Get user data from localStorage
export function getUserFromStorage(): any {
  const userDataStr = getStorageItem("user_data")
  if (!userDataStr) return null

  try {
    return JSON.parse(userDataStr)
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error)
    return null
  }
}

// Set user data in localStorage
export function setUserInStorage(userData: any): void {
  if (!userData) return
  setStorageItem("user_data", JSON.stringify(userData))
}

// Remove user data from localStorage
export function removeUserFromStorage(): void {
  removeStorageItem("user_data")
}

// Check if user is authenticated based on localStorage
export function isAuthenticated(): boolean {
  return !!getAccessToken()
}

