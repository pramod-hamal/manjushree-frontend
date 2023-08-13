import React from "react";

import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import IndividualContactForm from "./components/IndividualContactForm";

export default function AddIndividualContact() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Add Individual Contact" />
      <div className="bg-white p-5 shadow">
        <IndividualContactForm />
      </div>
    </div>
  );
}
