import { ErrorState } from "@/components";

export function NotFoundPage() {
  return (
    <div className="w-full h-[90vh] mx-auto flex gap-5 justify-center items-center max-w-2xl">
      <ErrorState
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist or has been moved to another location."
      />
    </div>
  );
}
