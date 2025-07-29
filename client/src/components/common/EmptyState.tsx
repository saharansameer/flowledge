import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/types";
import { Link } from "@tanstack/react-router";

interface EmptyStateProps {
  role: UserRole;
}

export function EmptyState({ role }: EmptyStateProps) {
  const isUser = role === "USER";
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center py-12">
        <Ticket className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {isUser ? "Nothing to show yet" : "No Ticket Assigned Yet"}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          {isUser
            ? "You don't have created any tickets yet. Create your first ticket to get started."
            : "No tickets have been assigned to you yet. Once a ticket is assigned, it will appear here. In the meantime, you can view a sample ticket to get an overview of what it looks like."}
        </p>
        {isUser ? (
          <Link to={"/create-ticket"}>
            <Button variant={"outline"}>Create Ticket</Button>
          </Link>
        ) : (
          <Link to={"/sample-ticket"}>
            <Button variant={"outline"}>Try Sample Ticket</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
