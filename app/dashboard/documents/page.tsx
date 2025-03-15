"use client"

import { useEffect, useState } from "react"
import { DocumentsTable } from "@/components/documents-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { AuthOverlay } from "@/components/auth-overlay"
import { getAccessToken } from "@/lib/client-cookies"

export default function DocumentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the user is authenticated
    const token = getAccessToken()
    setIsAuthenticated(!!token)
  }, [])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
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
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">Documents</h1>
            <DocumentsTable />
          </div>
        </main>
      </div>

      {/* Show the auth overlay if not authenticated */}
      {!isAuthenticated && <AuthOverlay />}
    </div>
  )
}

