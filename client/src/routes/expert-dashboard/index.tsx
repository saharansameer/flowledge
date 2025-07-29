import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/expert-dashboard/")({
  beforeLoad: () => checkAuth(["EXPERT"]),
  component: ExpertDashboard,
});

import { useQuery } from "@tanstack/react-query";
import axios from "@/app/config/axios";
import type { Ticket } from "@/types";
import { getErrorResponse } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { DashboardSkeleton, TicketCard, EmptyState } from "@/components";

async function getAssignedTickets() {
  const { data } = await axios
    .get("/api/v1/ticket/all")
    .then((res) => res.data)
    .catch((err) => getErrorResponse(err));

  return data;
}

function ExpertDashboard() {
  const { data, error, isFetching, isPending } = useQuery({
    queryKey: ["expert-dashboard"],
    queryFn: getAssignedTickets,
  });

  if (isFetching || isPending) {
    return <DashboardSkeleton />;
  }

  if (!data) {
    return <EmptyState role="EXPERT" />;
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10  py-10 px-2">
      {data.map((ticket: Ticket, index: number) => (
        <Link
          to={`/ticket/${ticket.id}`}
          key={`${index}-ticket`}
          className="cursor-default"
        >
          <TicketCard key={`${index}-ticket`} ticket={ticket} />
        </Link>
      ))}
    </div>
  );
}
