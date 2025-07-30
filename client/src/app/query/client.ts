import { QueryClient } from "@tanstack/react-query";

const maxAge = 1000 * 60 * 2; // 2 min

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: maxAge,
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

export { queryClient };
