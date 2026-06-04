# Flowledge

Flowledge is an Agentic AI ticketing platform that enables users to create support tickets and receive assistance from domain experts. Each ticket is autonomously handled by an AI agent that analyzes and summarizes the issue, generates contextual insights, and intelligently routes it to the most appropriate expert based on skill matching. Once assigned, users and experts collaborate through threaded conversations until the issue is fully resolved.

---

## Tech Stack

- **React**
- **Tailwind CSS**
- **shadcn/ui** 
- **TanStack Router & Query**
- **Node.js**
- **Express**
- **PostgreSQL**
- **Drizzle ORM**
- **JWT (Auth)**
- **Inngest**
- **Resend**

---

## Features

- **AI-Powered Ticket Handling**
  - Automatically summarizes ticket content using an AI agent
  - Generates internal notes to assist experts
  - Matches and assigns tickets to the most relevant expert using skill-based logic

- **Expert Collaboration**
  - Assigned experts can view new tickets directly in their dashboard
  - Users and experts exchange responses to troubleshoot or resolve the issue

- **Flexible Ticket Management**
  - Tickets can be marked as closed or resolved by either the user or the assigned expert
  - Full visibility into ticket history and conversations

- **Role-Based Access**
  - Two roles: `USER` and `EXPERT`, each with dedicated sign-up and dashboard views
  - Access control for actions based on role (e.g., only experts get assigned tickets)

- **Email Notifications**
  - Sends email on user signup  
  - Sends email when ticket status is updated to closed or resolved
---

## Architecture Notes

- **Frontend**: Built with React. TanStack Router handles navigation and TanStack Query manages server state and data fetching.

- **Backend**: Node.js with Express powers the API layer. It handles routing, authentication, authorization, and core business logic.

- **Database**: PostgreSQL stores application data including users, tickets, and conversations. Drizzle ORM is used for schema definition and type-safe queries.

- **AI Processing**: *GPT-4o-mini* is used to analyze tickets and assist with expert assignment. Background tasks are handled asynchronously using AgentKit.

- **Email Notifications**: Resend is used to send transactional emails such as account creation confirmations and ticket status updates.

- **Authentication and Roles**: Separate flows exist for users and experts. Role-based access checks are enforced at the API level for all protected operations.

---

## Deployment

Fully deployed and live at [`flowledge.sameersaharan.com`](https://flowledge.sameersaharan.com)  
built by [Sameer Saharan](https://sameersaharan.com)
