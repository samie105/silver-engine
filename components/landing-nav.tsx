"use client"

import Link from "next/link"
import Image from "next/image"

export function LandingNav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="text-xl font-semibold text-white">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/current-capital-logo-HWcZSLlKAcL7UYRuSrFUQZyzzveVaW.png"
              alt="Current Capital"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-white hover:text-white/80 transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-sm text-white hover:text-white/80 transition-colors">
              Contact
            </Link>
            <Link href="/invest" className="text-sm text-white hover:text-white/80 transition-colors">
              Invest
            </Link>
            <Link href="/login" className="text-sm text-white hover:text-white/80 transition-colors">
              Login
            </Link>
            <Link href="/signup" className="text-sm text-white hover:text-white/80 transition-colors">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

