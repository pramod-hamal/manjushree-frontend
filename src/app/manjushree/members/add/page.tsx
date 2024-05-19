import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import React from "react";
import AddUserForm from "./components/AddUserForm";

export default function AddUserPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Add Member" />
      <div className="bg-white p-5 shadow">
        <AddUserForm />
      </div>
    </div>
  );
}
