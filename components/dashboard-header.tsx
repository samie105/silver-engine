"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ExternalLink,
  ChevronDown,
  User,
  LogOut,
  Menu,
  LayoutDashboard,
  FolderClosed,
  ArrowLeftRight,
  Mail,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { getUserFromStorage } from "@/lib/client-storage"
import { fetchDashboardData } from "@/lib/api-service"

export function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState("User")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      try {
        // First check localStorage for user data
        const userData = getUserFromStorage()
        if (userData && userData.name) {
          setUserName(userData.name)
          setIsLoading(false)
          return
        }

        // If not in localStorage, try to fetch from API
        const dashboardData = await fetchDashboardData()

        if (dashboardData && dashboardData.user && dashboardData.user[0]) {
          const apiUserData = dashboardData.user[0]

          // Set the user name from the API data
          if (apiUserData.firstname && apiUserData.lastname) {
            setUserName(`${apiUserData.firstname} ${apiUserData.lastname}`)
          } else if (apiUserData.name) {
            setUserName(apiUserData.name)
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/dashboard" className="font-semibold text-lg text-foreground">
            Current Capitals
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />

          <Link href="#" className="hidden items-center gap-1 text-sm text-primary hover:underline md:flex">
            Help Center <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-foreground">
                {isLoading ? (
                  <span className="hidden sm:inline-block">Loading...</span>
                ) : (
                  <span className="hidden sm:inline-block">{userName}</span>
                )}
                <User className="h-4 w-4 sm:hidden" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link href="/dashboard/profile" className="flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/logout" className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/80" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-[280px] bg-background h-full overflow-y-auto">
            <button
              className="absolute right-4 top-4 rounded-sm opacity-70 text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
            <div className="py-4 mt-6">
              <div className="mb-2 px-4">
                <div className="h-14 flex items-center">
                  <h2 className="text-xl font-bold text-foreground">Current Capitals</h2>
                </div>
              </div>
              <nav className="space-y-1 px-2">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center">
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <FolderClosed className="mr-3 h-5 w-5" />
                  <span>Documents</span>
                </Link>
                <Link
                  href="/dashboard/transactions"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeftRight className="mr-3 h-5 w-5" />
                  <span>Transactions</span>
                </Link>
                <Link
                  href="/dashboard/contact"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  <span>Contact Us</span>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>My Profile</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

