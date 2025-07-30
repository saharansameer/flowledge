import { Skeleton } from "@/components/ui/skeleton";

function TicketCardSkeleton() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md min-h-48 flex flex-col border border-border/50 rounded-lg py-3">
        <div className="flex-shrink-0 px-3">
          <div className="flex items-center justify-between">
            {/* Status and Priority badges skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            {/* Date skeleton */}
            <Skeleton className="h-3 w-20" />
          </div>
          {/* Title skeleton */}
          <div className="space-y-2 mt-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
        <div className="px-3 flex-1 flex flex-col justify-end gap-y-3">
          {/* Summary skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          {/* Skills badges skeleton */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 py-10 px-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <TicketCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
