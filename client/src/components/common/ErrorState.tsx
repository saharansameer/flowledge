import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "@tanstack/react-router";

interface ErrorStateProps {
  title: string;
  description: string;
  variant?: "destructive" | "default" | null;
  onRefresh?: () => void;
}

export function ErrorState({
  title,
  description,
  variant = "destructive",
  onRefresh = () => window.location.reload(),
}: ErrorStateProps) {
  const navigate = useNavigate();

  return (
    <Alert variant={variant} className="max-w-xl mx-auto p-5">
      <AlertTitle className="text-2xl">{title}</AlertTitle>
      <AlertDescription className="mb-4">{description}</AlertDescription>
      <div className="flex gap-2">
        <Button onClick={onRefresh} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-3 w-3" />
          Refresh
        </Button>

        <Button
          onClick={() => navigate({ to: "/" })}
          variant="outline"
          size="sm"
        >
          <Home className="mr-2 h-3 w-3" />
          Go Home
        </Button>
      </div>
    </Alert>
  );
}
