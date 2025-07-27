import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/create-ticket/")({
  beforeLoad: () => checkAuth(),
  component: CreateTicketPage,
});

import { CreateTicketForm } from "@/components/Ticket/CreateTicketForm";

function CreateTicketPage() {
  return (
    <div className="w-full flex justify-center mx-auto px-2">
      <div className="w-full max-w-2xl space-y-6 py-2">
        <div>
          <h1 className="font-bold text-2xl">Create Ticket</h1>
          <p className="text-xs text-muted-foreground">
            Ticket can not be modified after creation, Please recheck details before creating
          </p>
        </div>

        <CreateTicketForm />
      </div>
    </div>
  );
}
