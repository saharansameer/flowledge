import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";

import db from "@/db";
import { users, tickets } from "@/db/schema";
import { eq } from "drizzle-orm";

import { sendEmail } from "@/utils/email/resend";
import {
  ticketResolvedStatusTemplate,
  ticketClosedStatusTemplate,
} from "@/utils/email/templates";

export const onTicketResolve = inngest.createFunction(
  {
    id: "on-ticket-resolve",
    retries: 1,
  },
  { event: "ticket/resolve" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      // Step One - Find ticket
      const ticket = await step.run("find-ticket", async () => {
        const ticketDetails = await db.query.tickets.findFirst({
          where: eq(tickets.id, ticketId),
        });

        if (!ticketDetails) {
          throw new NonRetriableError("Ticket no longer exist");
        }

        return ticketDetails;
      });

      // Step Two - Find email recipient
      const recipient = await step.run("find-email-recipient", async () => {
        const id = ticket.status === "RESOLVED" ? ticket.creator : ticket.assignee;

        const recipientDetails = await db.query.users.findFirst({
          where: eq(users.id, id!),
          columns: { email: true, role: true },
        });

        return recipientDetails!;
      });

      // Step Three - Send Email
      await step.run("send-ticket-status-email", async () => {
        const subject = recipient.role === "USER" ? "Ticket Resolved" : "Ticket Closed";
        const { html, text } = recipient.role === "USER" ? ticketResolvedStatusTemplate(ticket.id) : ticketClosedStatusTemplate(ticket.id);

        await sendEmail({ to: recipient.email, subject, html, text });
      });

      // Response
      return { success: true, message: `${event.name} success` };
    } catch (error: AnyError) {
      return {
        success: false,
        message: `${event.name} : ${error?.message || "An unknown error occurred"}`,
      };
    }
  }
);
