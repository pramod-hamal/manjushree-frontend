"use client";

import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { AppProgressBar } from "next-nprogress-bar";

import { stores } from "./store";

import withAuth from "@/core/hoc/withAuthleanq_support_coordinator";
import { ToastContextComponent } from "@/core/lib/toast/ToastProviderleanq_support_coordinator";

function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
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
  );
}

export default withAuth(StoreProvider);
