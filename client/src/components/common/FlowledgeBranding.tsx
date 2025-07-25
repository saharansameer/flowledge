import { cn } from "@/lib/utils";

export function FlowledgeBranding({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-x-2 mb-10", className)}>
      <img src="/logo.png" alt="Flowledge-Logo" width={50} height={50} />

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold text-3xl font-sans text-primary">
          Flowledge
        </span>
      </div>
    </div>
  );
}
