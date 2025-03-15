import Image from "next/image"
import { LandingNav } from "@/components/landing-nav"
import { LandingFooter } from "@/components/landing-footer"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Background Image - Won't scroll with the page */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landingpagebackgroundimage.jpg-qdJKtjsQLnph5zfnCrYCa60ZHvoIoq.jpeg"
          alt="Current Capital Real Estate"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Darker overlay for better text visibility */}
      </div>

      {/* Content that will scroll over the fixed background */}
      <div className="relative min-h-screen flex flex-col">
        <LandingNav />

        <div className="flex-grow container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center text-white mb-16">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/currentcapitalhero-T8ddCXAb2EQ1WpFNPD9lmshYylT48P.png"
              alt="Current Capital Logo"
              width={120}
              height={120}
              className="mx-auto mb-8"
            />

            <div className="mb-6 text-sm tracking-wider">INVESTMENT • MANAGEMENT • DEVELOPMENT • BROKERAGE</div>

            <p className="text-lg md:text-xl text-white/90">
              We are a boutique real estate investment firm committed to delivering the highest level of service in the{" "}
              <span className="text-white font-medium">development, management, and leasing</span> of income producing
              commercial and residential real estate. Our focus ranges from{" "}
              <span className="text-orange-400">
                new construction, existing properties, rental and commercial properties
              </span>
              . We recognize each property and owner has their individual needs, so we make sure to deliver a unique
              experience to meet and exceed their standards.
            </p>
          </div>

          {/* Services Cards - now on top of background image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Management Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">MANAGEMENT</h2>
              <p className="text-gray-700">
                We go beyond collecting rent. Our team works hand in hand with owners and clients to develop a strategy
                to achieve their operational and financial goals. We use the latest technology and reporting systems to
                ensure transparency and efficiency.
              </p>
            </div>

            {/* Leasing Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">LEASING</h2>
              <p className="text-gray-700">
                Our team of leasing associates and asset specific specialists are experts in stabilizing properties to
                maximum economic potential. Our proactive and dynamic marketing is designed to attract quality tenants.
              </p>
            </div>

            {/* Development Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Development</h2>
              <p className="text-gray-700">
                It is crucial to have vision and direction to ensure your assets will actualize on the maximum potential
                of the investment you plan, or need to make. Our advisory and support will ensure that the development
                process is smooth.
              </p>
            </div>
          </div>
        </div>

        <LandingFooter />
      </div>
    </div>
  )
}

