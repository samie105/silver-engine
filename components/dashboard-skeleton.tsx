import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Skeleton className="h-8 w-48" />
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      <Skeleton className="h-[180px] w-full" />

      <div>
        <Skeleton className="mb-4 h-7 w-48" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="overflow-hidden rounded-md">
                <Skeleton className="h-[180px] w-full" />
                <div className="p-3 md:p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2 ml-auto" />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2 ml-auto" />
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2 ml-auto" />
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4 border-t border-border">
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

