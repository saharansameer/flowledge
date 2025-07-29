import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFormatDate } from "@/lib/utils";
import type { Ticket } from "@/types";
import { TicketBadges } from "./TicketBadges";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md min-h-48 flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-border/50 hover:border-border py-3">
        <CardHeader className="flex-shrink-0 px-3 select-none">
          <div className="flex items-center justify-between cursor-default">
            <TicketBadges status={ticket.status} priority={ticket.priority} />

            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {getFormatDate(ticket.createdAt, "date-time")}
            </p>
          </div>
          <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 leading-tight">
            {ticket.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 flex-1 flex flex-col justify-end gap-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-tight">
            {ticket.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {ticket.relatedSkills.map((skill: string, index: number) => (
              <Badge key={`${index}-skill`} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
