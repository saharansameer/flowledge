# Flowledge

**Flowledge** is an AI-assisted ticketing platform where users can create support tickets and get help from domain experts. Each ticket is processed by the AI Agent that summarizes the issue, generates helpful notes, and assigns it to the most suitable expert based on their skills. After assignment, users and experts can collaborate through threaded responses until the issue is resolved.

---

## Tech Stack

- **React**
- **Tailwind CSS**
- **shadcn/ui** 
- **TanStack Router & Query**
- **Node.js + Express**
- **PostgreSQL**
- **Drizzle ORM** –
- **JWT (Auth)**
- **AgentKit (by Inngest)**
- **Google Gemini API** 
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

- **Frontend**: Built with React and TanStack Router/Query for type-safe navigation and server state.
- **Backend**: Express-based API server built in Node.js, handling routing, auth, and core business logic.
- **Database**: PostgreSQL stores all persistent entities — tickets, users, conversations — via Drizzle ORM.
- **AI Workflows**: Built in-house using the **Gemini API** as the language model. Runs via **AgentKit** for async processing and expert assignment.
- **Email Notifications**: **Resend** is used to send transactional emails on signup and when a ticket is closed or resolved.
- **Roles & Auth**: Signup and session flows are tailored for users and experts, with proper role-checking on all operations.

---

## Deployment

Fully deployed and live at [`flowledge.sameersaharan.com`](https://flowledge.sameersaharan.com)  
built by [Sameer Saharan](https://sameersaharan.com)
