import { Badge } from "@/components/ui/badge";
import type { TicketStatus, TicketPriority } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TicketBadges({
  status,
  priority,
}: {
  status: TicketStatus;
  priority: TicketPriority;
}) {
  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "ASSIGNED":
        return "bg-yellow-200 text-yellow-800";
      case "RESOLVED":
        return "bg-green-200 text-green-800";
      case "CLOSED":
        return "bg-black text-white";
      default:
        return "bg-blue-200 text-blue-800";
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "LOW":
        return "bg-yellow-100 text-yellow-800";
      case "MEDIUM":
        return "bg-orange-200 text-orange-800";
      case "HIGH":
        return "bg-red-200 text-red-800";
      default:
        return "bg-blue-200 text-blue-800";
    }
  };

  return (
    <div className="space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={"default"} className={`${getStatusColor(status)}`}>
            {status}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Status</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={"default"}
            className={`${getPriorityColor(priority)}`}
          >
            {priority}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Priority</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
