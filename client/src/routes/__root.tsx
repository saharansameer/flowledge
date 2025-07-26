import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SonnerToaster, PageTransition, Header, Footer } from "@/components";

export const Route = createRootRoute({
  component: () => (
    <PageTransition>
      <header className="w-full mx-auto max-w-screen-xl px-2">
        <Header />
      </header>

      <main className="w-full mx-auto max-w-screen-xl min-h-screen px-2">
        <Outlet />
        <SonnerToaster />
      </main>

      <footer className="w-full mx-auto max-w-screen-xl px-2">
        <Footer />
      </footer>
    </PageTransition>
  ),
});
