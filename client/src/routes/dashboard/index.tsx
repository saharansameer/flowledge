import { createFileRoute } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: () => checkAuth(),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-4">
      <h1>Protected Dashboard</h1>
      <p>Only visible to authenticated users.</p>
    </div>
  );
}
