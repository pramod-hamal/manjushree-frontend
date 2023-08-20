"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar } from "next-nprogress-bar";

import { stores } from "./store";

import withAuth from "@/lib/withAuthleanq_support_coordinator";
import { ToastContextComponent } from "@/lib/toast/ToastProviderleanq_support_coordinator";

function StoreProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContextComponent>
        <Suspense fallback={<></>}>
          <AppProgressBar
            height="2px"
            color="#c41919"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </Suspense>
        <Provider store={stores}>{children}</Provider>;
      </ToastContextComponent>
    </QueryClientProvider>
  );
}

export default withAuth(StoreProvider);
