import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import React from "react";
import OrganizationalContactForm from "../components/OrganizationalContactForm";

export default function AddOrganizationalContact() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Add Organizational Contact" />
      <div className="bg-white p-5 shadow">
        <OrganizationalContactForm editMode={false} />
      </div>
    </div>
  );
}
