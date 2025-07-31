import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, Badge, Separator } from "@/components/ui";
import { Clock } from "lucide-react";
import { TicketBadges } from "./TicketBadges";
import { MessageForm } from "../User/MessageForm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import axios from "@/app/config/axios";
import useAuthStore from "@/app/store/auth-store";
import { getFormatDate } from "@/lib/utils";
import { getErrorResponse } from "@/lib/utils";
import type { Chat, TicketWithMessages } from "@/types";
import { toast } from "sonner";
import { queryClient } from "@/app/query/client";
import { useRouter } from "@tanstack/react-router";

export function TicketDetails({ ticket }: { ticket: TicketWithMessages }) {
  const { userRole } = useAuthStore();
  const isExpert = userRole === "EXPERT";
  const isResolved = ticket.status === "RESOLVED";
  const isClosed = ticket.status === "CLOSED";
  const router = useRouter();
  const isSampleTicket = router.state.location.pathname === "/sample-ticket";

  const ticketStatusHandler = async () => {
    if (isClosed || isResolved) {
      return;
    }

    const { success, message } = await axios
      .patch(`/api/v1/ticket/status/${ticket.id}`)
      .then((res) => res.data)
      .catch((err) => getErrorResponse(err));

    if (!success) {
      toast.error(message);
      return;
    }

    toast.success(message);
    await queryClient.invalidateQueries();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-5">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground select-none">
            <TicketBadges status={ticket.status} priority={ticket.priority} />
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                Created at {getFormatDate(ticket.createdAt, "date-time")}
              </span>
            </div>
          </div>
          <h4 className="text-muted-foreground text-sm">Ticket #{ticket.id}</h4>
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
          {ticket.relatedSkills.map((skill: string, index: number) => (
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

      {/* Communication Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Communication</h2>
        <div className="space-y-4">
          {ticket.messages.length !== 0 &&
            ticket.messages.map((message: Chat) => (
              <Card
                key={message.id}
                className={`border-l-4 py-2 ${message.senderRole === userRole ? "border-l-orange-400" : "border-l-blue-500"}`}
              >
                <CardContent className="px-2">
                  <CardTitle className="flex text-foreground justify-between pb-2">
                    <p>
                      {message.senderRole === userRole
                        ? "YOU"
                        : message.senderRole}
                    </p>
                    <p className="text-xs font-light">
                      {getFormatDate(message.createdAt, "date-time")}
                    </p>
                  </CardTitle>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {message.message}
                  </p>
                </CardContent>
              </Card>
            ))}

          {ticket.messages.length === 0 &&
            !isClosed &&
            !isResolved &&
            userRole === "USER" && (
              <Card className="border-l-4 py-2 border-l-black">
                <CardContent className="px-2">
                  <CardTitle className="flex items-center gap-x-1 text-foreground pb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    AI Assistant
                  </CardTitle>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {ticket.status === "CREATED"
                      ? "Your ticket has been created and is currently being reviewed. The most suitable expert will be assigned shortly."
                      : "An expert is currently reviewing your ticket. Please hang tight — creating multiple tickets for the same issue won't speed up the process and may cause delays. We appreciate your patience and are working on it. Once the expert responds, their message will appear in this section. You can also send your own message using the box below."}
                  </p>
                </CardContent>
              </Card>
            )}

          {(isClosed || isResolved) && (
            <Card className="border-l-4 py-2 border-l-black">
              <CardContent className="px-2">
                <CardTitle className="flex text-foreground justify-between pb-2">
                  <p>AI Assistant</p>
                  <p className="text-xs font-light">
                    {getFormatDate(new Date(Date.now()), "date-time")}
                  </p>
                </CardTitle>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {isClosed
                    ? "Ticket has been CLOSED by User."
                    : "Ticket has been RESOLVED by the Expert."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Separator />

      {/* New Message */}
      <div className="space-y-5">
        {!isResolved && !isClosed && !isSampleTicket && (
          <>
            <MessageForm ticketId={ticket.id} />
            <Separator />
          </>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex flex-col items-start sm:flex-row sm:justify-between pb-20">
        <p className="text-sm text-muted-foreground">
          Last update: {getFormatDate(ticket.updatedAt, "date-time")}
        </p>

        {!isResolved && !isClosed && !isSampleTicket && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size={"sm"}
                variant={"default"}
                disabled={isResolved || isClosed}
                className="cursor-pointer"
              >
                {isExpert ? "Mark as Resolved" : "Close Ticket"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-foreground/90">
                  {`This will mark this ticket as ${isExpert ? "RESOLVED" : "CLOSED"}. This action cannot be undone.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ticketStatusHandler}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {(isResolved || isClosed) && (
          <p className="text-sm text-muted-foreground">{ticket.status}</p>
        )}
      </div>
    </div>
  );
}
