import React from "react";
import DashboardLayoutComponent from "@/components/layouts/dashboard/DashboardLayoutleanq_support_coordinator";

export default function ParticipantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutComponent title="Participants">{children}</DashboardLayoutComponent>;
}
