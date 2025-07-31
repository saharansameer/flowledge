import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/sample-ticket/")({
  beforeLoad: () => checkAuth(["EXPERT"]),
  component: SampleTicket,
});

import { TicketDetails } from "@/components";

function SampleTicket() {
  const now = new Date().toISOString();
  const sampleTicketData = {
    id: "ticket_12345",
    title: "Sample Ticket - Unable to Connect to PostgreSQL Database",
    description: `I've been trying to connect to my PostgreSQL database from my local dev environment. 
The credentials are correct, and the database server is running, but the connection always times out. 
I’ve tried restarting the server and checking firewall settings, but nothing works.`,
    summary:
      "The user cannot connect to their PostgreSQL database despite valid credentials and server availability.",
    helpfulNotes: `This issue could be related to network configuration or missing database bindings. 
Recommend checking that PostgreSQL is listening on the correct port and address (e.g., 0.0.0.0), and that the pg_hba.conf file allows the user's IP range. 
Also, verify that local firewalls or security groups (if on cloud) are not blocking traffic.
Useful link: https://www.postgresql.org/docs/current/runtime-config-connection.html`,
    relatedSkills: ["PostgreSQL", "Networking", "Backend Debugging", "Linux"],
    status: "ASSIGNED",
    priority: "LOW",
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        senderRole: "AI",
        message:
          "Your interaction with user will be shown in this section and an input box to write your response below this section. Provide guidance, troubleshooting steps, or request more information as needed, then click send.",
        createdAt: now,
        updatedAt: now,
      },
    ],
  };

  return (
    <div className="w-full mx-auto px-2">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <TicketDetails ticket={sampleTicketData as any} />
    </div>
  );
}
