import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/ticket/$ticketId")({
  beforeLoad: () => checkAuth(["USER", "EXPERT"]),
  component: TicketPage,
});

import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "@/app/config/axios";
import { getErrorResponse } from "@/lib/utils";
import { TicketDetails } from "@/components/Ticket/TicketDetails";
import useAuthStore from "@/app/store/auth-store";
import { TicketDetailsSkeleton } from "@/components";

async function getTicket(id: string) {
  const { data } = await axios
    .get(`/api/v1/ticket/${id}`)
    .then((res) => res.data)
    .catch((err) => getErrorResponse(err));

  return data;
}

function TicketPage() {
  const { ticketId } = useParams({ strict: false });
  const { userRole } = useAuthStore();

  const { data, error, isFetching, isPending } = useQuery({
    queryKey: ["ticket", ticketId, userRole],
    queryFn: () => getTicket(ticketId),
  });

  if (isFetching || isPending) {
    return <TicketDetailsSkeleton isExpert={userRole === "EXPERT"} />;
  }

  if (!data) {
    return <div>Empty</div>;
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="w-full mx-auto px-2">
      <TicketDetails ticket={data} />
    </div>
  );
}
