import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";

import db from "@/db";
import { users, tickets } from "@/db/schema";
import { and, eq, arrayOverlaps } from "drizzle-orm";

import { analyzeTicket } from "@/inngest/agents";
import { ticketPriority } from "@/utils/constants";

export const onTicketCreate = inngest.createFunction(
  { id: "on-ticket-create", retries: 1 },
  { event: "ticket/create" },
  async ({ event, step }) => {
    try {
      const { ticketId } = event.data;

      // Step One - Find Ticket
      const ticket = await step.run("get-ticket", async () => {
        const ticketDetails = await db.query.tickets.findFirst({
          where: eq(tickets.id, ticketId),
          columns: { id: true, title: true, description: true },
        });

        if (!ticketDetails) {
          throw new NonRetriableError("Ticket no longer exist");
        }

        return ticketDetails;
      });

      // Step Two - Analyze ticket and get AI response
      const relatedSkills = await step.run("analyze-ticket", async () => {
        let skills = [];

        // AI Response
        const aiResponse = await analyzeTicket({
          title: ticket.title,
          description: ticket.description,
        });

        // Set Priority
        const priority = !ticketPriority.includes(aiResponse.priority)
          ? "MEDIUM"
          : aiResponse.priority;

        skills = aiResponse.skills || [];

        // Update Priority and Skills in database
        await db
          .update(tickets)
          .set({ priority: priority, relatedSkills: skills })
          .where(eq(tickets.id, ticket.id));

        return skills;
      });

      // Step Three - Assign moderator
      await step.run("assign-moderator", async () => {
        // Find a user with relevant skills and assign the ticket
        let assignee = await db.query.users.findFirst({
          where: and(
            eq(users.role, "MODERATOR"),
            arrayOverlaps(users.skills, relatedSkills)
          ),
          columns: { id: true, skills: true },
        });

        // Assign ticket to admin if no moderator found
        if (!assignee) {
          assignee = await db.query.users.findFirst({
            where: eq(users.role, "ADMIN"),
            columns: { id: true, skills: true },
          });
        }

        // Update assignee in database
        await db
          .update(tickets)
          .set({ assignee: assignee?.id || null })
          .where(eq(tickets.id, ticket.id));

        return assignee;
      });

      // Final Step
      return { success: true, message: `${event.name} success` };
    } catch (error: AnyError) {
      return {
        success: false,
        message: `${event.name} : ${error?.message || "An unknown error occurred"}`,
      };
    }
  }
);
