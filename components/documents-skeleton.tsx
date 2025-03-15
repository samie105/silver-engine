import { Skeleton } from "@/components/ui/skeleton"

export function DocumentsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="rounded-md border">
        <div className="h-12 border-b px-4 py-3">
          <div className="flex items-center">
            <Skeleton className="h-5 w-full max-w-[600px]" />
          </div>
        </div>

        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border-b px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 w-[40%]">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-full max-w-[200px]" />
                </div>
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

