import { z } from "zod/v4";

export const ticketSchema = z.object({
  title: z
    .string({ error: "Title must not be empty" })
    .max(100, { error: "Title must not exceed 100 characters" }),

  description: z
    .string({ error: "Description is required" })
    .max(900, { error: "Description must not exceed 900 characters" }),
});

export type TicketSchemaInputs = z.input<typeof ticketSchema>;

export const expertMessageSchema = z.object({
  expertMessage: z
    .string({ error: "This can not be empty" })
    .max(5000, { error: "Message  must not exceed 5000 characters" }),
});

export type ExpertMessageSchemaInputs = z.input<typeof expertMessageSchema>;
