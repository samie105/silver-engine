"use client"

import { useEffect, useState } from "react"
import { DashboardContent } from "@/components/dashboard-content"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AuthOverlay } from "@/components/auth-overlay"
import { isAuthenticated } from "@/lib/client-storage"

export default function DashboardPage() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the user is authenticated using localStorage
    setIsAuth(isAuthenticated())
  }, [])

  // Show loading state while checking authentication
  if (isAuth === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
          <p className="text-muted-foreground">Please wait while we verify your access.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        <div className="hidden lg:block lg:w-64">
          {/* This div is just a spacer to account for the fixed sidebar */}
        </div>
        <DashboardSidebar />
        <DashboardContent />
      </div>

      {/* Show the auth overlay if not authenticated */}
      {!isAuth && <AuthOverlay />}
    </div>
  )
}

