import DashboardLayout from "@/components/layouts/dashboard/DashboardLayoutleanq_support_coordinator";
import React from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
