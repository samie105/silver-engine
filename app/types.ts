// Login form data types
export type LoginFormData = {
  email: string
  password: string
}

// Signup form data type
export type SignupFormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
}

// Device information for authentication logging
export type DeviceInfo = {
  browser: string
  operatingSystem: string
  device: string
  location: string | null
}

