import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function LandingFooter() {
  return (
    <footer className="relative z-10 bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/current-capital-logo-HWcZSLlKAcL7UYRuSrFUQZyzzveVaW.png"
              alt="Current Capital"
              width={180}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-300 mb-4">
              A boutique real estate investment firm committed to delivering the highest level of service.
            </p>
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Phone className="h-4 w-4" />
              <span>+1 603-200-9573
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mb-2">
              <Mail className="h-4 w-4" />
              <span>team@currentcapitalinvestors.com</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <MapPin className="h-4 w-4 mt-1" />
              <span>
              4000 Hollywood Boulevard, #765-S
                <br />
                Hollywood,FL 33021
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-white transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Location</h3>
            <div className="h-48 w-full rounded-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.9741660446623!2d-80.14290492394576!3d26.10118179999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9ab3a2ec0b3c5%3A0x3d8f5d3b4d7e8b1a!2s18851%20NE%2029th%20Ave%20Suite%201000%2C%20Aventura%2C%20FL%2033180!5e0!3m2!1sen!2sus!4v1710518353000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Current Capital location"
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-gray-300 mt-2 text-sm">4000 Hollywood Boulevard, #765-S, Hollywood,FL 33021</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Current Capital Real Estate Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

