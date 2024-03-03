"use client";

import React from "react";
import type { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface ReactQueryProviderProps extends PropsWithChildren {}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 5, refetchOnWindowFocus: true },
  },
});

const ReactQueryProvider: FC<ReactQueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
