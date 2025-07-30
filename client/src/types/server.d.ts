export type UserRole = "USER" | "EXPERT" | "AI";

export type TicketStatus = "CREATED" | "ASSIGNED" | "RESOLVED" | "CLOSED";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";

export type Ticket = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  relatedSkills: string[];
  helpfulNotes: string | null;
  summary: string | null;
  creator: string;
  assignee: string | null;
};

export type Chat = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  ticketId: string;
  message: string;
  senderRole: UserRole;
};

export type TicketWithMessages = Ticket & {
  messages: Chat[];
};
