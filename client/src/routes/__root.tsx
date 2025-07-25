import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { SonnerToaster, PageTransition } from "@/components";

export const Route = createRootRoute({
  component: () => (
    <PageTransition>
      <header className="layout-container">
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{" "}
        </div>
        <hr />
      </header>

      <main className="layout-container min-h-screen">
        <Outlet />
        <SonnerToaster />
      </main>

      <footer className=""></footer>
    </PageTransition>
  ),
});
