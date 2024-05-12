"use client";

import React, { memo } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import {
  appState,
  AppState,
  LayoutState,
} from "@/store/features/appSliceleanq_support_coordinator";
import { getCookie } from "cookies-next";

function DashboardLayoutComponent({ children }: { children: React.ReactNode }) {
  const { layoutState }: AppState = useAppSelector(appState);

  const { minimized }: LayoutState = layoutState;
  return (
    <div className="flex transition-all">
      <Sidebar />
      <main
        className={`transition-all flex flex-col ${
          minimized ? "pl-[55px] w-[97%]" : "pl-[13%] w-[87%]"
        } `}
      >
        <Header />
        <section className="p-5">{children}</section>
      </main>
    </div>
  );
}

export default memo(DashboardLayoutComponent);
