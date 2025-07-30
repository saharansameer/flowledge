import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SonnerToaster, PageTransition, Header, Footer } from "@/components";
import { NotFoundPage } from "@/components";

export const Route = createRootRoute({
  notFoundComponent: NotFoundPage,
  component: () => (
    <>
      <header className="w-full mx-auto max-w-screen-xl px-2">
        <Header />
      </header>

      <PageTransition>
        <main className="w-full mx-auto max-w-screen-xl min-h-screen px-2">
          <Outlet />
          <SonnerToaster />
        </main>
      </PageTransition>

      <footer className="w-full mx-auto max-w-screen-xl px-2">
        <Footer />
      </footer>
    </>
  ),
});
