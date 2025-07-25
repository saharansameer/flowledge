import { createRoot } from "react-dom/client";
import "./index.css";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister, maxAge } from "@/app/query/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister, maxAge }}
  >
    <RouterProvider router={router} />
  </PersistQueryClientProvider>
);
