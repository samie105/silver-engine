"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import { AuthOverlay } from "@/components/auth-overlay"
import { getAccessToken } from "@/lib/client-cookies"

export default function ContactPage() {
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
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">Contact Us</h1>

            <Card className="overflow-hidden">
              <CardHeader className="bg-card pb-6">
                <CardTitle className="text-xl md:text-2xl">Current Capitals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (603)-200-9573
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <Link href="mailto:team@currentcapitalinvestors.com" className="text-primary hover:underline">
                      team@currentcapitalinvestors.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Website</p>
                    <Link
                      href="https://cardonecapital.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      https://currentcapitalinvestors.com/
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Mailing Address</p>
                    <p className="text-muted-foreground">4000 Hollywood Boulevard, #765-S</p>
                    <p className="text-muted-foreground"> Hollywood,FL 33021</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Show the auth overlay if not authenticated */}
      {!isAuthenticated && <AuthOverlay />}
    </div>
  )
}

