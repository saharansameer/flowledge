import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock } from "lucide-react";
import type { Ticket } from "@/types";
import useAuthStore from "@/app/store/auth-store";
import { getFormatDate } from "@/lib/utils";
import { TicketBadges } from "./TicketBadges";
import { ExpertMessageForm } from "../User/ExpertMessage";

export function TicketDetails({ ticket }: { ticket: Ticket }) {
  const { userRole } = useAuthStore();
  const isExpert = userRole === "EXPERT";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground select-none">
          <TicketBadges status={ticket.status} priority={ticket.priority} />
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>
              Created at {getFormatDate(ticket.createdAt, "date-time")}
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
          {ticket.title}
        </h1>
      </div>

      <Separator />

      {/* Description Section */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Description</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </p>
        </div>
      </div>

      <Separator />

      {/* Skills Section */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          Related Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {ticket.relatedSkills.map((skill, index) => (
            <Badge key={`${index}-skill`} variant="default">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      {isExpert && (
        <>
          {/* Summary Section */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {ticket.summary}
              </p>
            </CardContent>
          </Card>

          {/* Helpful Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Helpful Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {ticket.helpfulNotes}
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {/* Expert Response*/}
      <div className="space-y-3">
        {isExpert && !ticket.assigneeMessage && (
          <ExpertMessageForm ticketId={ticket.id} />
        )}

        {!isExpert && !ticket.assigneeMessage && (
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2 text-lg text-foreground">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Ticket Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {ticket.status === "CREATED"
                  ? "Your ticket has been created and is currently being reviewed. The most suitable expert will be assigned shortly."
                  : "An expert is reviewing your ticket. Hang tight — creating multiple tickets on same issue won't speed up the process and might cause delays. We appreciate your patience and are on it!"}
              </p>
            </CardContent>
          </Card>
        )}

        {ticket.assigneeMessage && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                Expert Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {ticket.assigneeMessage}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Last update: {getFormatDate(ticket.updatedAt, "date-time")}
        </p>
      </div>
    </div>
  );
}
