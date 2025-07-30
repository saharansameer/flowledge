import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";

import db from "@/db";
import { users, tickets, chats } from "@/db/schema";
import { and, eq, arrayOverlaps } from "drizzle-orm";

import { analyzeTicket } from "@/inngest/agents";
import { ticketPriority } from "@/utils/constants";

export const onTicketCreate = inngest.createFunction(
  { id: "on-ticket-create", retries: 2 },
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

      // AI Response - Separate Step
      const aiResponse = await analyzeTicket({
        title: ticket.title,
        description: ticket.description,
      });

      // Step Two - Handle AI response
      const relatedSkills = await step.run("handle-ai-response", async () => {
        if (!aiResponse) {
          throw new NonRetriableError("Invalid AI Response");
        }

        let skills = [];

        // Set Priority
        const priority = !ticketPriority.includes(aiResponse.priority)
          ? "MEDIUM"
          : aiResponse.priority.toUpperCase();

        skills = aiResponse.relatedSkills.map((val: string) =>
          val.toLowerCase()
        ) || ["unknown"];

        // Update Priority, Skills, Summary and Helpful Notes in database
        await db
          .update(tickets)
          .set({
            priority: priority,
            relatedSkills: skills,
            helpfulNotes: aiResponse.helpfulNotes || "",
            summary: aiResponse.summary || "",
          })
          .where(eq(tickets.id, ticket.id));

        return skills;
      });

      // Step Three - Find Expert
      const assignee = await step.run("find-expert", async () => {
        // Find a user with relevant skills and assign the ticket
        const assignee = await db.query.users.findFirst({
          where: and(
            eq(users.role, "EXPERT"),
            arrayOverlaps(users.skills, relatedSkills)
          ),
          columns: { id: true, skills: true },
        });

        return assignee;
      });

      // Step Four - Assign Expert
      await step.run("assign-expert", async () => {
        if (!assignee || assignee === undefined) {
          // Mark ticket as closed if no expert found
          await db
            .update(tickets)
            .set({
              status: "CLOSED",
              updatedAt: new Date(Date.now()),
            })
            .where(eq(tickets.id, ticket.id));

          // Add message for why ticket was closed
          await db
            .insert(chats)
            .values({
              message:
                "We couldn't find an expert with matching skills for this ticket, so it has been marked as CLOSED. Please double-check your title and description, and try submitting a new ticket.",
              senderRole: "AI",
              ticketId: ticket.id,
            });
        } else {
          // Assign expert if found any
          await db
            .update(tickets)
            .set({
              assignee: assignee.id,
              status: "ASSIGNED",
              updatedAt: new Date(Date.now()),
            })
            .where(eq(tickets.id, ticket.id));
        }
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
