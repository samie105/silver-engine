"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Invest", href: "/invest" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/signup" },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/current-capital-logo-vmzOMQyyA1wCCjdRf4QEIBiZ3tf06r.png"
            alt="Current Capital"
            width={200}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

