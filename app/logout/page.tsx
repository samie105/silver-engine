"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { removeAccessToken, removeUserFromStorage } from "@/lib/client-storage"

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Clear localStorage
        removeAccessToken()
        removeUserFromStorage()

        toast.success("You have been logged out successfully")

        // Redirect to login page
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      } catch (error) {
        console.error("Logout error:", error)
        toast.error("Something went wrong during logout")

        // Redirect to login page anyway
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      }
    }

    performLogout()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
        <p className="text-muted-foreground">Please wait while we log you out.</p>
      </div>
    </div>
  )
}

