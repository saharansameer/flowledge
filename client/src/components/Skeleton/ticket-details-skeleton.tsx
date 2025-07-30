import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";

interface TicketDetailSkeletonProps {
  isExpert?: boolean;
}

export function TicketDetailsSkeleton({
  isExpert = false,
}: TicketDetailSkeletonProps) {
  return (
    <div className="w-full mx-auto px-2">
      <div className="max-w-4xl mx-auto space-y-6 py-5">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
            {/* Status and Priority badges skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            {/* Created date skeleton */}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          {/* Title skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-full max-w-2xl" />
            <Skeleton className="h-8 w-3/4 max-w-xl" />
          </div>
        </div>

        <Separator />

        {/* Description Section */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-24" /> {/* "Description" heading */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>

        <Separator />

        {/* Skills Section */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-32" /> {/* "Related Skills" heading */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
            <Skeleton className="h-6 w-22 rounded-full" />
          </div>
        </div>

        <Separator />

        {/* Expert-only sections */}
        {isExpert && (
          <>
            {/* Summary Section */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <Skeleton className="h-6 w-20" /> {/* "Summary" title */}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </CardContent>
            </Card>

            {/* Helpful Notes Section */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" /> {/* "Helpful Notes" title */}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Communication Section */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-36" /> {/* "Communication" heading */}
          <div className="space-y-4">
            {/* Generic message card skeleton */}
            <div className="border-l-4 border-l-black py-2">
              <div className="px-2">
                <div className="flex items-center gap-x-1 pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <Skeleton className="h-5 w-24" /> {/* Message sender */}
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Message Form Section */}
        <div className="space-y-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* "Message" label */}
              <Skeleton className="h-32 w-full rounded-md" /> {/* Textarea */}
              <Skeleton className="h-3 w-24" /> {/* Character count */}
            </div>
            <Skeleton className="h-10 w-full max-w-sm rounded-md" />{" "}
            {/* Send button */}
          </div>
          <Separator />
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center pb-20">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" /> {/* "Last update:" */}
            <Skeleton className="h-4 w-32" /> {/* Date */}
          </div>
          <Skeleton className="h-8 w-32 rounded-md" /> {/* Action button */}
        </div>
      </div>
    </div>
  );
}
