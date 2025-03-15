import Link from "next/link"
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"

const navigation = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Property Management", href: "#" },
    { name: "Leasing", href: "#" },
    { name: "Development", href: "#" },
    { name: "Leadership", href: "#" },
    { name: "Invest", href: "/invest" },
    { name: "Contact us", href: "/contact" },
  ],
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1B2333] text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/current-capital-logo-vmzOMQyyA1wCCjdRf4QEIBiZ3tf06r.png"
              alt="Current Capital"
              width={240}
              height={48}
              className="h-12 w-auto"
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">HEADQUARTERS - HOLLYWOOD, FL</p>
                  <p>4000 Hollywood Boulevard. #765-S</p>
                  <p>Hollywood, Florida 33021</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <a href="mailto:team@currentcapitalinvestors.com" className="hover:underline">
                  team@currentcapitalinvestors.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:+19547805479" className="hover:underline">
                  +1 (954) 780-5479
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h3 className="text-sm font-semibold">Company</h3>
                <ul role="list" className="mt-6 space-y-3">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm hover:underline">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="h-[300px] w-full overflow-hidden rounded-lg">
              <iframe
                src="https://maps.google.com/maps?q=Current%20Capital%20Group%2C%20Hollywood%2C%20FL&amp;t=m&amp;z=12&amp;output=embed&amp;iwloc=near"
                title="Current Capital Group, Hollywood, FL"
                aria-label="Current Capital Group, Hollywood, FL"
                className="h-full w-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm">Copyright © 2019 – Current Capital Group</p>
            <p className="text-sm">Design by SL Marketing LLC</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

