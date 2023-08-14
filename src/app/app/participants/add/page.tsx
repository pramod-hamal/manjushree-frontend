import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import React from "react";
import ParticipantForm from "./components/ParticipantForm";

export default function AddParticipant() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Add Participants" />
      <div className="bg-white p-5 shadow">
        <ParticipantForm />
      </div>
    </div>
  );
}
