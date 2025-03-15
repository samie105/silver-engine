"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchDashboardData } from "@/lib/api-service"
import { Skeleton } from "@/components/ui/skeleton"
import { AuthOverlay } from "@/components/auth-overlay"
import { isAuthenticated } from "@/lib/client-storage"

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if the user is authenticated using localStorage
    const authStatus = isAuthenticated()
    setIsAuth(authStatus)

    if (authStatus) {
      const loadUserData = async () => {
        try {
          const data = await fetchDashboardData()
          if (data && data.user && data.user[0]) {
            setUserData(data.user[0])
          }
        } catch (err) {
          console.error("Error loading user data:", err)
          setError("Failed to load profile data. Please try again later.")
        } finally {
          setIsLoading(false)
        }
      }

      loadUserData()
    } else {
      setIsLoading(false)
    }
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

  const renderProfileContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-8 w-16" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="grid grid-cols-[120px_1fr] items-center gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (error) {
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
            <p>{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            {/* Edit button removed */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm text-muted-foreground">Name</div>
                <div>{userData ? `${userData.firstname} ${userData.lastname}` : "Martin Smith"}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm text-muted-foreground">Phone</div>
                <div>{userData?.phonenumber || "(941) 210-0441"}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm text-muted-foreground">Login Email</div>
                <div>{userData?.email || "mailcapers@gmail.com"}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm text-muted-foreground">Email</div>
                <div>{userData?.email || "Mailcapers@gmail.com"}</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm text-muted-foreground">Address</div>
                <div>--</div>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <div className="text-sm text-muted-foreground">FinCEN ID</div>
                <div>--</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <Collapsible defaultOpen>
            <CardHeader className="pb-0">
              <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
                <h2 className="text-lg font-semibold">Investing Entities</h2>
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead className="w-[200px]">Investments</TableHead>
                      <TableHead className="w-[200px]">Monthly Yield</TableHead>
                      <TableHead className="text-right">Profits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData && userData.investments && userData.investments.length > 0 ? (
                      userData.investments.map((investment: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{investment.name}</TableCell>
                          <TableCell>${investment.investmentSum.toLocaleString()}</TableCell>
                          <TableCell>{investment.monthlyYield}</TableCell>
                          <TableCell className="text-right">${investment.profits.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No investing entities found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </>
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
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="ml-4 text-2xl font-bold text-foreground">My Profile</h1>
            </div>

            {renderProfileContent()}
          </div>
        </main>
      </div>

      {/* Show the auth overlay if not authenticated */}
      {!isAuth && <AuthOverlay />}
    </div>
  )
}

