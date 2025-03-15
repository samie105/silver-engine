"use server"

import { cookies } from "next/headers"

type UserSession = {
  id: string
  name: string
  email: string
  isAuthenticated: boolean
  accessToken?: string // Add access token to the session
}

export async function setSessionCookie(userData: UserSession) {
  // Set expiration to 1 day from now
  const expires = new Date()
  expires.setDate(expires.getDate() + 1)

  // Convert user data to JSON string
  const sessionData = JSON.stringify(userData)

  // Get the cookies instance and await it
  const cookieStore = await cookies()

  // Set the cookie
  cookieStore.set({
    name: "user_session",
    value: sessionData,
    expires,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Changed from strict to lax
  })

  // If there's an access token, set it in a separate cookie
  if (userData.accessToken) {
    cookieStore.set({
      name: "access_token",
      value: userData.accessToken,
      expires,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from strict to lax
    })
  }
}

export async function getSessionCookie(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("user_session")

  if (!sessionCookie) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value) as UserSession
  } catch (error) {
    console.error("Error parsing session cookie:", error)
    return null
  }
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("user_session")
  cookieStore.delete("access_token")
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSessionCookie()
  return !!session?.isAuthenticated
}

// Add a function to get the access token
export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get("access_token")
  return tokenCookie ? tokenCookie.value : null
}

