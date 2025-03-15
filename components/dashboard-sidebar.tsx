"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FolderClosed, ArrowLeftRight, Mail, User } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-background overflow-y-auto z-30 hidden lg:block">
      <div className="flex h-full flex-col">
        <div className="py-4">
          <div className="mb-2 px-4">
            <div className="h-14 flex items-center lg:hidden">
              <h2 className="text-xl font-bold text-foreground">Current Capitals</h2>
            </div>
          </div>
          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <div className="flex items-center">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              href="/dashboard/documents"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/documents"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <FolderClosed className="mr-3 h-5 w-5" />
              <span>Documents</span>
            </Link>
            <Link
              href="/dashboard/transactions"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/transactions"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <ArrowLeftRight className="mr-3 h-5 w-5" />
              <span>Transactions</span>
            </Link>
            <Link
              href="/dashboard/contact"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/contact"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Mail className="mr-3 h-5 w-5" />
              <span>Contact Us</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/profile"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              <span>My Profile</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

