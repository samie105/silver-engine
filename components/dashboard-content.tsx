"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import { fetchDashboardData, type DashboardData } from "@/lib/api-service"

export function DashboardContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await fetchDashboardData()
        setDashboardData(data)
      } catch (err) {
        console.error("Error loading dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <main className="flex-1 w-full overflow-auto bg-background p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <DashboardSkeleton />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex-1 w-full overflow-auto bg-background p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
              <p>{error}</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  // Use placeholder data if API data is not available
  const plans = dashboardData?.plans || []
  const userData = dashboardData?.user?.[0]

  return (
    <main className="flex-1 w-full overflow-auto bg-background p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Dashboard</h1>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
              Current Capitals Website <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <Link href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
              Refer a Friend
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="mb-4 text-xl font-semibold text-green-500 md:mb-6 md:text-2xl">
              Welcome to your Investor Portal
            </h2>
            <ul className="ml-6 list-disc space-y-1 md:space-y-2">
              <li>Position Details</li>
              <li>Asset Information</li>
              <li>Tax Forms</li>
              <li>Reports & Documents</li>
              <li>Distributions</li>
              <li>Contributions</li>
            </ul>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground md:mb-6 md:text-2xl">Recent Offerings</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {plans.length > 0
              ? plans.map((plan, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={plan.photo || "/placeholder.svg?height=250&width=400"}
                        alt={plan.investmentname}
                        width={400}
                        height={250}
                        className="h-[180px] w-full object-cover sm:h-[200px]"
                      />
                    </div>
                    <CardContent className="p-3 md:p-4">
                      <h3 className="mb-1 text-base font-semibold md:mb-2 md:text-lg">{plan.investmentname}</h3>
                      <p className="mb-3 text-xs text-muted-foreground md:mb-4 md:text-sm">Funded recently</p>

                      <div className="grid grid-cols-2 gap-1 text-xs md:gap-2 md:text-sm">
                        <div>Target Investor IRR</div>
                        <div className="text-right">{plan.targetinvestor}</div>

                        <div>Target Cash on Cash</div>
                        <div className="text-right">{plan.targetcash}</div>

                        <div>Target Equity Multiple</div>
                        <div className="text-right">{plan.targetmultiple}</div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center border-t border-border p-3 md:p-4">
                      <Button variant="outline" className="w-full text-xs md:text-sm" asChild>
                        <Link href="https://t.me/T_Nepola" target="_blank" rel="noopener noreferrer">
                          Learn More
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              : // Fallback to placeholder data if no plans are available
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative">
                        <Image
                          src={`/placeholder.svg?height=250&width=400`}
                          alt={`Placeholder Investment ${index + 1}`}
                          width={400}
                          height={250}
                          className="h-[180px] w-full object-cover sm:h-[200px]"
                        />
                      </div>
                      <CardContent className="p-3 md:p-4">
                        <h3 className="mb-1 text-base font-semibold md:mb-2 md:text-lg">
                          Equity Fund {22 - index}, LLC
                        </h3>
                        <p className="mb-3 text-xs text-muted-foreground md:mb-4 md:text-sm">Funded recently</p>

                        <div className="grid grid-cols-2 gap-1 text-xs md:gap-2 md:text-sm">
                          <div>Target Investor IRR</div>
                          <div className="text-right">{15 - index}.00%</div>

                          <div>Target Cash on Cash</div>
                          <div className="text-right">6.00%</div>

                          <div>Target Equity Multiple</div>
                          <div className="text-right">{2.5 - index * 0.25}x</div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-center border-t border-border p-3 md:p-4">
                        <Button variant="outline" className="w-full text-xs md:text-sm" asChild>
                          <Link href="https://t.me/T_Nepola" target="_blank" rel="noopener noreferrer">
                            Learn More
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
          </div>
        </div>
      </div>
    </main>
  )
}

