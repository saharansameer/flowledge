import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { UserRole, TicketStatus, TicketPriority } from "@/types";

// Users Table
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    email: text("email").notNull().unique(),
    password: text("password").notNull(),

    role: text("role").$type<UserRole>().notNull(),
    designation: text("designation").notNull(),
    skills: text("skills").array().notNull(),

    refreshToken: text("refresh_token").default(""),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [uniqueIndex("emailIndex").on(table.email)]
);

// Tickets Table
export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  description: text("description").notNull(),

  status: text("status").$type<TicketStatus>().default("CREATED").notNull(),
  priority: text("priority").$type<TicketPriority>().default("LOW").notNull(),
  relatedSkills: text("related_skills")
    .array()
    .default(sql`'{}'::text[]`)
    .notNull(),
  helpfulNotes: text("helpful_notes").default(""),
  summary: text("summary").default(""),

  creator: uuid("creator")
    .references(() => users.id)
    .notNull(),
  assignee: uuid("assignee").references(() => users.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Chats Table
export const chats = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey(),

  ticketId: uuid("ticket_id")
    .references(() => tickets.id)
    .notNull(),

  message: text("message").notNull(),
  senderRole: text("sender_role").$type<UserRole>().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const ticketsRelations = relations(tickets, ({ one, many }) => ({
  creator: one(users, {
    fields: [tickets.creator],
    references: [users.id],
    relationName: "ticketCreator",
  }),
  assignee: one(users, {
    fields: [tickets.assignee],
    references: [users.id],
    relationName: "ticketAssignee",
  }),

  messages: many(chats, { relationName: "ticket" }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  createdTickets: many(tickets, { relationName: "ticketCreator" }),
  assignedTickets: many(tickets, { relationName: "ticketAssignee" }),
}));

export const chatRelations = relations(chats, ({ one }) => ({
  ticket: one(tickets, {
    fields: [chats.ticketId],
    references: [tickets.id],
    relationName: "ticket",
  }),
}));

// Types
type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;
type UsersTable = typeof users;

type Ticket = typeof tickets.$inferSelect;
type NewTicket = typeof tickets.$inferInsert;
type TicketsTable = typeof tickets;

type Chat = typeof chats.$inferSelect;
type NewChat = typeof chats.$inferInsert;
type ChatsTable = typeof chats;

type TicketWithMessages = Ticket & {
  messages: Chat[];
};

export {
  User,
  NewUser,
  UsersTable,
  Ticket,
  NewTicket,
  TicketsTable,
  Chat,
  NewChat,
  ChatsTable,
  TicketWithMessages,
};
