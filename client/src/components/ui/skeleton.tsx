import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent-foreground/20 dark:bg-accent-foreground/40 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
