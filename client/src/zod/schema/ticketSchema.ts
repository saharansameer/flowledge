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

export const messageSchema = z.object({
  ticketMessage: z
    .string({ error: "This can not be empty" })
    .max(2000, { error: "Message must not exceed 2000 characters" }),
});

export type MessageSchemaInputs = z.input<typeof messageSchema>;
