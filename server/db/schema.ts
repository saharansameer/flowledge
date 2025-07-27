import {
  pgTable,
  uuid,
  text,
  timestamp,
  uniqueIndex
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { UserRole, TicketStatus, TicketPriority } from "@/types";

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  role: text("role").$type<UserRole>().notNull(),
  designation: text("designation").notNull(),
  skills: text("skills").array().notNull(),

  refreshToken: text("refresh_token").default(""),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
}, (table) => ([
  uniqueIndex("emailIndex").on(table.email)
]));

// Tickets Table
export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: text("title").notNull(),
  description: text("description").notNull(),

  status: text("status").$type<TicketStatus>().default("CREATED").notNull(),
  priority: text("priority").$type<TicketPriority>().default("LOW").notNull(),
  relatedSkills: text("related_skills").array().default(sql`'{}'::text[]`).notNull(),
  helpfulNotes: text("helpful_notes").default(""),

  creator: uuid("creator").references(() => users.id).notNull(),
  assignee: uuid("assignee").references(() => users.id),
  assigneeMessage: text("assignee_message"), 

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()

})

// Relations
export const ticketsRelations = relations(tickets, ({ one }) => ({
  creator: one(users, {
    fields: [tickets.creator],
    references: [users.id],
    relationName: "ticketCreator"
  }),
  assignee: one(users, {
    fields: [tickets.assignee], 
    references: [users.id],
    relationName: "ticketAssignee"
  })
}))

export const usersRelations = relations(users, ({ many }) => ({
  createdTickets: many(tickets, { relationName: "ticketCreator" }),
  assignedTickets: many(tickets, { relationName: "ticketAssignee" })
}))

// Types
type User = typeof users.$inferSelect
type NewUser = typeof users.$inferInsert
type UsersTable = typeof users

type Ticket = typeof tickets.$inferSelect
type NewTicket = typeof tickets.$inferInsert
type TicketsTable = typeof tickets

export { User, NewUser, UsersTable, Ticket, NewTicket, TicketsTable }