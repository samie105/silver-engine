import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function InvestPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container my-12 max-w-4xl space-y-12">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold text-primary">INVEST WITH US.</h1>
            <p className="text-lg text-muted-foreground">
              Current Capital Group and affiliated companies are active investor's in value-add real estate, which are
              properties in need of facility or management improvements to boost returns, throughout the United States.
              Over nearly 20 years, the South Florida -based firm has acquired several real estate assets, deploying
              millions in capital.
            </p>
          </div>

          <div className="space-y-6 text-muted-foreground">
            <p>
              While liquidity and pricing for real estate assets have increased significantly since the global financial
              crisis, the market for underperforming properties in the current economic environment is sizeable and
              inefficient, under our analysis. There are many assets where the current owner lacks the capital,
              expertise, time or motivation to maximize value.
            </p>

            <p>
              Current Capital and affiliated companies made several acquisitions in this present cycle. These
              acquisitions include assets distressed retail, warehouse and multifamily assets.
            </p>

            <p>
              The next four years are likely to be an attractive time to pursue real estate investments with its
              strategy to add value, with improvement in employment growth, household formation and consumer spending
              leading to increased demand for real estate.
            </p>

            <p>
              Generally, Current Capital will work with local operating partners to correct the asset's performance and
              increase cash flow, and as a result, add value.
            </p>

            <p>
              Our targeted holding period for assets is expected to be three to six years, depending on the length of
              time needed to correct an asset's underperformance. Once the improved performance is stabilized, the fund
              would position the assets for sale to real estate investors.
            </p>

            <div className="pt-6 text-center">
              <p className="mb-8 text-xl font-semibold text-foreground">
                We are privileged to partner with you and thank you for investing with Current Capital for your real
                estate investment needs.
              </p>
              <Button asChild size="lg">
                <Link href="https://t.me/T_Nepola" target="_blank" rel="noopener noreferrer">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

