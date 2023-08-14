import React from "react";
import IndividualContactList from "./compnents/IndividualContactList";
import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";

export default function IndividualContact() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Individual Contact" />
      <div className="bg-white p-5 shadow">
        <IndividualContactList />
      </div>
    </div>
  );
}
