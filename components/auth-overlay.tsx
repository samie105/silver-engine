"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LockKeyhole } from "lucide-react"
import { isAuthenticated } from "@/lib/client-storage"

export function AuthOverlay() {
  const router = useRouter()
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    // Check authentication status on the client side
    const authStatus = isAuthenticated()
    setShowOverlay(!authStatus)
  }, [])

  if (!showOverlay) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-3">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold">Authentication Required</h2>
          <p className="mb-6 text-muted-foreground">You must login first to access the investor dashboard.</p>
          <Button onClick={() => router.push("/login")} className="min-w-[150px]">
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  )
}

