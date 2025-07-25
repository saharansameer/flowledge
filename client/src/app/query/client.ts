import { QueryClient } from "@tanstack/react-query";
import { createPersister } from "./persister";

const maxAge = 1000 * 60; // 60 sec

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: maxAge,
      gcTime: maxAge,
      retry: false,
    },
  },
});

const persister = createPersister();

export { queryClient, persister, maxAge };
