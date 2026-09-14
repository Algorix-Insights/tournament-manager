import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClient as defaultClient } from "@/core/query/queryClient";

export interface QueryProviderProps {
  children: ReactNode;
  client?: QueryClient;
}

export default function QueryProvider({
  children,
  client = defaultClient,
}: Readonly<QueryProviderProps>) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
