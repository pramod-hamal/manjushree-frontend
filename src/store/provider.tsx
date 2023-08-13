"use client";

import React from "react";
import { Provider } from "react-redux";
import { stores } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar } from "next-nprogress-bar";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AppProgressBar
        height="2px"
        color="#c41919"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Provider store={stores}>{children}</Provider>;
    </QueryClientProvider>
  );
}
