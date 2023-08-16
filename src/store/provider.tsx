"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar } from "next-nprogress-bar";

import { stores } from "./store";

import withAuth from "@/lib/withAuthleanq_support_coordinator";

function StoreProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<></>}>
        <AppProgressBar
          height="2px"
          color="#c41919"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
      <Provider store={stores}>{children}</Provider>;
    </QueryClientProvider>
  );
}

export default withAuth(StoreProvider);
