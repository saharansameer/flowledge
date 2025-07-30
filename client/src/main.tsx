import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/query/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
