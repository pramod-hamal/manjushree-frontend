import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import React from "react";
import OrganizationalContactList from "./components/OrganizationalContactList";

export default function OrganizationalContact() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Organizational Contact" />
      <div className="bg-white p-5 shadow">
        <OrganizationalContactList />
      </div>
    </div>
  );
}
