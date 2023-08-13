import React from "react";
import DashboardLayoutComponent from "@/components/layouts/dashboard/DashboardLayoutleanq_support_coordinator";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}
