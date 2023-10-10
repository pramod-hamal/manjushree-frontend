import React from "react";
import { Metadata } from "next";

import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import ParticipantList from "./components/ParticipantList";

export const metadata: Metadata = {
  title: "Participants",
  description: "",
};

export default function ParticipantsPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Participants" />
      <div className="bg-white p-5 shadow">
        <ParticipantList />
      </div>
    </div>
  );
}
