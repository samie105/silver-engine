"use server"

import type { LoginFormData, SignupFormData, DeviceInfo } from "@/app/types"
import { getBrowserName } from "@/app/utils/helpers"

// Login action function
export async function loginAction(formData: LoginFormData, userAgent?: string) {
  try {
    // Validate the data
    if (!formData.email || !formData.password) {
      return { success: false, message: "Please enter both email and password" }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    // Prepare device info if userAgent is provided
    let deviceInfo: DeviceInfo | undefined
    if (userAgent) {
      deviceInfo = {
        browser: getBrowserName(userAgent),
        operatingSystem: "Unknown", // Would be determined server-side
        device: "Unknown", // Would be determined server-side
        location: null, // Would require user permission
      }
    }

    // Create data object to send to the API
    const data = {
      email: formData.email.toLowerCase(),
      password: formData.password,
    }

    // Make the API call to the authentication server
    const response = await fetch("https://shalomserver.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    // Check if the login was successful
    if (!response.ok || responseData.error === true) {
      return {
        success: false,
        message: responseData.message || "Invalid email or password",
      }
    }

    // Extract the token from the response
    const token = responseData.message

    // For demo purposes, we'll use a default user name
    // In a real app, you would get this from the user profile API
    const userName = formData.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " ")
    const capitalizedName = userName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Log device info for security purposes
    console.log("Login successful:", {
      email: formData.email.toLowerCase(),
      deviceInfo,
    })

    // Return user data and token to be stored in localStorage on the client
    return {
      success: true,
      message: "Login successful!",
      token,
      userData: {
        id: Math.random().toString(36).substring(2, 15),
        name: capitalizedName,
        email: formData.email.toLowerCase(),
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}

// Signup action function
export async function signupAction(formData: SignupFormData, userAgent?: string) {
  try {
    // Validate the data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    // Check password length
    if (formData.password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters long" }
    }

    // Prepare device info if userAgent is provided
    let deviceInfo: DeviceInfo | undefined
    if (userAgent) {
      deviceInfo = {
        browser: getBrowserName(userAgent),
        operatingSystem: "Unknown",
        device: "Unknown",
        location: null,
      }
    }

    // Create data object to send to the API
    const data = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      phone: formData.phone,
      email: formData.email.toLowerCase(),
      password: formData.password,
    }

    // Make the API call to the signup endpoint
    const response = await fetch("https://shalomserver.onrender.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    // Check if the signup was successful
    if (!response.ok || responseData.error === true) {
      return {
        success: false,
        message: responseData.message || "Failed to create account",
      }
    }

    // Log signup success for security monitoring
    console.log("Signup successful:", {
      email: formData.email.toLowerCase(),
      deviceInfo,
    })

    return { success: true, message: "Account created successfully! You can now log in." }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}

// Logout action function - now just a placeholder since logout is handled client-side
export async function logoutAction() {
  return { success: true }
}

export type ActionResponse = {
  success: boolean
  message: string
  token?: string
  userData?: {
    id: string
    name: string
    email: string
  }
}

export type { LoginFormData, SignupFormData }

